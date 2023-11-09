import React from 'react';
import Head from 'next/head';

export const NextHead = () => {
	return (
		<Head>
			<meta charSet="utf-8" />
			<title>title</title>
			<link rel="canonical" href="superchat.im" />
			<link rel="shortcut icon" href="/favicon.ico" />
			<meta property="og:title" content="title" />
			<meta property="og:description" content="description" />
			<meta property="og:url" content="superchat.im" />
			<meta property="og:type" content="website" />
			<meta property="og:locale" content="ko_KR" />
			<meta property="og:image" content={'/.png'} />
			<meta property="twitter:cardType" content="summary_large_image" />
			<meta property="twitter:handle" content="@handle" />
			<meta property="twitter:site" content="@site" />
		</Head>
	);
};
