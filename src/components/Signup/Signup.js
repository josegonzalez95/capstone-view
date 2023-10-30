//  This component is a form that allows user input to signup and create a user as a promoter

import React, { useState } from 'react';
import { Button, Form, Label, Icon } from 'semantic-ui-react';
import { signUp } from '../../api/Promoters/promotersRoutes';
import styles from './Signup.module.css';
import PassphraseForm from '../PassphraseForm/PassphraseForm';
import { useNavigate } from 'react-router-dom';
import image from '../../assets/cyQN0U01(1).svg';

const Signup = () => {
	//   user info state initialization, this will be used to store and update user info
	const [userInfo, setUserInfo] = useState({
		name: '',
		password: '',
		email: '',
		address: '',
	});

	const [passphraseCorrect, setPassphraseCorrect] = useState(false);
	const [showPass, setShowPass] = useState(false);
	const navigate = useNavigate();

	const handlePassphraseCorrect = () => {
		setPassphraseCorrect(true);
	};

	const [validationErrors, setValidationErrors] = useState({});

	const validateParticipant = (userInfo) => {
		const errors = {};

		if (!userInfo.email) {
			errors.email = 'Email is required';
		} else {
			delete errors.email;
		}

		if (!userInfo.password) {
			errors.password = 'Password is required';
		} else {
			delete errors.password;
		}

		if (!userInfo.name) {
			errors.name = 'Name is required';
		} else {
			delete errors.name;
		}

		if (!userInfo.address) {
			errors.address = 'Address is required';
		} else {
			delete errors.address;
		}

		// Add more validation rules here...

		return errors;
	};

	const handleValidation = () => {
		const newErrors = validateParticipant(userInfo);
		console.log('new errors', newErrors);

		setValidationErrors(newErrors);
	};

	const isFormValid = () => {
		return Object.keys(validationErrors).length === 0;
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		handleValidation();

		const { name, password, address, email } = userInfo;
		if (isFormValid() && name && password && address && email) {
			if (
				name.length <= 50 &&
				password.length <= 20 &&
				address.length <= 200 &&
				email.length <= 254
			) {
				console.log(userInfo);
				const result = await signUp(userInfo);
				console.log(result.newPromoter);
				navigate('../login', { relative: 'path', state: { isSignUp: true } });
				setUserInfo({ name: '', password: '', email: '', address: '' });
			}
		}
	};

	//  renders form element
	return (
		<>
			{!passphraseCorrect ? (
				<PassphraseForm onPassphraseCorrect={handlePassphraseCorrect} />
			) : (
				<div className={styles.container}>
					<div className={styles.banner}>
						{/* PUR Cycling */}
						<img
							width={'300rem'}
							src={image}
						/>
					</div>
					<div className={styles.form}>
						<p className={styles.title}>Signup</p>
						<Form onSubmit={(e) => handleSubmit(e)}>
							<Form.Field>
								<div className={styles.inputs}>
									<span>
										<label className={styles.labels}>Name</label>
										{validationErrors && validationErrors.name && (
											<Label
												basic
												color='red'
												pointing='left'>
												{validationErrors.name}
											</Label>
										)}
									</span>
									<input
										className={styles.inputFields}
										placeholder='Name'
										onChange={(e) =>
											setUserInfo({ ...userInfo, name: e.target.value })
										}
										value={userInfo.name}
									/>
								</div>
							</Form.Field>
							<Form.Field>
								<div className={styles.inputs}>
									<span>
										<label className={styles.labels}>Email</label>
										{validationErrors && validationErrors.email && (
											<Label
												basic
												color='red'
												pointing='left'>
												{validationErrors.email}
											</Label>
										)}
									</span>
									<input
										className={styles.inputFields}
										placeholder='Email'
										onChange={(e) =>
											setUserInfo({ ...userInfo, email: e.target.value })
										}
										value={userInfo.email}
									/>
								</div>
							</Form.Field>
							<Form.Field>
								<div className={styles.inputs}>
									<span>
										<label className={styles.labels}>Address</label>
										{validationErrors && validationErrors.address && (
											<Label
												basic
												color='red'
												pointing='left'>
												{validationErrors.address}
											</Label>
										)}
									</span>
									<input
										className={styles.inputFields}
										placeholder='Address'
										onChange={(e) =>
											setUserInfo({ ...userInfo, address: e.target.value })
										}
										value={userInfo.address}
									/>
								</div>
							</Form.Field>
							<Form.Field>
								<div className={styles.inputs}>
									<span>
										<label className={styles.labels}>Password</label>
										{validationErrors && validationErrors.password && (
											<Label
												basic
												color='red'
												pointing='left'>
												{validationErrors.password}
											</Label>
										)}
									</span>
									<input
										className={styles.inputFields}
										type={!showPass ? 'password' : 'text'}
										placeholder='Password'
										onChange={(e) =>
											setUserInfo({ ...userInfo, password: e.target.value })
										}
										value={userInfo.password}
									/>
									{!showPass ? (
										<Icon
											className={styles.eye}
											name='eye'
											onClick={() => {
												setShowPass(true);
											}}></Icon>
									) : (
										<Icon
											className={styles.eye}
											name='eye slash'
											onClick={() => {
												setShowPass(false);
											}}></Icon>
									)}
								</div>
							</Form.Field>
							<Button
								className={styles.sbmtBtn}
								type='submit'>
								SignUp
							</Button>
							<p>
								Already have an account ? <a href='/login'>LogIn</a>
							</p>
						</Form>
					</div>
				</div>
			)}
		</>
	);
};

export default Signup;
