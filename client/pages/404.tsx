import React from 'react';
import styled from 'styled-components';
import { palette } from 'common/styles';
import { Footer, NextHead } from 'components';
import { useRouter } from 'next/router';

const FourOFour = () => {
	const router = useRouter();

	return (
		<>
			<NextHead />
			<Div>
				<Title>존재하지 않는 페이지 입니다.</Title>
				<FilledButton onClick={() => router.push('/')}>
					홈 화면으로 돌아가기
				</FilledButton>
			</Div>
			<Footer />
		</>
	);
};

export default FourOFour;

const Div = styled.div`
	display: flex;
	flex-direction: column;
	width: 100%;
	max-width: 50rem;
	justify-content: center;
	align-items: center;
	margin: 0 auto;

	@media (max-width: 800px) {
		width: calc(100% - 2rem);
		padding: 1rem;
	}
`;

const Title = styled.p`
	font-size: 2rem;
	font-weight: 500;
	line-height: 1.43;
	letter-spacing: -0.3px;
	color: ${palette.grey[900]};
	margin: 20rem auto 2rem auto;

	@media (max-width: 800px) {
		font-size: 1.5rem;
		width: 100%;
		text-align: center;
	}
`;

const FilledButton = styled.button`
	display: flex;
	flex-direction: column;
	width: 100%;
	justify-content: center;
	align-items: center;

	background-color: ${palette.brand.dark};
	color: ${palette.white};
	font-size: 1rem;
	font-weight: 600;
	padding: 1rem 0;

	outline: none;
	border: none;
	border-radius: 0.5rem;
	cursor: pointer;
	margin: 1rem auto 20rem auto;

	&:hover {
		background-color: ${palette.brand.dark};
		opacity: 0.5;
	}

	@media (max-width: 800px) {
		width: 100%;
		font-size: 1rem;
	}
`;
