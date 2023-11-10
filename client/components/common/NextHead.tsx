import React from 'react';
import Head from 'next/head';

export const NextHead = () => {
	return (
		<Head>
			<meta charSet="utf-8" />
			<title>FoodGPT</title>
			<link rel="canonical" href="food-gpt-vision.vercel.app" />
			<link rel="shortcut icon" href="/favicon.ico" />
			<meta property="og:title" content="FoodGPT" />
			<meta property="og:description" content="Your automated food diary" />
			<meta property="og:url" content="food-gpt-vision.vercel.app" />
			<meta property="og:type" content="website" />
			<meta property="og:locale" content="en_US" />
			<meta property="og:image" content={'/camera.png'} />
			<meta property="twitter:cardType" content="summary_large_image" />
			<meta property="twitter:handle" content="@heesang-md" />
			<meta property="twitter:site" content="@heesang-md" />
		</Head>
	);
};
