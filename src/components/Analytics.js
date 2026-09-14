"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";
import Script from "next/script";
import { Suspense, useEffect, useRef } from "react";
import { captureAttribution } from "@/lib/attribution";

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
 * Google Ads tag that owns the conversion actions. This must stay in sync with
 * GOOGLE_ADS_ID in src/lib/gtag.js: a conversion label only resolves against
 * the tag it was created under. The CID-derived AW-3267328717 has no conversion
 * actions behind it and silently counts nothing.
 */
const GOOGLE_ADS_ID = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID || "AW-17769294111";
const FB_PIXEL_ID = "1391622058130598";

/**
 * Consent Mode default.
 *
 * This has always emitted `granted` for ad and analytics storage with no
 * banner. That is a legal/business decision, not a technical one, so it is left
 * as the default — but it is now changeable without a code edit:
 * NEXT_PUBLIC_GA_CONSENT_DEFAULT=denied emits the denied default instead, which
 * is the prerequisite for a consent banner to be able to grant it later.
 */
const CONSENT_DEFAULT =
	process.env.NEXT_PUBLIC_GA_CONSENT_DEFAULT === "denied"
		? "denied"
		: "granted";

function AnalyticsContent() {
	const pathname = usePathname();
	const lastTrackedPath = useRef(null);

	// Record the first page of the browser session. This sits in the root layout
	// so the entry page is captured even when the visitor arrives on a page with
	// no form and navigates to the contact form later. captureAttribution() is
	// idempotent, so repeat mounts and hard navigations do not overwrite it.
	useEffect(() => {
		captureAttribution();
	}, []);

	/**
	 * Client-side navigations only.
	 *
	 * The inline gtag bootstrap below already sends the page view for the entry
	 * URL, and the Meta pixel snippet already sends its entry PageView. This
	 * effect therefore remembers the first pathname it sees and stays silent for
	 * it, then reports each subsequent change once — so a landing page is counted
	 * exactly once rather than twice, and navigations are still tracked.
	 */
	useEffect(() => {
		if (!pathname) return;

		const isFirst = lastTrackedPath.current === null;
		const changed = lastTrackedPath.current !== pathname;
		lastTrackedPath.current = pathname;
		if (isFirst || !changed) return;

		if (window.gtag) {
			// GA4 first — this is the one that populates the admin dashboard.
			window.gtag("config", GA4_MEASUREMENT_ID, {
				page_path: pathname,
			});
			window.gtag("config", GOOGLE_TAG_ID, {
				page_path: pathname,
			});
		}

		if (window.fbq) {
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
            'ad_storage': '${CONSENT_DEFAULT}',
            'analytics_storage': '${CONSENT_DEFAULT}',
            'ad_user_data': '${CONSENT_DEFAULT}',
            'ad_personalization': '${CONSENT_DEFAULT}'
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
