"use client";

export default function BlogPostsPagination({
	currentPage,
	totalPages,
	onPageChange,
}) {
	if (totalPages <= 1) return null;

	return (
		<div className="flex items-center justify-between bg-white px-4 py-3 sm:px-6 rounded-2xl border border-gray-200/80">
			<div className="flex flex-1 justify-between sm:hidden">
				<button
					type="button"
					onClick={() => onPageChange(currentPage - 1)}
					disabled={currentPage === 1}
					className="relative inline-flex items-center rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
				>
					Previous
				</button>
				<button
					type="button"
					onClick={() => onPageChange(currentPage + 1)}
					disabled={currentPage === totalPages}
					className="relative ml-3 inline-flex items-center rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
				>
					Next
				</button>
			</div>
			<div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
				<div>
					<nav
						className="inline-flex items-center gap-1"
						aria-label="Pagination"
					>
						<button
							type="button"
							onClick={() => onPageChange(currentPage - 1)}
							disabled={currentPage === 1}
							className="relative inline-flex items-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-600 focus:z-20 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
						>
							<span className="sr-only">Previous</span>
							<svg
								className="h-5 w-5"
								viewBox="0 0 20 20"
								fill="currentColor"
								aria-hidden="true"
							>
								<path
									fillRule="evenodd"
									d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z"
									clipRule="evenodd"
								/>
							</svg>
						</button>

						{Array.from({ length: totalPages }, (_, i) => i + 1).map(
							(pageNum) => (
								<button
									type="button"
									key={pageNum}
									onClick={() => onPageChange(pageNum)}
									aria-current={
										currentPage === pageNum ? "page" : undefined
									}
									className={`relative inline-flex items-center justify-center min-w-[2.25rem] h-9 rounded-md px-3 text-sm font-medium focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary transition-colors ${
										currentPage === pageNum
											? "bg-primary text-white"
											: "text-gray-600 hover:bg-gray-100"
									}`}
								>
									{pageNum}
								</button>
							),
						)}

						<button
							type="button"
							onClick={() => onPageChange(currentPage + 1)}
							disabled={currentPage === totalPages}
							className="relative inline-flex items-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-600 focus:z-20 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
						>
							<span className="sr-only">Next</span>
							<svg
								className="h-5 w-5"
								viewBox="0 0 20 20"
								fill="currentColor"
								aria-hidden="true"
							>
								<path
									fillRule="evenodd"
									d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
									clipRule="evenodd"
								/>
							</svg>
						</button>
					</nav>
				</div>
			</div>
		</div>
	);
}
