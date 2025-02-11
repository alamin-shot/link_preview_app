"use client";
import { useState } from "react";
import Image from "next/image";

export default function Home() {
	const [url, setUrl] = useState("");
	const [metaData, setMetaData] = useState(null);

	const fetchMetaData = async (e) => {
		e.preventDefault();
		let validUrl =
			url.startsWith("http") || url.startsWith("https")
				? url
				: `https://${url}`;
		try {
			const response = await fetch(
				`/api/getMeta?url=${encodeURIComponent(validUrl)}`
			);
			const data = await response.json();
			// setMetaData(data);
			const parser = new DOMParser();
			const doc = parser.parseFromString(data.html, "text/html");
			console.log(doc);
			const ogTitle =
				doc
					.querySelector('meta[property="og:title"]')
					?.getAttribute("content") || doc.querySelector("title")?.textContent;
			const ogImage = doc
				.querySelector('meta[property="og:image"]')
				?.getAttribute("content");
			const ogDescription =
				doc
					.querySelector('meta[property="og:description"]')
					?.getAttribute("content") ||
				doc.querySelector(`meta[name="description"]`)?.textContent;

			setMetaData({
				title: ogTitle,
				image: ogImage,
				description: ogDescription,
			});
		} catch (error) {
			console.error("Error Fetching Data", error);
		}
	};

	return (
		<>
			<div className="link_preview_app">
				<div className="head_title">
					<h1>Link Preview</h1>
				</div>
				<div className="container">
					<div className="form_section">
						<form onSubmit={fetchMetaData}>
							<div className="input_section">
								<input
									type="text"
									value={url}
									onChange={(e) => setUrl(e.target.value)}
									placeholder="Enter URL"
									required
								/>
							</div>
							<div className="btn">
								<button type="submit">Preview Link</button>
							</div>
						</form>
					</div>

					<div className="meta_data_section">
						{metaData && (
							<div className="preview">
								<div className="preview_card">
									<div className="preview_title">
										<h1>{metaData.title}</h1>
									</div>
									<div className="preview_image">
										<Image
											src={metaData.image}
											alt="preview image"
											width={100}
											height={100}
											unoptimized
										/>
									</div>
									<div className="preview_description">
										<h1>{metaData.description}</h1>
									</div>
								</div>
							</div>
						)}
					</div>
				</div>
			</div>
			<div className="info_section">
				<div className="info_logo">i</div>
				<div className="info_details">
					<div className="info_head">
						<h1>Information</h1>
					</div>
					<p>
						Please try to search with :<br />
						<span>
							URL:
							<span> https://image-search-app-lensify-japk.vercel.app/ </span>
						</span>
						some link may not contain the meta tags to get the
						<span> Preview</span>
					</p>
				</div>
			</div>
		</>
	);
}
