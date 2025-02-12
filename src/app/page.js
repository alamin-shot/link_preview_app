"use client";
import { useState } from "react";
import Image from "next/image";

export default function Home() {
	const [url, setUrl] = useState("");
	const [metaDataList, setMetaDataList] = useState([]);
	const [loading, setLoading] = useState(false);

	const fetchMetaData = async (e) => {
		e.preventDefault();
		setLoading(true);
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

			setMetaDataList((prevList) => [
				...prevList,
				{
					title: ogTitle,
					image: ogImage,
					description: ogDescription,
					url: validUrl,
				},
			]);
			setUrl("");
		} catch (error) {
			console.error("Error Fetching Data", error);
		} finally {
			setLoading(false);
		}
	};

	const truncateText = (text, maxLength) => {
		if (text.length > maxLength) {
			return text.substring(0, maxLength) + "...";
		}
		return text;
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
						{loading ? (
							<div className="loading_section">
								<div className="skeleton_card">
									<div className="skeleton_image"></div>
									<div className="skeleton_det">
										<div className="skeleton_text"></div>
										<div className="skeleton_description"></div>
									</div>
								</div>
							</div>
						) : (
							metaDataList.length > 0 &&
							metaDataList.map((metaData, index) => (
								<a href={metaData.url} target="_blank" key={index}>
									<div className="preview" key={index}>
										<div className="preview_card">
											<div className="preview_image">
												<Image
													src={metaData.image}
													alt="preview image"
													width={100}
													height={100}
													unoptimized
												/>
											</div>
											<div className="preview_texts">
												<div className="preview_title">
													<h1>{truncateText(metaData.title, 20)}</h1>
												</div>

												<div className="preview_description">
													<h1>{truncateText(metaData.description, 100)}</h1>
												</div>
											</div>
										</div>
									</div>
								</a>
							))
						)}
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
			</div>
		</>
	);
}
