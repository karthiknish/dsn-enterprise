import { negotiatedErrorResponse } from "@/lib/http-error";

export const dynamic = "force-dynamic";

function notFound(request) {
	return negotiatedErrorResponse(request, {
		status: 404,
		defaultFormat: "json",
	});
}

export function GET(request) {
	return notFound(request);
}

export function HEAD(request) {
	return notFound(request);
}

export function POST(request) {
	return notFound(request);
}

export function PUT(request) {
	return notFound(request);
}

export function PATCH(request) {
	return notFound(request);
}

export function DELETE(request) {
	return notFound(request);
}
