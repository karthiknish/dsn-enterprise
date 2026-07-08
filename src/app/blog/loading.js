export default function BlogLoading() {
	const cards = Array.from({ length: 9 });

	return (
		<div className="min-h-screen bg-gray-50 animate-pulse">
			<div className="bg-primary-dark py-16 md:py-20">
				<div className="container mx-auto px-4">
					<div className="h-4 w-20 rounded bg-white/20 mb-4" />
					<div className="h-9 w-64 rounded bg-white/20 mb-3" />
					<div className="h-5 w-96 max-w-full rounded bg-white/10" />
				</div>
			</div>

			<section className="bg-white border-b border-gray-200 py-4">
				<div className="container mx-auto px-4">
					<div className="max-w-2xl mx-auto h-12 rounded-xl bg-gray-100" />
				</div>
			</section>

			<section className="py-16">
				<div className="container mx-auto px-4">
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
						{cards.map((_, i) => (
							<div
								key={i}
								className="bg-white rounded-xl shadow-sm overflow-hidden flex flex-col h-full"
							>
								<div className="w-full h-48 bg-gray-200" />
								<div className="p-6 flex flex-col flex-1 gap-3">
									<div className="h-3 w-24 rounded bg-gray-200" />
									<div className="h-5 w-4/5 rounded bg-gray-200" />
									<div className="h-4 w-full rounded bg-gray-200" />
									<div className="h-4 w-2/3 rounded bg-gray-200" />
								</div>
							</div>
						))}
					</div>
				</div>
			</section>
		</div>
	);
}
