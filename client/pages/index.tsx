import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { palette } from 'common/styles';
import axios from 'axios';
import { API_URL } from 'environment';

const index = () => {
	const [email, setEmail] = useState('');
	const [photo, setPhoto] = useState(null);
	const [result, setResult] = useState<string>('');

	const handlePhotoClick = () => {
		const input = document.createElement('input');
		input.type = 'file';
		input.accept = 'image/*';

		input.onchange = (e) => {
			const file = (e.target as HTMLInputElement).files[0];

			const reader = new FileReader();
			reader.readAsDataURL(file);
			reader.onloadend = () => {
				setPhoto(reader.result);
			};
		};

		input.click();
	};

	useEffect(() => {
		if (!photo) return;
		setResult('');

		axios
			.post(`${API_URL}/vision`, { photo })
			.then((res) => {
				console.log(res.data);
				setResult(res.data);
			})
			.catch((err) => {
				console.error(err);
			});
	}, [photo]);

	return (
		<Div>
			<input
				type="email"
				value={email}
				onChange={(e) => setEmail(e.target.value)}
			/>

			<button onClick={handlePhotoClick}>Add Photo</button>

			{photo && <img src={photo} alt="Uploaded" width={200} />}

			{result && <p>{result}</p>}
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
