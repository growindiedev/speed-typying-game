import React, { useState, useEffect } from 'react';
import { Formik, useFormik } from 'formik';
import './styles.css';

function App() {
	const [ timeRemaining, setTimeRemaining ] = useState(7);
	const [ timeIsRunning, setTimeIsRunning ] = useState(false);

	useEffect(
		() => {
			if (timeIsRunning && timeRemaining > 0) {
				setTimeout(() => {
					setTimeRemaining((time) => time - 1);
				}, 1000);
			} else if (timeRemaining === 0) {
				setTimeIsRunning(false);
				setTimeRemaining(7);
			}
		},
		[ timeRemaining, timeIsRunning ]
	);

	const calculateWordCount = (str) => {
		let wordArray = str.trim().split(' ');
		let filteredWords = wordArray.filter((word) => word !== '');
		return filteredWords.length;
	};

	const startButton = () => {
		setTimeIsRunning(true);
		//calculateWordCount(values.text);
		//setTimeRemaining(7);
	};

	return (
		<div>
			<Formik initialValues={{ text: '' }} onSubmit={(data) => console.log(data)}>
				{({ values, handleChange, handleSubmit }) => (
					<form onSubmit={handleSubmit}>
						<h1>How fast can you type?</h1>
						<textarea name="text" onChange={handleChange} value={values.text} disabled={!timeIsRunning} />
						<h4>{`Time Remaining : ${timeRemaining}`}</h4>
						<button onClick={startButton}>Start</button>
						<h1>{`word count ${calculateWordCount(values.text)}`}</h1>
					</form>
				)}
			</Formik>
		</div>
	);
}

export default App;

/* const formik = useFormik({
		initialValues: {
			text: ''
		},
		onSubmit: (values) => {
			console.log(values);
		}
	
		<form onSubmit={formik.handleSubmit}>
		<h1>How fast can you type?</h1>
		<textarea name="text" onChange={formik.handleChange} value={formik.values.text} />
		<h4>Time Remaining : </h4>
		<button type="submit">Start</button>
	</form>
	
	}); */
