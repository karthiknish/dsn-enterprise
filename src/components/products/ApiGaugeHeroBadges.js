import { UilAward } from "@iconscout/react-unicons";

export default function ApiGaugeHeroBadges() {
	return (
		<>
			<span className="inline-flex items-center bg-white/15 border border-white/20 px-4 py-2 rounded-full text-sm">
				<UilAward className="w-4 h-4 mr-2" aria-hidden />
				API 5B Certified
			</span>
			<span className="inline-flex items-center bg-white/15 border border-white/20 px-4 py-2 rounded-full text-sm">
				<UilAward className="w-4 h-4 mr-2" aria-hidden />
				API 7-2 Certified
			</span>
		</>
	);
}
