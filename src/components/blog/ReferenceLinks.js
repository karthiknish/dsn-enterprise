import Link from "next/link";
import { activeThreadSystems } from "@/lib/thread-pages.config";

/**
 * The crawl path from a blog post into the technical reference layer.
 *
 * Every post is crawled; the /threads cluster and /fits are new and were
 * reachable only from the footer and one product page, which is not enough for
 * Google to have fetched them (URL Inspection showed /threads, /threads/npt,
 * /threads/unc and /fits' neighbours as "never crawled"). Posts are the most
 * frequently recrawled URLs on the site, so a small, honest reference block at
 * the foot of each article is the shortest path to those pages.
 *
 * The system links come from the same generator the routes and sitemap read, so
 * this block cannot point at a thread page that does not exist.
 */
export default function ReferenceLinks() {
	const systems = activeThreadSystems();

	return (
		<section
			aria-labelledby="reference-links-heading"
			className="mt-8 bg-white rounded-xl shadow-sm p-6"
		>
			<h2
				id="reference-links-heading"
				className="text-lg font-semibold text-gray-900 mb-4"
			>
				Reference charts
			</h2>
			<ul className="grid gap-2 sm:grid-cols-2 text-sm">
				<li>
					<Link
						href="/threads"
						className="text-primary font-medium underline decoration-secondary decoration-2 underline-offset-2"
					>
						Thread reference charts
					</Link>{" "}
					<span className="text-gray-600">
						— metric, NPT, UNC and BSP dimensions
					</span>
				</li>
				{systems.map((system) => (
					<li key={system.slug}>
						<Link
							href={`/threads/${system.slug}`}
							className="text-primary font-medium underline decoration-secondary decoration-2 underline-offset-2"
						>
							{system.name} thread chart
						</Link>{" "}
						<span className="text-gray-600">— {system.standard}</span>
					</li>
				))}
				<li>
					<Link
						href="/fits"
						className="text-primary font-medium underline decoration-secondary decoration-2 underline-offset-2"
					>
						Limits and fits explained
					</Link>{" "}
					<span className="text-gray-600">
						— IT grades, H7/g6, hole and shaft basis
					</span>
				</li>
				<li>
					<Link
						href="/faq"
						className="text-primary font-medium underline decoration-secondary decoration-2 underline-offset-2"
					>
						Gauge FAQ
					</Link>{" "}
					<span className="text-gray-600">
						— standards, certificates and lead times
					</span>
				</li>
			</ul>
		</section>
	);
}
