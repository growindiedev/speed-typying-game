import React, { useState, useEffect } from 'react';
import { Formik, useFormik } from 'formik';
import './styles.css';

function App() {
	const START_TIME = 10;
	const [ timeRemaining, setTimeRemaining ] = useState(START_TIME);
	const [ timeIsRunning, setTimeIsRunning ] = useState(false);
	const [ wordCount, setWordCount ] = useState(0);

	const formik = useFormik({
		initialValues: {
			text: ''
		},
		onSubmit: (values) => {
			console.log(values);
		}
	});

	useEffect(
		() => {
			if (timeIsRunning && timeRemaining > 0) {
				setTimeout(() => {
					setTimeRemaining((time) => time - 1);
				}, 1000);
			} else if (timeRemaining === 0) {
				endGame();
			}
		},
		[ timeRemaining, timeIsRunning ]
	);

	const calculateWordCount = (str) => {
		let wordArray = str.trim().split(' ');
		let filteredWords = wordArray.filter((word) => word !== '').length;
		return filteredWords;
	};

	const startGame = () => {
		setTimeIsRunning(true);
		setTimeRemaining(START_TIME);
		formik.values.text = '';
		setWordCount(0);
	};

	const endGame = () => {
		setTimeIsRunning(false);
		setWordCount(calculateWordCount(formik.values.text));
	};

	return (
		<div>
			<form onSubmit={formik.handleSubmit}>
				<h1>How fast can you type?</h1>
				<textarea
					name="text"
					onChange={formik.handleChange}
					value={formik.values.text}
					disabled={!timeIsRunning}
				/>
				<h4>{`Time remaining : ${timeRemaining}`}</h4>
				<button onClick={startGame} disabled={timeIsRunning}>
					Start
				</button>
				<h1>{`word count: ${wordCount}`}</h1>
			</form>
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
	})
		<form onSubmit={formik.handleSubmit}>
		<h1>How fast can you type?</h1>
		<textarea name="text" onChange={formik.handleChange} value={formik.values.text} />
		<h4>Time Remaining : </h4>
		<button type="submit">Start</button>

		
	</form>
	<Formik initialValues={{ text: '' }} onSubmit={(data) => console.log(data)}>
				{({ values, handleChange, handleSubmit }) => (
					<form onSubmit={handleSubmit}>
						<h1>How fast can you type?</h1>
						<textarea name="text" onChange={handleChange} value={values.text} disabled={!timeIsRunning} />
						<h4>{`Time Remaining : ${timeRemaining}`}</h4>
						<button onClick={startButton}>Start</button>
						<h1>{`word count ${wordCount}`}</h1>
					</form>
				)}
			</Formik>
	
	
	*/
