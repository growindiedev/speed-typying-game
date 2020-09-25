import React from 'react';
import useLogic from './useLogic';
import './styles.css';

function App() {
	const { formik, timeIsRunning, inputRef, startGame, wordCount, timeRemaining } = useLogic(30);

	return (
		<div class="container">
			<form onSubmit={formik.handleSubmit}>
				<h1>How fast can you type?</h1>
				<textarea
					name="text"
					onChange={formik.handleChange}
					value={formik.values.text}
					disabled={!timeIsRunning}
					ref={inputRef}
				/>
				<h4>{`Time remaining : ${timeRemaining}`}</h4>
				<button onClick={startGame} disabled={timeIsRunning}>
					Start
				</button>
				<h1>{`word count: ${wordCount}`}</h1>
				<p>powered by jarryingnut</p>
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
