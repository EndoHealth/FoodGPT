import styled from 'styled-components';
import { palette } from './palette';

export const Background = styled.div`
	display: flex;
	flex-direction: column;
	width: 100%;
	min-height: 100vh;
	margin: 0 auto;
	background-color: #f5f5f5;
`;
export const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
	width: 500px;
	min-height: 100vh;
	margin: 0 auto;
	background-color: ${palette.white};
`;
export const Header = styled.p`
	display: flex;
	flex-direction: column;
	width: 100%;
	justify-content: center;
	align-items: center;

	font-size: 1.5rem;
	font-weight: 600;
`;
export const PlainText = styled.p`
	display: flex;
	flex-direction: column;
	width: 100%;
	justify-content: center;
	align-items: center;

	font-size: 1rem;
	font-weight: 600;
`;
export const Text = styled.p`
	display: flex;
	flex-direction: column;
	width: 100%;
	justify-content: center;
	align-items: center;

	line-height: 5rem;
	font-size: 3rem;
	font-family: PoorStory-Regular, MonoplexKR-Regular;
	word-break: break-all;
	white-space: pre-wrap;

	-webkit-touch-callout: none !important;
	-webkit-user-select: none !important;
	-khtml-user-select: none !important;
	-moz-user-select: none !important;
	-ms-user-select: none !important;
	user-select: none !important;

	@media (max-width: 800px) {
		line-height: 2rem;
		font-size: 1.5rem;
	}
`;
export const WhiteText = styled(Text)`
	color: ${palette.white};
`;
export const BottomButton = styled.button<{
	disabled?: boolean;
}>`
	display: flex;
	flex-direction: column;
	width: calc(100% - 2rem);
	margin: 0.5rem 1rem;
	height: 3rem;
	background-color: ${(props) =>
		props.disabled ? palette.grey[370] : palette.brand.main};
	color: ${(props) => (props.disabled ? palette.grey[500] : palette.black)};
	border-radius: 0.5rem;
	justify-content: center;
	align-items: center;
	border: none;
	outline: none;
	cursor: pointer;
	font-size: 1rem;
	font-weight: 600;
`;
export const Input = styled.input`
	width: calc(100% - 2rem);
	height: 2rem;
	padding: 1rem 1rem;
	background-color: white;
	font-size: 1rem;
	color: ${palette.blueGrey[800]};
	word-break: break-word;

	outline: none;
	border-radius: 0.5rem;
	border: 1px solid ${palette.blueGrey[800]};
	margin-right: 1rem;

	&::placeholder {
		color: ${palette.grey[500]};
	}
	&:-ms-input-placeholder {
		color: ${palette.grey[500]};
	}
	&::-ms-input-placeholder {
		color: ${palette.grey[500]};
	}

	@media (max-width: 800px) {
		width: calc(100% - 5rem);
	}
`;

export const ContentButton = styled.button`
	display: flex;
	flex-direction: column;
	width: 100%;
	height: 3rem;
	background-color: ${palette.brand.main};
	border-radius: 0.5rem;
	justify-content: center;
	align-items: center;
	border: none;
	outline: none;
	cursor: pointer;
	font-size: 1rem;
	font-weight: 400;
`;
