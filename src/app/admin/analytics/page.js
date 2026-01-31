"use client";

import { useEffect, useState } from "react";

export default function AnalyticsPage() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [period, setPeriod] = useState("30d");

  useEffect(() => {
    async function fetchAnalytics() {
      setLoading(true);
      try {
        const response = await fetch(`/api/analytics?period=${period}`);
        const result = await response.json();

        if (!response.ok) {
          throw new Error(result.error || "Failed to fetch analytics");
        }

        setData(result);
      } catch (err) {
        console.error("Analytics fetch error:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchAnalytics();
  }, [period]);

  if (loading && !data) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 bg-red-50 border border-red-200 rounded-xl text-red-800">
        <h2 className="text-lg font-bold mb-2">Analytics Error</h2>
        <p className="mb-4">{error}</p>
        <button 
          onClick={() => window.location.reload()}
          className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
        >
          Retry
        </button>
      </div>
    );
  }

  const getMetricValue = (index) => data?.metrics?.[index]?.value || "0";

  const stats = [
    {
      name: "Active Users",
      value: getMetricValue(0),
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      ),
      color: "blue",
    },
    {
      name: "Sessions",
      value: getMetricValue(1),
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
        </svg>
      ),
      color: "green",
    },
    {
      name: "Page Views",
      value: getMetricValue(2),
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
        </svg>
      ),
      color: "purple",
    },
    {
      name: "Bounce Rate",
      value: `${(parseFloat(getMetricValue(3)) * 100).toFixed(1)}%`,
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
        </svg>
      ),
      color: "orange",
    },
  ];

  const topPages = data?.topPages || [];
  const trends = data?.trends || [];

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Analytics Dashboard</h1>
          <p className="text-gray-600">Website performance overview</p>
        </div>
        
        <div className="flex items-center gap-2 bg-white rounded-lg shadow-sm border border-gray-100 p-1">
          {[
            { id: "7d", label: "7 Days" },
            { id: "30d", label: "30 Days" },
            { id: "90d", label: "90 Days" },
          ].map((range) => (
            <button
              key={range.id}
              onClick={() => setPeriod(range.id)}
              className={`px-4 py-1.5 text-sm font-medium rounded-md transition-all ${
                period === range.id
                  ? "bg-green-600 text-white shadow-md"
                  : "text-gray-600 hover:bg-gray-50"
              }`}
            >
              {range.label}
            </button>
          ))}
        </div>
      </div>

      {loading && (
        <div className="fixed top-20 right-8 z-50">
           <div className="animate-spin rounded-full h-6 w-6 border-2 border-green-600 border-t-transparent"></div>
        </div>
      )}

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div key={stat.name} className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-lg bg-${stat.color}-50 text-${stat.color}-600`}>
                {stat.icon}
              </div>
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              <p className="text-sm font-medium text-gray-500">{stat.name}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Trends Graph */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-gray-900">Traffic Trend</h2>
          <div className="flex items-center gap-4 text-xs font-medium">
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-blue-500"></span>
              <span className="text-gray-600">Users</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-green-500"></span>
              <span className="text-gray-600">Sessions</span>
            </div>
          </div>
        </div>
        
        <AnalyticsTrendGraph trends={trends} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Top Pages Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
            <h2 className="text-lg font-semibold text-gray-900">Most Visited Pages</h2>
            <span className="text-xs text-gray-500">Top 10 Pages</span>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50/50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Page Path
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Views
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {topPages.length > 0 ? (
                  topPages.map((row, idx) => {
                    const views = parseInt(row.metricValues[0].value);
                    const totalViews = topPages.reduce((acc, r) => acc + parseInt(r.metricValues[0].value), 0);
                    const percentage = ((views / totalViews) * 100).toFixed(1);

                    return (
                      <tr key={idx} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 truncate max-w-[200px]" title={row.dimensionValues[0].value}>
                          {row.dimensionValues[0].value}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right">
                          <div className="flex flex-col items-end">
                            <span className="text-sm font-semibold text-gray-900">{views.toLocaleString()}</span>
                            <div className="flex items-center gap-2 mt-1">
                              <div className="w-16 bg-gray-100 rounded-full h-1">
                                <div className="bg-green-500 h-1 rounded-full" style={{ width: `${percentage}%` }} />
                              </div>
                              <span className="text-[10px] text-gray-400">{percentage}%</span>
                            </div>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan="2" className="px-6 py-12 text-center text-gray-500">
                      No data available
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Quick Tips / Info */}
        <div className="space-y-6">
           <div className="bg-gradient-to-br from-green-600 to-green-700 rounded-xl shadow-lg p-6 text-white">
             <h3 className="text-lg font-bold mb-2">Performance Tip</h3>
             <p className="text-green-50 opacity-90 text-sm leading-relaxed">
               Your bounce rate is currently {getMetricValue(3) ? (parseFloat(getMetricValue(3))*100).toFixed(1) : "..."}%. 
               To improve engagement, try adding more internal links in your blog posts and clarifying call-to-actions on product pages.
             </p>
             <div className="mt-4 pt-4 border-t border-green-500/30 flex items-center justify-between text-xs font-medium">
               <span>Last calculated just now</span>
               <span className="px-2 py-1 bg-green-500/40 rounded-full">GA4 Live</span>
             </div>
           </div>
           
           <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Traffic Insights</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center shrink-0">
                    <span className="text-blue-600 text-xs font-bold">1</span>
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-gray-800">Peak Traffic</h4>
                    <p className="text-xs text-gray-500">Monitor your peak hours to schedule new blog post launches for maximum visibility.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-purple-50 flex items-center justify-center shrink-0">
                    <span className="text-purple-600 text-xs font-bold">2</span>
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-gray-800">User Retention</h4>
                    <p className="text-xs text-gray-500">Track Sessions vs Users. A higher ratio means users are returning to your site frequently.</p>
                  </div>
                </div>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}

function AnalyticsTrendGraph({ trends }) {
  if (!trends || trends.length === 0) {
    return (
      <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg border border-dashed border-gray-200">
        <p className="text-sm text-gray-400 text-center px-4">Insufficient data to generate trend visualization</p>
      </div>
    );
  }

  // Pre-process trends data
  const processedData = trends.map(row => ({
    date: row.dimensionValues[0].value,
    users: parseInt(row.metricValues[0].value),
    sessions: parseInt(row.metricValues[1].value)
  }));

  const maxUsers = Math.max(...processedData.map(d => d.users), 1);
  const maxSessions = Math.max(...processedData.map(d => d.sessions), 1);
  const maxValue = Math.max(maxUsers, maxSessions, 10);
  
  const width = 1000;
  const height = 250;
  const padding = 40;
  const graphWidth = width - (padding * 2);
  const graphHeight = height - (padding * 2);

  const getX = (index) => padding + (index * (graphWidth / (processedData.length - 1 || 1)));
  const getY = (value) => height - padding - (value * (graphHeight / maxValue));

  const usersPath = processedData.map((d, i) => `${i === 0 ? 'M' : 'L'} ${getX(i)} ${getY(d.users)}`).join(' ');
  const sessionsPath = processedData.map((d, i) => `${i === 0 ? 'M' : 'L'} ${getX(i)} ${getY(d.sessions)}`).join(' ');

  // Area under path
  const usersArea = `${usersPath} L ${getX(processedData.length-1)} ${height-padding} L ${padding} ${height-padding} Z`;

  return (
    <div className="w-full overflow-x-auto scrollbar-hide">
      <div className="min-w-[600px]">
        <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-auto drop-shadow-sm">
          {/* Grid Lines */}
          {[0, 0.25, 0.5, 0.75, 1].map((p, i) => (
            <line 
              key={i}
              x1={padding} 
              y1={height - padding - (p * graphHeight)} 
              x2={width - padding} 
              y2={height - padding - (p * graphHeight)} 
              stroke="#F3F4F6" 
              strokeWidth="1"
            />
          ))}

          {/* User Trend Area */}
          <path d={usersArea} fill="url(#blueGradient)" opacity="0.1" />
          
          {/* User Trend Line */}
          <path d={usersPath} fill="none" stroke="#3B82F6" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
          
          {/* Session Trend Line */}
          <path d={sessionsPath} fill="none" stroke="#10B981" strokeWidth="2" strokeDasharray="4 2" strokeLinecap="round" strokeLinejoin="round" />

          {/* Data Points (sparse) */}
          {processedData.filter((_, i) => processedData.length < 15 || i % Math.ceil(processedData.length / 10) === 0).map((d, i, arr) => {
            const idx = processedData.indexOf(d);
            return (
              <g key={idx}>
                <circle cx={getX(idx)} cy={getY(d.users)} r="4" fill="white" stroke="#3B82F6" strokeWidth="2" />
                <text 
                  x={getX(idx)} 
                  y={height - padding + 20} 
                  textAnchor="middle" 
                  className="text-[10px] fill-gray-400 font-medium"
                >
                  {d.date.substring(6,8)}/{d.date.substring(4,6)}
                </text>
              </g>
            );
          })}

          <defs>
            <linearGradient id="blueGradient" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="#3B82F6" />
              <stop offset="100%" stopColor="transparent" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </div>
  );
}
