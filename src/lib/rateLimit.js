/**
 * Rate limiting utility for API routes
 * Uses in-memory storage for simplicity. In production, consider using Redis or another persistent store.
 */

// In-memory store for rate limiting
const rateLimitStore = new Map();

/**
 * Rate limiting configuration
 */
const RATE_LIMIT_CONFIG = {
  // Maximum requests per window
  maxRequests: 5,
  // Time window in milliseconds (5 minutes)
  windowMs: 5 * 60 * 1000,
  // Cleanup interval in milliseconds (10 minutes)
  cleanupIntervalMs: 10 * 60 * 1000,
};

/**
 * Extract client IP from request
 * @param {Request} request - Next.js request object
 * @returns {string} Client IP address
 */
const getClientIP = (request) => {
  // Try various headers that might contain the real IP
  const forwardedFor = request.headers.get('x-forwarded-for');
  const realIP = request.headers.get('x-real-ip');
  const cfConnectingIP = request.headers.get('cf-connecting-ip'); // Cloudflare
  
  if (forwardedFor) {
    return forwardedFor.split(',')[0].trim();
  }
  
  if (realIP) {
    return realIP.trim();
  }
  
  if (cfConnectingIP) {
    return cfConnectingIP.trim();
  }
  
  // Fallback to a default
  return 'unknown';
};

/**
 * Clean up expired entries from the rate limit store
 */
const cleanupExpiredEntries = () => {
  const now = Date.now();
  const cutoff = now - RATE_LIMIT_CONFIG.windowMs;
  
  for (const [key, data] of rateLimitStore.entries()) {
    if (data.windowStart < cutoff) {
      rateLimitStore.delete(key);
    }
  }
};

// Set up periodic cleanup
if (typeof setInterval !== 'undefined') {
  setInterval(cleanupExpiredEntries, RATE_LIMIT_CONFIG.cleanupIntervalMs);
}

/**
 * Rate limiting middleware
 * @param {Request} request - Next.js request object
 * @returns {Promise<{success: boolean, remaining?: number, resetTime?: number}>}
 */
export async function rateLimit(request) {
  const clientIP = getClientIP(request);
  const now = Date.now();
  
  // Get or create rate limit data for this client
  let clientData = rateLimitStore.get(clientIP);
  
  if (!clientData || now - clientData.windowStart > RATE_LIMIT_CONFIG.windowMs) {
    // New window for this client
    clientData = {
      count: 0,
      windowStart: now,
    };
    rateLimitStore.set(clientIP, clientData);
  }
  
  // Increment request count
  clientData.count++;
  
  // Calculate remaining requests and reset time
  const remaining = Math.max(0, RATE_LIMIT_CONFIG.maxRequests - clientData.count);
  const resetTime = clientData.windowStart + RATE_LIMIT_CONFIG.windowMs;
  
  // Check if rate limit exceeded
  if (clientData.count > RATE_LIMIT_CONFIG.maxRequests) {
    return {
      success: false,
      remaining: 0,
      resetTime,
    };
  }
  
  return {
    success: true,
    remaining,
    resetTime,
  };
}

/**
 * Get rate limit status for a client (doesn't increment counter)
 * @param {Request} request - Next.js request object
 * @returns {Object} Rate limit status
 */
export function getRateLimitStatus(request) {
  const clientIP = getClientIP(request);
  const clientData = rateLimitStore.get(clientIP);
  const now = Date.now();
  
  if (!clientData || now - clientData.windowStart > RATE_LIMIT_CONFIG.windowMs) {
    return {
      count: 0,
      remaining: RATE_LIMIT_CONFIG.maxRequests,
      resetTime: now + RATE_LIMIT_CONFIG.windowMs,
      limit: RATE_LIMIT_CONFIG.maxRequests,
    };
  }
  
  const remaining = Math.max(0, RATE_LIMIT_CONFIG.maxRequests - clientData.count);
  
  return {
    count: clientData.count,
    remaining,
    resetTime: clientData.windowStart + RATE_LIMIT_CONFIG.windowMs,
    limit: RATE_LIMIT_CONFIG.maxRequests,
  };
}

/**
 * Reset rate limit for a specific client (admin function)
 * @param {Request} request - Next.js request object
 * @returns {boolean} Whether the reset was successful
 */
export function resetRateLimit(request) {
  const clientIP = getClientIP(request);
  return rateLimitStore.delete(clientIP);
}
