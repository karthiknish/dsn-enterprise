export default function AnalyticsInsightsPanel({ bounceRateRaw }) {
	const bouncePercent = bounceRateRaw
		? (parseFloat(bounceRateRaw) * 100).toFixed(1)
		: "…";

	return (
		<div className="space-y-6">
			<div className="bg-gradient-to-br from-accent to-accent-700 rounded-2xl shadow-lg p-6 text-white">
				<h3 className="text-lg font-semibold mb-2">Performance Tip</h3>
				<p className="text-accent-50 opacity-90 text-sm leading-relaxed">
					Your bounce rate is currently {bouncePercent}%. To improve engagement,
					try adding more internal links in your blog posts and clarifying
					call-to-actions on product pages.
				</p>
				<div className="mt-4 pt-4 border-t border-accent-500/30 flex items-center justify-between text-xs font-medium">
					<span>Last calculated just now</span>
					<span className="px-2 py-1 bg-accent-500/40 rounded-full">GA4 Live</span>
				</div>
			</div>

			<div className="bg-white rounded-2xl border border-gray-200/80 shadow-sm p-6">
				<h3 className="text-base font-semibold text-gray-900 mb-4">Traffic Insights</h3>
				<div className="space-y-4">
					<div className="flex items-start gap-3">
						<div className="w-8 h-8 rounded-full bg-accent-50 flex items-center justify-center shrink-0">
							<span className="text-accent-700 text-xs font-bold">1</span>
						</div>
						<div>
							<h4 className="text-sm font-semibold text-gray-800">Peak Traffic</h4>
							<p className="text-xs text-gray-500">
								Monitor your peak hours to schedule new blog post launches for
								maximum visibility.
							</p>
						</div>
					</div>
					<div className="flex items-start gap-3">
						<div className="w-8 h-8 rounded-full bg-secondary-light flex items-center justify-center shrink-0">
							<span className="text-primary text-xs font-bold">2</span>
						</div>
						<div>
							<h4 className="text-sm font-semibold text-gray-800">User Retention</h4>
							<p className="text-xs text-gray-500">
								Track Sessions vs Users. A higher ratio means users are returning
								to your site frequently.
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
