import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { palette } from 'common/styles';
import { useRouter } from 'next/router';

export const GNB = () => {
	const router = useRouter();
	const { asPath } = router;
	const [selected, setSelected] = useState<string>('home');

	useEffect(() => {
		if (asPath.startsWith('/chat')) {
			setSelected('chat');
		} else if (asPath.startsWith('/feed')) {
			setSelected('feed');
		} else if (asPath.startsWith('/setting')) {
			setSelected('setting');
		} else {
			setSelected('home');
		}
	}, [asPath]);

	const gnbList = [
		{ displayName: '홈', title: 'home' },
		{ displayName: '채팅', title: 'chat' },
		{ displayName: '피드', title: 'feed' },
		{ displayName: '설정', title: 'setting' },
	];
	return (
		<Div>
			{gnbList.map((item) => (
				<GNBIcon
					key={item.title}
					title={item.title}
					displayName={item.displayName}
					isSelected={selected === item.title}
				/>
			))}
		</Div>
	);
};

const Div = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: space-around;
	background-color: white;
	width: 100%;
	max-width: 50rem;
	margin: 0 auto;
	height: 5rem;

	position: fixed;
	z-index: 1000;
	bottom: 0;
	left: 50%;
	transform: translateX(-50%);
`;

export const GNBIcon = ({
	displayName,
	title,
	isSelected,
}: {
	displayName: string;
	title: string;
	isSelected: boolean;
}) => {
	const router = useRouter();
	const handleClickIcon = (title: string) => {
		title == 'home' ? router.push('/') : router.push(`/${title}`);
	};

	return (
		<IconContainer onClick={() => handleClickIcon(title)}>
			<Icon
				src={isSelected ? `/gnb_${title}_dark.svg` : `/gnb_${title}_light.svg`}
				alt={title}
			/>
			<IconText isSelected={isSelected}>{displayName}</IconText>
		</IconContainer>
	);
};

const IconContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	height: 5rem;
	padding: 0.5rem;
	cursor: pointer;
`;
const Icon = styled.img`
	display: flex;
	width: 2.5rem;
	height: 2.5rem;
	object-fit: contain;
	margin-bottom: 0.5rem;
	color: white;
	background-color: white;
`;
const IconText = styled.p<{ isSelected: boolean }>`
	display: flex;
	font-size: 1rem;
	font-weight: 500;
	text-align: center;
	color: ${(props) =>
		props.isSelected ? palette.brand.dark : palette.brand.light};
`;
