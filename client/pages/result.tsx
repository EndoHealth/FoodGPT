import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { palette } from 'common/styles';
import { useRecoilState } from 'recoil';
import { useRouter } from 'next/router';
import { resultState, imageState, commentState } from 'recoil/atoms';
import { insertEmailToSupabase } from 'utils/supabase';
import { saveEmail, sendEmail, viewResult } from 'utils';
import { Footer } from 'components';
import { createEmailBody, getRoasted } from 'utils/postprocessing';

const Result = () => {
	const router = useRouter();
	const [result, setResult] = useRecoilState(resultState);
	const [comment, setComment] = useRecoilState(commentState);
	const [image, setImage] = useRecoilState(imageState);
	const [hasEmail, setHasEmail] = useState<boolean>(true);
	const [email, setEmail] = useState<string>('');
	const [isSaved, setIsSaved] = useState<boolean>(false);

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
		if (comment == '' || result == '') return;

		const content = createEmailBody(comment, result);

		// copy content to clipboard
		if (navigator.clipboard && navigator.clipboard.writeText) {
			navigator.clipboard.writeText(content);
		} else {
			alert('Failed to copy to clipboard');
		}

		sendEmail(email);
		setImage(null);
		setIsSaved(true);
	};

	const handleBack = () => {
		setImage(null);
		router.push('/');
	};

	const getIngredients = (result: string) => {
		try {
			const jsonResult = JSON.parse(result);
			const ingredients = jsonResult.ingredients;
			return ingredients;
		} catch {
			return [];
		}
	};

	const classifyCalorie = (calorie: string) => {
		if (!calorie || calorie == '') return 'white';

		const maxCalories = String(calorie).includes('-')
			? parseInt(calorie.split('-').pop())
			: parseInt(calorie);

		if (maxCalories < 100) {
			return palette.grey[200];
		} else if (maxCalories >= 100 && maxCalories <= 300) {
			return palette.blueGrey[200];
		} else {
			return palette.red[200];
		}
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
						<ModalButton type="submit">Submit</ModalButton>
					</ModalForm>
				</ModalContainer>
			)}
			{image && <OriginalImage src={image} alt="Uploaded" width={200} />}
			{comment !== '' && (
				<>
					<Title>Comment</Title>
					<CommentContainer>
						<CommentText>{`${getRoasted(JSON.parse(comment).healthy)}
${JSON.parse(comment).analysis}`}</CommentText>
					</CommentContainer>
				</>
			)}
			{result !== '' && (
				<>
					<Title>Ingredients</Title>
					<IngredientsContainer>
						{getIngredients(result).map((ingredient) => (
							<SingleIngredientContainer
								backgroundColor={classifyCalorie(ingredient.estimated_calories)}
							>
								<IngredientText>
									{ingredient.ingredient.replace(/\s*\([^)]*\)/g, '')}
								</IngredientText>
								<CalorieText>{ingredient.estimated_calories} kcal</CalorieText>
							</SingleIngredientContainer>
						))}
					</IngredientsContainer>
				</>
			)}
			<HoverButtonContainer onClick={() => handleSaveResults()}>
				<HoverButton>Save Results</HoverButton>
			</HoverButtonContainer>
			{isSaved && (
				<SaveModalContainer onClick={(e) => e.stopPropagation()}>
					<SaveModalInner>
						<SaveModalText>Results Copied to Clipboard!</SaveModalText>
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
			<HomeButton onClick={handleBack}>⬅️ Back</HomeButton>
			<Footer />
		</Div>
	);
};

export default Result;

const Div = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	align-items: center;
	width: 100%;
	height: 100%;
	position: relative;
	z-index: 1;
	overflow-x: hidden;
	overflow-y: scroll;
	padding: 20px 0 80px 0;
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
const ModalButton = styled.button`
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
	font-size: 2rem;
	line-height: 2rem;
	text-align: left;
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	width: 100%;
	text-align: center;
	color: ${palette.black};
	margin: 0.5rem auto;

	@media (max-width: 800px) {
		margin-left: 20px;
	}
`;
const OriginalImage = styled.img`
	width: 15rem;
	height: 15rem;
	object-fit: contain;
`;
const CommentContainer = styled.div`
	display: flex;
	width: calc(100% - 40px);
	height: auto;
	margin: 10px auto 20px auto;
	padding: 20px;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	outline: none;
	border: 1px solid black;
	background-color: white;
	cursor: pointer;
	border-radius: 0.5rem;
`;
const CommentText = styled.p`
	font-family: 'Pretendard';
	font-style: normal;
	font-weight: 400;
	font-size: 1rem;
	line-height: 1.5rem;
	text-align: center;
	color: ${palette.black};
	margin: 0.5rem auto;
`;
const IngredientsContainer = styled.div`
	display: grid;
	grid-template-columns: repeat(2, 1fr);
	flex-direction: column;
	align-items: center;
	justify-content: center;
	width: 100%;

	@media (max-width: 800px) {
		display: flex;
	}
`;
const SingleIngredientContainer = styled.div<{ backgroundColor: string }>`
	display: flex;
	width: calc(100% - 40px);
	height: auto;
	min-height: 40px;
	margin: 10px auto;
	padding: 10px;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	outline: none;
	border: 1px solid black;
	background-color: ${(props) => props.backgroundColor};
	cursor: pointer;
	border-radius: 0.5rem;
`;
const IngredientText = styled.p`
	font-family: 'Pretendard';
	font-style: normal;
	font-weight: 600;
	font-size: 1rem;
	line-height: 1.5rem;
	text-align: center;
	color: ${palette.black};
	margin: 0.5rem auto;
`;
const CalorieText = styled.p`
	font-family: 'Pretendard';
	font-style: normal;
	font-weight: 400;
	font-size: 1rem;
	line-height: 1rem;
	text-align: center;
	color: ${palette.black};
	margin: 0.5rem auto;
`;
const HoverButtonContainer = styled.div`
	position: fixed;
	bottom: 0px;
	left: 0px;
	width: 100%;
	height: 80px;
	z-index: 2;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	background-color: white;
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
	z-index: 3;
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
const HomeButton = styled.button`
	width: 100%;
	height: 40px;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	outline: none;
	border: none;
	background-color: white;
	color: black;
	cursor: pointer;
	margin: 10px 0;
	border-radius: 0.5rem;
	font-size: 1rem;
	font-weight: 400;
`;
