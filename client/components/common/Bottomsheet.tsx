import React, { ReactNode } from 'react';
import styled from 'styled-components';
import { palette } from 'common/styles';
import { useRouter } from 'next/router';
import { useRecoilState } from 'recoil';
import { isBottomsheetVisibleState } from 'recoil/atoms';

export const Bottomsheet = ({
	contentComponent,
}: {
	contentComponent: ReactNode;
}) => {
	const [isBottomsheetVisible, setIsBottomsheetVisible] = useRecoilState(
		isBottomsheetVisibleState
	);

	const title = '채팅 시작';
	const router = useRouter();
	const buttons = [
		{
			title: '1:1 채팅',
			onClick: () => router.push('/'),
			color: 'default',
		},
		{
			title: '다른 캐릭터 초대',
			onClick: () => router.push('/'),
			color: 'primary',
		},
	];

	const handleBackgroundClick = (e) => {
		e.preventDefault();
		e.stopPropagation();
		setIsBottomsheetVisible(false);
	};

	return (
		<Div>
			<LayerContainer onClick={(e) => handleBackgroundClick(e)} />
			<RelativeContainer>
				<BottomsheetContainer>
					<Title>{title}</Title>
					<ContentContainer>{contentComponent}</ContentContainer>
					<ButtonContainer>
						{buttons.map((btn) => (
							<Button onClick={btn.onClick} color={btn.color}>
								<ButtonText color={btn.color}>{btn.title}</ButtonText>
							</Button>
						))}
					</ButtonContainer>
				</BottomsheetContainer>
			</RelativeContainer>
		</Div>
	);
};

const Div = styled.div`
	display: flex;
	position: fixed;
	flex-direction: column;
	width: 100%;
	max-width: 50rem;
	margin: 0 auto;
	height: 100%;

	position: fixed;
	z-index: 2000;
	bottom: 0;
	left: 50%;
	transform: translateX(-50%);
`;
const LayerContainer = styled.div`
	display: flex;
	flex-direction: column;
	width: 100%;
	height: 100%;
	background-color: rgba(0, 0, 0, 0.2);
	z-index: 1100;
`;
const RelativeContainer = styled.div`
	display: flex;
	flex-direction: column;
	width: 100%;
	position: relative;
`;
const BottomsheetContainer = styled.div`
	display: flex;
	flex-direction: column;

	position: absolute;
	bottom: 0;
	left: 0;
	width: 100%;
	height: 25rem;
	padding: 0rem 2rem 2rem 2rem;

	border-radius: 2rem 2rem 0 0;
	background-color: white;
	z-index: 1200;
`;
const Title = styled.p`
	width: 100%;
	height: 4rem;
	text-align: center;

	font-size: 1.5rem;
	line-height: 4rem;
	font-weight: 600;
	color: ${palette.brand.dark};
`;
const ContentContainer = styled.div`
	display: flex;
	flex-direction: column;
	width: 100%;
	height: calc(100% - 4rem - 3rem);
	justify-content: center;
	align-items: center;
`;
const ButtonContainer = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	width: 100%;
	height: 3rem;
`;
const Button = styled.button<{ color: string }>`
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;
	width: calc(50% - 1rem);
	background-color: ${(props) =>
		props.color === 'default' ? palette.white : palette.brand.primary};
	border: 1px solid black;
	border-color: ${(props) =>
		props.color === 'default' ? palette.brand.dark : palette.brand.primary};
	border-radius: 0.5rem;
	outline: none;
	cursor: pointer;
`;
const ButtonText = styled.p<{ color: string }>`
	height: 3rem;
	font-size: 1rem;
	line-height: 3rem;
	font-weight: 400;
	color: ${(props) =>
		props.color === 'default' ? palette.brand.dark : palette.white};
`;
