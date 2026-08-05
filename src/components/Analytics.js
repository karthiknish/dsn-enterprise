"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";
import Script from "next/script";
import { Suspense, useEffect } from "react";

/**
 * GA4 measurement ID for property 514574483 ("dsn-enterprises", GA account
 * 162473368), stream 13066196898. Confirmed via the Firebase Management API:
 *   projects/dsn-enterprises/analyticsDetails -> streamMappings
 *
 * This is what the admin dashboard reads through GA_PROPERTY_ID=514574483.
 * Before this was added the site only loaded GT-TQKJ52Q3, whose gtag payload
 * resolves to AW-17769294111 (Google Ads) and contains NO GA4 destination, so
 * property 514574483 had zero rows for every date range back to 2020 and the
 * admin analytics page could only ever render zeros.
 */
const GA4_MEASUREMENT_ID =
	process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID || "G-GR3VEG2ZX0";

/** Google tag container. Kept so any existing tag/GTM config keeps working. */
const GOOGLE_TAG_ID = "GT-TQKJ52Q3";

/**
 * Google Ads account DSN Enterprises (CID 326-732-8717).
 *
 * The old AW-17769294111 belongs to a different Ads account (CID 177-692-9411),
 * so every conversion the site sent was reported there instead of DSN — which
 * is why DSN Ads showed "No recent conversions" for every action.
 */
const GOOGLE_ADS_ID = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID || "AW-3267328717";
const FB_PIXEL_ID = "1391622058130598";

function AnalyticsContent() {
	const pathname = usePathname();

	useEffect(() => {
		if (pathname && window.gtag) {
			// GA4 first — this is the one that populates the admin dashboard.
			window.gtag("config", GA4_MEASUREMENT_ID, {
				page_path: pathname,
			});
			window.gtag("config", GOOGLE_TAG_ID, {
				page_path: pathname,
			});
		}
	}, [pathname]);

	useEffect(() => {
		if (pathname && window.fbq) {
			window.fbq("track", "PageView");
		}
	}, [pathname]);

	return null;
}

export default function GoogleAnalytics() {
	return (
		<>
			{/* Google tag (gtag.js) */}
			<Script
				src={`https://www.googletagmanager.com/gtag/js?id=${GA4_MEASUREMENT_ID}`}
				strategy="afterInteractive"
			/>
			<Script id="google-analytics" strategy="afterInteractive">
				{`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());

          // GA4 - property 514574483, read by /admin/analytics
          gtag('config', '${GA4_MEASUREMENT_ID}', {
            page_path: window.location.pathname,
          });

          // Google tag container (kept for existing tag/GTM configuration)
          gtag('config', '${GOOGLE_TAG_ID}', {
            page_path: window.location.pathname,
          });

          // Google Ads configuration
          gtag('config', '${GOOGLE_ADS_ID}', {
            allow_enhanced_conversions: true,
          });
          
          gtag('consent', 'default', {
            'ad_storage': 'granted',
            'analytics_storage': 'granted',
            'ad_user_data': 'granted',
            'ad_personalization': 'granted'
          });
        `}
			</Script>

			{/* Meta Pixel Code */}
			<Script id="facebook-pixel" strategy="afterInteractive">
				{`
          !function(f,b,e,v,n,t,s)
          {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
          n.callMethod.apply(n,arguments):n.queue.push(arguments)};
          if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
          n.queue=[];t=b.createElement(e);t.async=!0;
          t.src=v;s=b.getElementsByTagName(e)[0];
          s.parentNode.insertBefore(t,s)}(window, document,'script',
          'https://connect.facebook.net/en_US/fbevents.js');
          fbq('init', '${FB_PIXEL_ID}');
          fbq('track', 'PageView');
        `}
			</Script>
			<noscript>
				<Image
					height={1}
					width={1}
					unoptimized
					className="hidden"
					src={`https://www.facebook.com/tr?id=${FB_PIXEL_ID}&ev=PageView&noscript=1`}
					alt=""
				/>
			</noscript>

			<Suspense fallback={null}>
				<AnalyticsContent />
			</Suspense>
		</>
	);
}
