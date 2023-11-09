import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { palette } from 'common/styles';
import axios from 'axios';
import { API_URL } from 'environment';
import { Footer } from 'components';
import { imageState, resultState } from 'recoil/atoms';
import { useRecoilState } from 'recoil';
import { useRouter } from 'next/router';
import {
	uploadPhotoFailure,
	uploadPhotoInit,
	uploadPhotoSuccess,
	viewHome,
} from 'utils';

const index = () => {
	const router = useRouter();
	const [loading, setLoading] = useState<boolean>(false);
	const [result, setResult] = useRecoilState(resultState);
	const [image, setImage] = useRecoilState(imageState);

	const handleImageClick = () => {
		const input = document.createElement('input');
		input.type = 'file';
		input.accept = 'image/*';

		input.onchange = (e) => {
			const file = (e.target as HTMLInputElement).files[0];

			const reader = new FileReader();
			reader.readAsDataURL(file);
			reader.onloadend = () => {
				setImage(reader.result);
			};
		};

		input.click();
	};

	useEffect(() => {
		viewHome();
	}, []);

	useEffect(() => {
		if (!image) return;
		setLoading(true);
		uploadPhotoInit();

		axios
			.post(`${API_URL}/vision`, { image })
			.then((res) => {
				setLoading(false);
				setResult(res.data);
				uploadPhotoSuccess();
				router.push('/result');
			})
			.catch((err) => {
				uploadPhotoFailure();
				console.error(err);
			});
	}, [image]);

	return (
		<Div>
			<Title>FoodGPT</Title>
			<Description>Your automated food diary</Description>

			{image ? (
				<img src={image} alt="Uploaded" width={200} />
			) : (
				<ImageButton onClick={handleImageClick}>
					<img src={'/camera.png'} />
				</ImageButton>
			)}

			{loading && <LoadingSpinner src={'/loading.gif'} alt="" />}

			<Footer />
		</Div>
	);
};

export default index;

export const Div = styled.div`
	display: flex;
	flex-direction: column;
	width: 100%;
	height: 100vh;
	justify-content: center;
	align-items: center;
	background-color: white;
	color: black;
`;
const Title = styled.h2`
	font-family: 'Pretendard';
	font-style: normal;
	font-weight: 600;
	font-size: 2.5rem;
	line-height: 2.5rem;
	text-align: center;
	color: ${palette.black};
	margin-bottom: 1rem;
`;
const Description = styled.p`
	font-family: 'Pretendard';
	font-style: normal;
	font-weight: 400;
	font-size: 1.5rem;
	line-height: 1.5rem;
	text-align: center;
	color: ${palette.black};
	margin-bottom: 1rem;
`;
const ImageButton = styled.button`
	background: transparent;
	outline: none;
	border: none;
	cursor: pointer;

	width: 10rem;
	height: 10rem;

	img {
		width: 100%;
		height: 100%;
		object-fit: contain;
	}
`;
const LoadingSpinner = styled.img`
	background: transparent;
	outline: none;
	border: none;
	cursor: pointer;
	width: 2rem;
	height: 2rem;
`;
