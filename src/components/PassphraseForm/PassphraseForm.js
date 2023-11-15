import React, { useState } from 'react';

const PassphraseForm = ({ onPassphraseCorrect }) => {
	const [passphrase, setPassphrase] = useState('');
	const correctPassphrase = process.env.REACT_APP_PASSPHRASE; // Replace with your actual passphrase

	const handleSubmit = (e) => {
		e.preventDefault();
		if (`${correctPassphrase}` === passphrase) {
			onPassphraseCorrect();
		} else {
			alert('Incorrect passphrase. Please try again.');
			setPassphrase('');
		}
	};

	return (
		<form onSubmit={handleSubmit}>
			<label>Enter Passphrase:</label>
			<input
				type='password'
				value={passphrase}
				onChange={(e) => setPassphrase(e.target.value)}
				required
			/>
			<button type='submit'>Submit</button>
		</form>
	);
};

export default PassphraseForm;
