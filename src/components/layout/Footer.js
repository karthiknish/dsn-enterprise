import Link from "next/link";
import { FaLinkedin } from "react-icons/fa";

const Footer = () => {
	return (
		<footer className="bg-primary text-white pt-12 pb-6">
			<div className="container mx-auto px-4">
				<div className="grid grid-cols-2 lg:grid-cols-3 gap-8">
					{/* Company Info */}
					<div>
						<h3 className="text-xl font-semibold mb-4">DSN Enterprises</h3>
						<p className="mb-4">
							Leading manufacturer and supplier of precision gauges and
							measuring instruments in India.
						</p>
						<div className="flex gap-x-4">
							<a
								href="https://www.linkedin.com/company/dsn-enterprises/"
								target="_blank"
								rel="noopener noreferrer"
								className="text-white hover:text-secondary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-primary rounded"
								aria-label="DSN Enterprises on LinkedIn"
							>
								<FaLinkedin size={20} aria-hidden />
							</a>
						</div>
					</div>

					{/* Quick Links */}
					<div>
						<h3 className="text-xl font-semibold mb-4">Quick Links</h3>
						<ul className="space-y-2">
							<li>
								<Link
									href="/"
									className="hover:text-secondary transition-colors"
								>
									Home
								</Link>
							</li>
							<li>
								<Link
									href="/about"
									className="hover:text-secondary transition-colors"
								>
									About Us
								</Link>
							</li>
							<li>
								<Link
									href="/industries"
									className="hover:text-secondary transition-colors"
								>
									Industries
								</Link>
							</li>
							<li>
								<Link
									href="/quality"
									className="hover:text-secondary transition-colors"
								>
									Quality Assurance
								</Link>
							</li>
							<li>
								<Link
									href="/calibration"
									className="hover:text-secondary transition-colors"
								>
									Calibration
								</Link>
							</li>
							<li>
								<Link
									href="/blog"
									className="hover:text-secondary transition-colors"
								>
									Blog
								</Link>
							</li>
							<li>
								<Link
									href="/contact"
									className="hover:text-secondary transition-colors"
								>
									Contact
								</Link>
							</li>
						</ul>
					</div>

					{/* Products */}
					<div>
						<h3 className="text-xl font-semibold mb-4">Our Products</h3>
						<ul className="space-y-2">
							<li>
								<Link
									href="/products/thread-gauges"
									className="hover:text-secondary transition-colors"
								>
									Thread Gauges
								</Link>
							</li>
							<li>
								<Link
									href="/products/plain-gauges"
									className="hover:text-secondary transition-colors"
								>
									Plain Gauges
								</Link>
							</li>
							<li>
								<Link
									href="/products/api-gauges"
									className="hover:text-secondary transition-colors"
								>
									API Gauges
								</Link>
							</li>
							<li>
								<Link
									href="/products/special-gauges"
									className="hover:text-secondary transition-colors"
								>
									Special Gauges
								</Link>
							</li>
							<li>
								<Link
									href="/resources"
									className="hover:text-secondary transition-colors"
								>
									Resources
								</Link>
							</li>
							<li>
								<Link
									href="/faq"
									className="hover:text-secondary transition-colors"
								>
									FAQ
								</Link>
							</li>
						</ul>
					</div>
				</div>

				<div className="border-t border-white/20 mt-8 pt-6 text-center">
					<p suppressHydrationWarning>
						&copy; {new Date().getFullYear()} DSN Enterprises. All rights
						reserved.
					</p>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
