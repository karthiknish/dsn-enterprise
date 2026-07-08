import Link from "next/link";
import { LinkButton } from "@/components/ui/button";

export const metadata = {
	title: "Page not found",
};

const popularLinks = [
	{ href: "/products", label: "Products" },
	{ href: "/services", label: "Services" },
	{ href: "/calibration", label: "Calibration" },
	{ href: "/about", label: "About Us" },
	{ href: "/industries", label: "Industries" },
	{ href: "/quality", label: "Quality" },
	{ href: "/resources", label: "Resources" },
	{ href: "/blog", label: "Blog" },
	{ href: "/faq", label: "FAQ" },
];

export default function NotFound() {
	return (
		<div className="min-h-[calc(100dvh-4rem)] bg-white text-gray-900">
			<div className="container mx-auto px-4 py-16 md:py-24 flex flex-col items-center justify-center min-h-[inherit] text-center">
				<p className="text-sm font-semibold uppercase tracking-wide text-primary mb-3">
					404
				</p>
				<h1 className="text-4xl md:text-5xl font-semibold text-gray-900 mb-4 text-balance leading-tight max-w-2xl">
					Page not found
				</h1>
				<p className="text-lg text-gray-800 max-w-md mb-10 leading-relaxed">
					That page does not exist or the link is outdated. Use the buttons
					below or the site menu to continue.
				</p>
				<div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full sm:w-auto max-w-sm sm:max-w-none">
					<LinkButton
						href="/"
						variant="default"
						className="px-6 py-3 font-medium"
					>
						Back to home
					</LinkButton>
					<LinkButton
						href="/contact"
						variant="outline"
						className="px-6 py-3 font-medium"
					>
						Contact us
					</LinkButton>
				</div>
				<div className="mt-16 w-full max-w-2xl">
					<p className="text-sm font-semibold uppercase tracking-wide text-gray-500 mb-5">
						Popular pages
					</p>
					<div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
						{popularLinks.map((link) => (
							<Link
								key={link.href}
								href={link.href}
								className="block rounded-lg border border-gray-200 bg-white px-4 py-3 text-left text-gray-700 font-medium hover:border-primary/40 hover:text-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
							>
								{link.label}
							</Link>
						))}
					</div>
				</div>
			</div>
		</div>
	);
}
