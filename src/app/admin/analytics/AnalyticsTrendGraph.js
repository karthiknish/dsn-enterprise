export default function AnalyticsTrendGraph({ trends }) {
	if (!trends || trends.length === 0) {
		return (
			<div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg border border-dashed border-gray-200">
				<p className="text-sm text-gray-400 text-center px-4">
					Insufficient data to generate trend visualization
				</p>
			</div>
		);
	}

	const processedData = trends.map((row) => ({
		date: row.dimensionValues[0].value,
		users: parseInt(row.metricValues[0].value, 10),
		sessions: parseInt(row.metricValues[1].value, 10),
	}));

	const maxUsers = Math.max(...processedData.map((d) => d.users), 1);
	const maxSessions = Math.max(...processedData.map((d) => d.sessions), 1);
	const maxValue = Math.max(maxUsers, maxSessions, 10);

	const width = 1000;
	const height = 250;
	const padding = 40;
	const graphWidth = width - padding * 2;
	const graphHeight = height - padding * 2;

	const getX = (index) =>
		padding + index * (graphWidth / (processedData.length - 1 || 1));
	const getY = (value) => height - padding - value * (graphHeight / maxValue);

	const usersPath = processedData
		.map((d, i) => `${i === 0 ? "M" : "L"} ${getX(i)} ${getY(d.users)}`)
		.join(" ");
	const sessionsPath = processedData
		.map((d, i) => `${i === 0 ? "M" : "L"} ${getX(i)} ${getY(d.sessions)}`)
		.join(" ");

	const usersArea = `${usersPath} L ${getX(processedData.length - 1)} ${height - padding} L ${padding} ${height - padding} Z`;

	const step =
		processedData.length < 15 ? 1 : Math.ceil(processedData.length / 10);
	const sparsePoints = [];
	for (let i = 0; i < processedData.length; i++) {
		if (processedData.length < 15 || i % step === 0) {
			sparsePoints.push({ d: processedData[i], idx: i });
		}
	}

	return (
		<div className="w-full overflow-x-auto scrollbar-hide">
			<div className="min-w-[600px]">
				<svg
					aria-hidden="true"
					viewBox={`0 0 ${width} ${height}`}
					className="w-full h-auto drop-shadow-sm"
				>
					{[0, 0.25, 0.5, 0.75, 1].map((p) => (
						<line
							key={p}
							x1={padding}
							y1={height - padding - p * graphHeight}
							x2={width - padding}
							y2={height - padding - p * graphHeight}
							stroke="var(--color-chart-grid)"
							strokeWidth="1"
						/>
					))}

					<path
						d={usersArea}
						fill="url(#usersTrendAreaGradient)"
						opacity="0.1"
					/>

					<path
						d={usersPath}
						fill="none"
						stroke="var(--color-chart-line-users)"
						strokeWidth="3"
						strokeLinecap="round"
						strokeLinejoin="round"
					/>

					<path
						d={sessionsPath}
						fill="none"
						stroke="var(--color-chart-line-sessions)"
						strokeWidth="2"
						strokeDasharray="4 2"
						strokeLinecap="round"
						strokeLinejoin="round"
					/>

					{sparsePoints.map(({ d, idx }) => (
						<g key={idx}>
							<circle
								cx={getX(idx)}
								cy={getY(d.users)}
								r="4"
								fill="var(--color-white)"
								stroke="var(--color-chart-line-users)"
								strokeWidth="2"
							/>
							<text
								x={getX(idx)}
								y={height - padding + 20}
								textAnchor="middle"
								className="text-[10px] fill-gray-400 font-medium"
							>
								{d.date.substring(6, 8)}/{d.date.substring(4, 6)}
							</text>
						</g>
					))}

					<defs>
						<linearGradient
							id="usersTrendAreaGradient"
							x1="0"
							x2="0"
							y1="0"
							y2="1"
						>
							<stop offset="0%" stopColor="var(--color-chart-line-users)" />
							<stop offset="100%" stopColor="transparent" />
						</linearGradient>
					</defs>
				</svg>
			</div>
		</div>
	);
}
