import { useState, useEffect, useRef } from 'react';
import { useFormik } from 'formik';

function useLogic(START_TIME) {
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

	const inputRef = useRef(null);

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
		inputRef.current.disabled = false; // this line of code is needed to fix the bug
		inputRef.current.focus();
	};

	const endGame = () => {
		setTimeIsRunning(false);
		setWordCount(calculateWordCount(formik.values.text));
	};

	return { formik, timeIsRunning, inputRef, startGame, wordCount, timeRemaining };
}

export default useLogic;
