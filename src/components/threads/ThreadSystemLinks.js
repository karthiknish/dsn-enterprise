import Link from "next/link";
import { activeThreadSystems } from "@/lib/thread-pages.config";

/**
 * Links from a metric size page to the hub and the other thread systems.
 *
 * The indexed per-size pages had no outbound link to /threads, /threads/npt or
 * /threads/unc before this: their only links were to sibling metric sizes and
 * back to /threads/metric. Those three URLs are the ones URL Inspection reported
 * as never crawled, so every indexed page that can point at them should.
 */
export default function ThreadSystemLinks({ exclude }) {
	const systems = activeThreadSystems().filter((s) => s.slug !== exclude);

	return (
		<section
			aria-labelledby="thread-systems-heading"
			className="mt-12 border-t border-gray-200 pt-8"
		>
			<h2
				id="thread-systems-heading"
				className="text-lg font-semibold text-primary mb-4"
			>
				Other thread systems
			</h2>
			<ul className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
				<li>
					<Link
						href="/threads"
						className="font-semibold text-primary underline decoration-secondary decoration-2 underline-offset-2"
					>
						Thread reference charts
					</Link>
				</li>
				{systems.map((system) => (
					<li key={system.slug}>
						<Link
							href={`/threads/${system.slug}`}
							className="font-semibold text-primary underline decoration-secondary decoration-2 underline-offset-2"
						>
							{system.name} thread dimensions
						</Link>
					</li>
				))}
				<li>
					<Link
						href="/fits"
						className="font-semibold text-primary underline decoration-secondary decoration-2 underline-offset-2"
					>
						Limits and fits explained
					</Link>
				</li>
			</ul>
		</section>
	);
}
