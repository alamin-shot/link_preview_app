// // pages/api/getMetaData.js

import { NextResponse } from "next/server";

export async function GET(req, res) {
	const { searchParams } = new URL(req.url, `http://${req.headers.host}`);
	const url = searchParams.get("url"); // Extract the 'url' query parameter

	if (!url) {
		return NextResponse.json(
			{ message: "URL perameter is missing" },
			{ status: 400 }
		);
	}

	try {
		const response = await fetch(url);
		const html = await response.text();

		return NextResponse.json({ html });
	} catch (error) {
		console.error("Error fetching metadata:", error);
		return NextResponse.json(
			{ message: "failed to fetch metadata" },
			{ status: 500 }
		);
	}
}
