import React from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/router';

export const Footer = ({ color }: { color?: string }) => {
	const router = useRouter();

	return (
		<Div color={color}>
			<FooterItem
				onClick={() =>
					(window.location.href = 'mailto:huisang.growth@gmail.com')
				}
			>
				<Text>contact</Text>
			</FooterItem>
			<Text>|</Text>
			<Text weight="600">all rights reserved</Text>
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
	font-size: 12px;
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
