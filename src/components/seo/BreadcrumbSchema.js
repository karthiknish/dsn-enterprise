import { buildBreadcrumbJsonLd, jsonLdProps } from "@/lib/seo-schema";

/**
 * Server component that renders BreadcrumbList JSON-LD structured data.
 * Pass an array of { name, url } crumbs (url relative to site root).
 */
export default function BreadcrumbSchema({ items }) {
	const schema = buildBreadcrumbJsonLd(items);
	return <script {...jsonLdProps(schema)} />;
}
