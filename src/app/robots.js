import { SITE_URL } from "@/lib/site";

export default function robots() {
	return {
		host: SITE_URL,
		rules: [
			{
				userAgent: "*",
				allow: "/",
				disallow: ["/admin/", "/api/", "/contact?", "/blog?page=", "/blog?q="],
			},
		],
		sitemap: `${SITE_URL}/sitemap.xml`,
	};
}
