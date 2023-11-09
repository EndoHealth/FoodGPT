import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { palette } from 'common/styles';
import { useRecoilState } from 'recoil';
import { useRouter } from 'next/router';
import { resultState, imageState } from 'recoil/atoms';
import { insertEmailToSupabase } from 'utils/supabase';
import { saveEmail, sendEmail, viewResult } from 'utils';

const Result = () => {
	const router = useRouter();
	const [result, setResult] = useRecoilState(resultState);
	const [image, setImage] = useRecoilState(imageState);
	const [hasEmail, setHasEmail] = useState<boolean>(true);
	const [email, setEmail] = useState<string>('');
	const [isSaved, setIsSaved] = useState<boolean>(true);

	useEffect(() => {
		viewResult(result);

		if (!!localStorage.getItem('email')) {
			setHasEmail(true);
			setEmail(localStorage.getItem('email'));
		} else {
			setHasEmail(false);
		}
	}, []);

	const handleEmailSubmit = () => {
		setHasEmail(true);
		saveEmail();
		localStorage.setItem('email', email);
		insertEmailToSupabase(email);
	};

	const handleSaveResults = () => {
		alert('hi!');

		// send email
		sendEmail(email);
		setIsSaved(true);
	};

	return (
		<Div>
			{!hasEmail && (
				<ModalContainer onClick={(e) => e.stopPropagation()}>
					<ModalText>Enter email to view results</ModalText>
					<ModalForm onSubmit={handleEmailSubmit}>
						<ModalInput
							type="text"
							autoFocus={true}
							value={email}
							onChange={(e) => setEmail(e.target.value)}
						/>
						<ModalButton>Submit</ModalButton>
					</ModalForm>
				</ModalContainer>
			)}
			<Title>Your Food</Title>
			<OriginalImage src={image} alt="Uploaded" width={200} />
			<Text>{result}</Text>
			<HoverButton onClick={() => handleSaveResults()}>
				Save Results
			</HoverButton>
			{isSaved && (
				<SaveModalContainer onClick={(e) => e.stopPropagation()}>
					<SaveModalInner>
						<SaveModalText>Results Sent to Email!</SaveModalText>
						<SaveImage src={'/check.png'} alt="" />
						<SaveModalButton
							onClick={() => {
								setIsSaved(false);
								router.push('/');
							}}
						>
							Dismiss
						</SaveModalButton>
					</SaveModalInner>
				</SaveModalContainer>
			)}
		</Div>
	);
};

export default Result;

const Div = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	width: 100%;
	height: 100%;
	position: relative;
	z-index: 1;
`;
const ModalContainer = styled.div`
	position: fixed;
	width: 100vw;
	height: 100vh;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	background-color: white;
	opacity: 0.9;
	z-index: 100;
`;
const ModalText = styled.p`
	font-family: 'Pretendard';
	font-style: normal;
	font-weight: 600;
	font-size: 2.5rem;
	line-height: 2.5rem;
	text-align: center;
	color: ${palette.black};
	margin-bottom: 1rem;

	@media (max-width: 800px) {
		font-size: 1.5rem;
		line-height: 1.5rem;
	}
`;
const ModalForm = styled.form`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	width: 100%;
	margin: 0;
	padding: 0;
`;
const ModalInput = styled.input`
	width: 400px;
	text-align: center;
	height: 40px;
	outline: none;
	border: 1px solid black;
	padding: 10px;
	border-radius: 0.5rem;
	font-size: 1rem;
	font-weight: 400;
	margin-bottom: 1rem;

	@media (max-width: 800px) {
		width: calc(100% - 40px);
	}
`;
const ModalButton = styled.p`
	width: 400px;
	height: 40px;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	outline: none;
	border: none;
	background-color: ${palette.brand.primary};
	color: white;
	cursor: pointer;
	border-radius: 0.5rem;
	font-size: 1rem;
	font-weight: 400;
	margin-bottom: 1rem;

	@media (max-width: 800px) {
		width: calc(100% - 40px);
	}
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
const OriginalImage = styled.img`
	width: 10rem;
	height: 10rem;
	object-fit: contain;
`;
const Text = styled.p`
	font-family: 'Pretendard';
	font-style: normal;
	font-weight: 400;
	font-size: 1rem;
	line-height: 1rem;
	text-align: center;
	color: ${palette.black};
	margin-bottom: 1rem;
`;
const HoverButton = styled.button`
	position: fixed;
	bottom: 20px;
	left: calc(50% - 200px);
	width: 400px;
	height: 40px;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	outline: none;
	border: none;
	background-color: ${palette.brand.primary};
	color: white;
	cursor: pointer;
	border-radius: 0.5rem;
	z-index: 2;
	font-size: 1rem;
	font-weight: 400;

	@media (max-width: 800px) {
		width: calc(100% - 40px);
		left: 20px;
	}
`;
const SaveModalContainer = styled.div`
	position: fixed;
	width: 100%;
	height: 100vh;
	top: 0;
	left: 0;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	background-color: rgba(0, 0, 0, 0.7);
	z-index: 999;
`;
const SaveModalInner = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	width: 300px;
	height: 300px;
	top: calc(50%-150px);
	left: calc(50%-150px);
	background-color: ${palette.grey[200]};
	border-radius: 1rem;
	padding: 20px;
	z-index: 1000;
`;
const SaveModalText = styled.p`
	font-family: 'Pretendard';
	font-style: normal;
	font-weight: 600;
	font-size: 1.5rem;
	line-height: 1.5rem;
	text-align: center;
	color: ${palette.black};
	margin-bottom: 20px;
`;
const SaveImage = styled.img`
	width: 100px;
	height: 100px;
	object-fit: contain;
	margin-bottom: 20px;
`;
const SaveModalButton = styled.button`
	width: calc(100% - 40px);
	height: 40px;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	outline: none;
	border: none;
	background-color: ${palette.brand.primary};
	color: white;
	cursor: pointer;
	border-radius: 0.5rem;
	font-size: 1rem;
	font-weight: 400;
`;
