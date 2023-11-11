import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { palette } from 'common/styles';
import axios from 'axios';
import { Footer } from 'components';
import { commentState, imageState, resultState } from 'recoil/atoms';
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
	const inputRef = useRef(null);
	const [loading, setLoading] = useState<boolean>(false);
	const [result, setResult] = useRecoilState(resultState);
	const [image, setImage] = useRecoilState(imageState);
	const [comment, setComment] = useRecoilState(commentState);

	useEffect(() => {
		viewHome();
		setLoading(false);
	}, []);

	useEffect(() => {
		if (!image || image == null) return;

		setLoading(true);
		uploadPhotoInit();

		axios
			.post(`/api/vision`, { image })
			.then((res) => {
				setLoading(false);
				setResult(JSON.stringify(res.data));

				axios
					.get(`/api/food`, {
						params: { message: JSON.stringify(res.data) },
					})
					.then((res) => {
						console.log(res.data);
						setComment(JSON.stringify(res.data));
						uploadPhotoSuccess();
						router.push('/result');
					});
			})
			.catch((err) => {
				uploadPhotoFailure();
				console.error(err);
			});
	}, [image]);

	return (
		<Div>
			<Title>FoodGPT</Title>
			<Divider height="1rem" />
			<Description>Your automated food diary</Description>
			<Divider height="0.5rem" />

			{image ? (
				<Image src={image} alt="Uploaded" width={200} />
			) : (
				<ImageButton onClick={() => inputRef.current?.click()}>
					<img src={'/camera.png'} />
					<input
						ref={inputRef}
						type="file"
						accept="image/*;capture=camera"
						onChange={(e) => {
							const file = e.currentTarget.files[0];

							if (file) {
								const reader = new FileReader();
								reader.readAsDataURL(file);
								reader.onloadend = () => {
									setImage(reader.result);
								};
							}
						}}
						style={{ display: 'none' }}
					/>
				</ImageButton>
			)}

			{loading && <LoadingSpinner src={'/loading.gif'} alt="" />}
			<Divider height="0.5rem" />
			<Description fontSize={'1rem'}>
				We do not save any of the images.
			</Description>
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
const Divider = styled.div<{ height: string }>`
	display: flex;
	width: 100%;
	height: ${(props) => props.height};
`;
const Title = styled.h2`
	font-family: 'Pretendard';
	font-style: normal;
	font-weight: 600;
	font-size: 2.5rem;
	line-height: 2.5rem;
	text-align: center;
	color: ${palette.black};
`;
const Description = styled.p<{ fontSize?: string }>`
	font-family: 'Pretendard';
	font-style: normal;
	font-weight: 400;
	font-size: 1.5rem;
	font-size: ${(props) => (props.fontSize ? props.fontSize : '1.5rem')};
	line-height: ${(props) => (props.fontSize ? props.fontSize : '1.5rem')};
	text-align: center;
	color: ${palette.black};
`;
const ImageButton = styled.button`
	background: transparent;
	outline: none;
	border: none;
	cursor: pointer;

	width: 20rem;
	height: 20rem;

	img {
		width: 100%;
		height: 100%;
		object-fit: contain;
	}

	@media (max-width: 800px) {
		width: calc(100% - 120px);
	}
`;
const Image = styled.img`
	width: 30rem;
	height: 30rem;
	object-fit: contain;

	@media (max-width: 800px) {
		width: calc(100% - 40px);
		margin: 20px 0;
	}
`;
const LoadingSpinner = styled.img`
	background: transparent;
	outline: none;
	border: none;
	cursor: pointer;
	width: 2rem;
	height: 2rem;
	margin-top: 2rem;
`;
