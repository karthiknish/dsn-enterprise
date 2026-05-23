import { DatePicker } from "@/components/ui/date-picker";

export default function BlogPublishSidebar({
	formData,
	setFormData,
	saving,
	onCancel,
}) {
	return (
		<div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 sticky top-6 z-10">
			<h3 className="text-lg font-medium text-gray-900 mb-4">Publish</h3>
			<div className="space-y-4">
				<div>
					<label
						id="post-status-label"
						htmlFor="post-status"
						className="block text-sm font-medium text-gray-700 mb-1"
					>
						Status
					</label>
					<select
						id="post-status"
						aria-labelledby="post-status-label"
						value={formData.status}
						onChange={(e) =>
							setFormData({ ...formData, status: e.target.value })
						}
						className="w-full px-4 py-2 text-gray-900 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent bg-white"
					>
						<option value="draft">Draft</option>
						<option value="published">Published</option>
					</select>
				</div>

				<div>
					<fieldset className="border-0 p-0 m-0 min-w-0">
						<legend className="text-sm font-medium text-gray-700 mb-1">
							Published Date
						</legend>
						<DatePicker
							value={formData.publishedDate}
							onChange={(value) =>
								setFormData({ ...formData, publishedDate: value })
							}
							placeholder="Select publish date"
							aria-label="Published date"
						/>
					</fieldset>
				</div>

				<div className="flex gap-3 pt-2">
					<button
						type="button"
						onClick={onCancel}
						className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
					>
						Cancel
					</button>
					<button
						type="submit"
						disabled={saving}
						className="flex-1 px-4 py-2 bg-accent text-white rounded-lg hover:bg-accent-700 transition-colors disabled:opacity-50 font-medium shadow-sm"
					>
						{saving ? (
							<span className="flex items-center justify-center gap-2">
								<svg
									aria-hidden="true"
									className="w-4 h-4 animate-spin"
									fill="none"
									viewBox="0 0 24 24"
								>
									<circle
										className="opacity-25"
										cx="12"
										cy="12"
										r="10"
										stroke="currentColor"
										strokeWidth="4"
									/>
									<path
										className="opacity-75"
										fill="currentColor"
										d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
									/>
								</svg>
								Saving
							</span>
						) : (
							"Save"
						)}
					</button>
				</div>
			</div>
		</div>
	);
}
