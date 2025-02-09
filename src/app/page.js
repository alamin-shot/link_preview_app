import Head from "next/head";
import Image from "next/image";
export default function Home() {
	return (
		<>
			<Head>
				<meta charSet="UTF-8" />
				<meta name="viewport" content="width=device-width, initial-scale=1.0" />
				<meta
					name="description"
					content="Personal Portfolio of Full-Stack Developer"
				/>
				<meta name="author" content="ALAMIN" />

				{/* Open graph  */}

				<meta property="og:title" content="ALAMIN - Full Stack Developer" />
				<meta property="og:description" content="CheckOut my Portfolio" />
				<meta
					property="og:image"
					content="https://pokedex-two-nu-40.vercel.app/images/img.jpg"
				/>
				<meta
					property="og:url"
					content="https://pokedex-two-nu-40.vercel.app/"
				/>
				<meta property="og:type" content="github-repo" />
				<title>AlAmin - Full_Stack_Developer</title>
			</Head>
			<header>
				<h1>Alamin</h1>
				<p>Full_Stack_Developer</p>
				<Image src="/images/img.jpg" width={100} height={100} alt="myImg" />
			</header>
		</>
	);
}
