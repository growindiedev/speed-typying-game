import React from 'react';
import { Formik } from 'formik';
import './styles.css';

function App() {
	return (
		<div>
			<Formik initialValues={{ text: '' }} onSubmit={(data) => console.log(data)}>
				{({ values, handleChange, handleSubmit }) => (
					<form onSubmit={handleSubmit}>
						<h1>How fast can you type?</h1>
						<textarea name="text" onChange={handleChange} value={values.text} />
						<h4>Time Remaining : </h4>
						<button>Start</button>
					</form>
				)}
			</Formik>
		</div>
	);
}

export default App;
