import React from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import { GITHUB_URL, LINKEDIN_URL, TWITTER_URL } from 'environment';
import {
	touchFooterGithub,
	touchFooterLinkedin,
	touchFooterTwitter,
} from 'utils';

export const Footer = ({ color }: { color?: string }) => {
	const router = useRouter();

	return (
		<Div color={color}>
			<FooterItem onClick={touchFooterTwitter}>
				<a href={TWITTER_URL} target="_blank">
					<Icon src="/twitter.png" alt="twitter" />
				</a>
			</FooterItem>
			<Text>|</Text>
			<FooterItem onClick={touchFooterLinkedin}>
				<a href={LINKEDIN_URL} target="_blank">
					<Icon src="/linkedin.png" alt="linkedin" />
				</a>
			</FooterItem>
			<Text>|</Text>
			<FooterItem onClick={touchFooterGithub}>
				<a href={GITHUB_URL} target="_blank">
					<Icon src="/github.png" alt="github" />
				</a>
			</FooterItem>
		</Div>
	);
};

const Div = styled.div<{ color?: string }>`
	display: flex;
	flex-direction: row;
	width: 100%;
	justify-content: center;
	align-items: center;

	margin-top: 52px;

	p {
		color: ${({ color }) => color || '#a4a7ad'};
	}
`;

const Text = styled.p<{ weight?: string }>`
	font-family: 'Pretendard';
	font-style: normal;
	font-weight: 400;
	font-weight: ${({ weight }) => weight || '400'};
	font-size: 4rem;
	line-height: 14px;

	text-align: center;
	text-transform: lowercase;

	flex: none;
	order: 0;
	flex-grow: 0;
	margin: 0 6px;
`;

const FooterItem = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;
	cursor: pointer;
`;
const Icon = styled.img`
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;
	width: 3rem;
	height: 3rem;
	object-fit: contain;
`;
