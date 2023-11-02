// this component show event information to participants and provides a form to registed as many participants the client wants

import DatePicker from 'react-date-picker';
import { useEffect, useState } from 'react';
import { useParams, useNavigate, redirect } from 'react-router-dom';
import { Form, Modal, Button, Icon, Label, Select } from 'semantic-ui-react';
import { getEvent } from '../../api/Events/eventsRoutes';
import styles from './RegisterForm.module.css';
import { createParticipant } from '../../api/Participants/participantsRoute.js';
import { createTicket } from '../../api/Tickets/ticketsRoutes';
import { createOrder } from '../../api/Orders/ordersRoutes';
import { Dropdown } from 'semantic-ui-react';
// import emailjs from "emailjs"
import { sendEmail } from '../../api/Email/sendEmail';
import { createTotalOrder } from '../../api/TotalOrder/TotalOrder';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStripe } from '@fortawesome/free-brands-svg-icons';
import { getCustomField } from '../../api/CustomFields/customFields';

import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';

import CheckoutForm from '../Stripe/CheckoutForm';

// import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

// const { useJsApiLoader } = require("@react-google-maps/api");
// import { useJsApiLoader } from '@react-google-maps/api';

import StripeCheckoutButton from '../StripeBtn/StripeBtn';
import PayPal from '../PayPal/PayPal';

// const initDate = `${new Date().getFullYear()}-${new Date().getMonth()+1}-${new Date().getDate()}`

function RegisterForm() {
	const [orderCreator, setOrderCreator] = useState('');
	const { eventId, numOfTickets } = useParams();

	const generateParticipants = (length) => {
		const defaultParticipant = {
			name: '',
			email: '',
			phone: '',
			gender: 'X',
			address: 'X',
			birthdate: new Date(),
			category: 'X',
			customValues: [
				{
					value: '',
					cfid: '',
					col_name: '',
				},
			],
		};

		return Array.from({ length }).map(() => defaultParticipant);
	};
	const [participantsInfo, setParticipantsInfo] = useState(
		generateParticipants(numOfTickets)
	); // Initializes with 5 participants
	// const [participantsInfo, setParticipantsInfo] = useState([
	// 	{
	// 		name: '',
	// 		email: '',
	// 		phone: '',
	// 		gender: '',
	// 		address: '',
	// 		birthdate: new Date(),
	// 		category: '',
	// 		customValues: [
	// 			{
	// 				value: '',
	// 				cfid: '',
	// 				col_name: '',
	// 			},
	// 		],
	// 	},
	// ]);
	// const [participantsFormHTML, setParticipantsFormHTML] = useState([])
	// const [position, setPosition] = useState({lat:0, lng:0})
	// const position = {lat:0, lng:0}
	const [changeState, setChangeState] = useState(false);
	const [open, setOpen] = useState(false);
	const [invalidFields, setInvalidFields] = useState([]);
	const [isEmailValid, setIsEmailValid] = useState(true);
	const navigate = useNavigate();
	const [customFields, setCustomFields] = useState([]);

	useEffect(() => {
		const getFields = async () => {
			const getCustomFieldsResponse = await getCustomField({
				eventid: eventId,
			});
			setCustomFields(getCustomFieldsResponse.eventCustomFields.customFields);
		};
		getFields().catch(console.error);
	}, []);
	// console.log(eventId)
	// console.log(window.location.pathname)
	const [event, setEvent] = useState();
	const [numOfParticipants, setNumOfParticipants] = useState(numOfTickets);

	const [disabled, setDisabled] = useState(true); //this controls the clickability of the order confirmation button
	const [paymentMethod, setPaymentMehtod] = useState(''); //this controls what payment method the order receives

	// pk_test_6pRNASCoBOKtIshFeQd4XMUh
	const stripePromise = loadStripe(process.env.REACT_APP_PUBLIC_KEY);

	const amount = event ? event.price * numOfParticipants : 0;

	const options = {
		mode: 'payment',
		amount: 1009,
		currency: 'usd',
		paymentMethodOrder: ['paypal'],
		// Fully customizable with appearance API.
		appearance: {
			/*...*/
		},
	};

	const onDateChange = (e, i) => {
		console.log(new Date(e));

		participantsInfo[i] = { ...participantsInfo[i], birthdate: e };
		console.log(participantsInfo);
		setParticipantsInfo(participantsInfo);
		setChangeState(!changeState);
	};

	//  use effect hook used to load event data before rendering component
	useEffect(() => {
		const event = async () => {
			const eventResponse = await getEvent({ id: Number(eventId) });
			// console.log(eventResponse)
			// console.log(eventResponse)
			setEvent(eventResponse.event);
		};
		event().catch(console.error);
		console.log('useEffect', participantsInfo);
		// const formHTML = renderParticipantsForm()
		// setParticipantsFormHTML(formHTML)

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const categoryOptions = [
		{
			key: 'infantiles-13-14',
			value: 'Infantiles 13-14',
			text: 'Infantiles 13-14',
		},
		{ key: 'cadete-15-16', value: 'Cadete 15-16', text: 'Cadete 15-16' },
		{ key: 'junior-17-18', value: 'Junior 17-18', text: 'Junior 17-18' },
		{ key: 'elite-open-19+', value: 'Elite open 19+', text: 'Elite open 19+' },
		{ key: 'master-30-39', value: 'Master 30-39', text: 'Master 30-39' },
		{ key: 'master-40-49', value: 'Master 40-49', text: 'Master 40-49' },
		{ key: 'master-50-59', value: 'Master 50-59', text: 'Master 50-59' },
		{ key: 'master-60+', value: 'Master 60+', text: 'Master 60+' },
		{
			key: 'aficionados-open',
			value: 'Aficionados Open',
			text: 'Aficionados Open',
		},
		{
			key: 'categoria-pueblo',
			value: 'Categoría Pueblo (No Federado)',
			text: 'Categoría Pueblo (No Federado)',
		},
		{
			key: 'infantiles-13-14',
			value: 'Feminas Infantiles 13-14',
			text: 'Feminas Infantiles 13-14',
		},
		{
			key: 'cadete-15-16',
			value: 'Feminas Cadete 15-16',
			text: 'Feminas Cadete 15-16',
		},
		{
			key: 'junior-17-18',
			value: 'Feminas Junior 17-18',
			text: 'Feminas Junior 17-18',
		},
		{
			key: 'elite-open',
			value: 'Feminas Elites open',
			text: 'Feminas Elites open',
		},
		{
			key: 'master-30-39',
			value: 'Feminas Master 30-39',
			text: 'Feminas Master 30-39',
		},
		{
			key: 'master-40-49',
			value: 'Feminas Master 40-49',
			text: 'Feminas Master 40-49',
		},
		{
			key: 'master-50+',
			value: 'Feminas Master 50+',
			text: 'Feminas Master 50+',
		},
		{
			key: 'aficionada-open',
			value: 'Feminas Aficionada Open',
			text: 'Feminas Aficionada Open',
		},
		{
			key: 'categoria-pueblo',
			value: 'Feminas Categoría Pueblo (No Federada)',
			text: 'Feminas Categoría Pueblo (No Federada)',
		},
	];

	const [validationErrors, setValidationErrors] = useState([]);

	const validateEmail = (email) => {
		// const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
		const regex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;
		setIsEmailValid(regex.test(email));
		return regex.test(email);
	};

	const validateParticipant = (participant) => {
		const errors = {};

		if (!participant.name) {
			errors.name = 'Name is required';
		} else {
			delete errors.name;
		}

		if (!participant.email) {
			errors.email = 'Email is required';
		} else {
			delete errors.email;
		}

		if (!participant.phone) {
			errors.phone = 'Phone is required';
		} else if (participant.phone.length != 10) {
			errors.phone = 'Wrong phone number';
		} else {
			delete errors.phone;
		}

		if (!participant.address) {
			errors.address = 'Address is required';
		} else {
			delete errors.address;
		}

		if (!participant.birthdate) {
			errors.birthdate = 'Birthdate is required';
		} else {
			delete errors.birthdate;
		}

		if (!participant.category) {
			errors.category = 'Category is required';
		} else {
			delete errors.category;
		}

		if (!participant.customValues.length && !participant.customValues.value) {
			errors.values = 'Field is required';
		} else {
			delete errors.values;
		}
		// else if (!isValidEmail(participant.email)) {
		//   errors.email = "Invalid email format";
		// }

		// Add more validation rules here...

		return errors;
	};

	const isValidEmail = (email) => {
		// Implement your email validation logic here
		return true;
	};

	useEffect(() => {
		if (isFormValid()) {
			if (event.price > 0) {
				setOpen(true);
			} else {
				handleSubmit('free', 'free', 'free', 0);
			}
		}
	}, [validationErrors]);

	const handleValidation = () => {
		const newErrors = participantsInfo.map((participant) =>
			validateParticipant(participant)
		);
		setValidationErrors(newErrors);
	};

	const isFormValid = () => {
		return (
			participantsInfo[0].name &&
			validationErrors.every((errors) => Object.keys(errors).length === 0)
		);
	};

	//  this will show as many forms as the numbers of participants in order to register such participants
	//   participants creation, first it creates participants and collect their ids
	//   then it create the order and collect its id
	//   finally it create the tickets for the participants and the order
	const getTotalParticipants = () => {
		console.log(numOfParticipants);
		return numOfParticipants;
	};
	const handleSubmit = async (
		paymentIntentId,
		receipt_url,
		status,
		totalCharge
	) => {
		let participantInfoEmail = '';
		let emailData = {
			service_id: process.env.REACT_APP_service_id,
			user_id: process.env.REACT_APP_user_id,
			template_id: process.env.REACT_APP_template_id,
			template_params: {
				destination: `"${orderCreator}"`,
				name: `"${orderCreator}"`,
				subject: 'Order confirmation email',
				from_name: 'PUR Cycling registration platform',
				message: `click here to see recipt: ${receipt_url}`,
			},
		};
		let listOfParticipantId = [];

		console.log(participantsInfo);
		console.log(orderCreator);

		participantsInfo.forEach(async (participant, i) => {
			if (
				participant.name &&
				participant.email &&
				participant.address &&
				participant.birthdate &&
				participant.category &&
				participant.phone &&
				participant.gender
			) {
				if (
					participant.name.length <= 50 &&
					participant.email.length <= 255 &&
					participant.address.length <= 200 &&
					participant.category.length <= 255 &&
					participant.phone.length <= 10 &&
					participant.gender.length === 1
				) {
					participantInfoEmail += `*Participant ${i + 1}*\n`;
					participantInfoEmail += `|------------------------------------|\n`;
					participantInfoEmail += `|      Name:         ${participant.name} \n`;
					participantInfoEmail += `|------------------------------------|\n`;
					participantInfoEmail += `|      Email:        ${participant.email} \n`;
					participantInfoEmail += `|------------------------------------|\n`;
					participantInfoEmail += `|      Phone:        ${participant.phone} \n`;
					participantInfoEmail += `|------------------------------------|\n`;

					console.log('new participant created');
				}
			}
		});
		emailData['template_params']['participants'] = participantInfoEmail;

		console.log(participantsInfo);
		if (customFields.length === 0) delete participantsInfo['customValues'];

		await sendEmail(emailData);
		const orderBodySend = {
			participants:
				customFields.length === 0
					? participantsInfo.map((prt) => {
							return {
								name: prt.name,
								email: prt.email,
								phone: prt.phone,
								gender: 'X',
								address: 'X',
								birthdate: new Date(),
								category: 'X',
							};
					  })
					: participantsInfo,
			eventId: Number(eventId),
			paymentMethod: paymentMethod === '' ? 'free' : paymentMethod,
			orderCreatorEmail:
				orderCreator === '' ? 'jggm9090@gmail.com' : orderCreator,
			paymentIntentId: paymentIntentId,
			status: status,
			totalCharge: totalCharge,
			created: new Date(),
		};

		const orderResponse = await createTotalOrder(orderBodySend);

		setPaymentMehtod(''); //resets the payment method back to blank
		setDisabled(true); //disables the order confirmation button after a successful confirmation

		setNumOfParticipants(1);
		setParticipantsInfo([
			{
				name: '',
				email: '',
				phone: '',
				address: '',
				birthdate: new Date(),
				category: '',
			},
		]);
		navigate(`/registerParticipant/${eventId}`, {
			state: { isRegister: true },
		});
	};

	const datetime = event ? event.date : '';
	const [date] = datetime.split('T');
	return event ? (
		<div className={styles.parent}>
			{console.log(participantsInfo)}

			<div className={styles.container}>
				<p
					style={{
						alignSelf: 'flex-start',
						fontWeight: 'bold',
						fontSize: '2rem',
					}}>
					Register Participants
				</p>

				<p
					style={{
						alignSelf: 'flex-start',
						fontWeight: 'bold',
						fontSize: '2rem',
					}}>
					{event.title}
				</p>

				<div className={styles.details}>
					<p style={{ display: 'flex' }}>
						<p style={{ fontWeight: 'bold', marginRight: '1rem' }}>Price: </p> $
						{event.price}
					</p>
				</div>
				<div className={styles.details}>
					<p style={{ display: 'flex', marginBottom: '2rem' }}>
						<p style={{ fontWeight: 'bold', marginRight: '1rem' }}>Date:</p>{' '}
						{new Date(date).toLocaleString('default', {
							month: 'long',
							day: '2-digit',
							year: 'numeric',
						})}
					</p>
				</div>

				{console.log(customFields)}
				{participantsInfo.map((participant, i) => {
					return (
						<div className={styles.form}>
							<div className={styles.partTitle}>
								<h3>Participant {i + 1}</h3>
								{/* {numOfParticipants > 1 && (
									<Icon
										name='trash alternate outline'
										className={styles.trash}
										size='large'
										onClick={(e) => {
											const clickedCard = e;
											console.log('clickedCard', clickedCard.target.accessKey);
											if (numOfParticipants > 1) {
												setParticipantsInfo((prevState) => {
													const updatedParticipants = prevState.filter(
														(_, index) => index !== i
													);
													return updatedParticipants;
												});
												setNumOfParticipants(numOfParticipants - 1);
											}
										}}></Icon>
								)} */}
							</div>

							<Form.Group
								widths='equal'
								className={styles.eventForm}>
								<Form.Field style={{ marginBottom: '1rem' }}>
									<label style={{ fontWeight: 'bold' }}>Name *</label>
									{validationErrors[i] && validationErrors[i].name && (
										<Label
											basic
											color='red'
											pointing='left'>
											{validationErrors[i].name}
										</Label>
									)}
									<Form.Input
										value={participantsInfo[i].name}
										onChange={(e) => {
											setParticipantsInfo((prevParticipantsInfo) => {
												const updatedInfo = [...prevParticipantsInfo];
												updatedInfo[i] = {
													...updatedInfo[i],
													name: e.target.value,
												};
												return updatedInfo;
											});
										}}
										fluid
										placeholder='Name'
									/>
								</Form.Field>

								<Form.Field style={{ marginBottom: '1rem' }}>
									<label style={{ fontWeight: 'bold' }}>Email *</label>
									{validationErrors[i] && validationErrors[i].email && (
										<Label
											basic
											color='red'
											pointing='left'>
											{validationErrors[i].email}
										</Label>
									)}
									<Form.Input
										value={participantsInfo[i].email}
										onChange={(e) => {
											setParticipantsInfo((prevParticipantsInfo) => {
												const updatedInfo = [...prevParticipantsInfo];
												updatedInfo[i] = {
													...updatedInfo[i],
													email: e.target.value,
												};
												return updatedInfo;
											});
										}}
										fluid
										placeholder='Email'
									/>
								</Form.Field>

								<Form.Field>
									<label style={{ fontWeight: 'bold', marginBottom: '1rem' }}>
										Phone *
									</label>
									{validationErrors[i] && validationErrors[i].phone && (
										<Label
											basic
											color='red'
											pointing='left'>
											{validationErrors[i].phone}
										</Label>
									)}
									<Form.Input
										style={{ marginBottom: '1rem' }}
										value={participantsInfo[i].phone}
										onChange={(e) => {
											console.log(participantsInfo[i].phone);
											const phoneChange = e.target.value.replace(/\D/g, ''); // remove non-number character from string
											if (phoneChange.length < 11) {
												setParticipantsInfo((prevParticipantsInfo) => {
													const updatedInfo = [...prevParticipantsInfo];
													updatedInfo[i] = {
														...updatedInfo[i],
														phone: phoneChange,
													};
													return updatedInfo;
												});
											}
										}}
										fluid
										placeholder='Phone *'
									/>
								</Form.Field>

								{/* <div
									style={{
										display: 'flex',
										flexDirection: 'column',
										marginBottom: '1rem',
									}}>
									<label style={{ fontWeight: 'bold' }}>Birthdate *</label>
									{console.log(participantsInfo[i].birthdate)}
									<DatePicker
										onChange={(e) => onDateChange(e, i)}
										value={participantsInfo[i].birthdate}
									/>
									{validationErrors[i] && validationErrors[i].birthdate && (
										<Label
											basic
											color='red'
											pointing>
											{validationErrors[i].birthdate}
										</Label>
									)}
								</div>

								<Form.Field style={{ marginBottom: '1rem' }}>
									<label style={{ fontWeight: 'bold' }}>Address *</label>
									{validationErrors[i] && validationErrors[i].address && (
										<Label
											basic
											color='red'
											pointing='left'>
											{validationErrors[i].address}
										</Label>
									)}
									<Form.Input
										value={participantsInfo[i].address}
										onChange={(e) => {
											setParticipantsInfo((prevParticipantsInfo) => {
												const updatedInfo = [...prevParticipantsInfo];
												updatedInfo[i] = {
													...updatedInfo[i],
													address: e.target.value,
												};
												return updatedInfo;
											});
										}}
										fluid
										placeholder='Address'
									/>
								</Form.Field>

								<div style={{ marginBottom: '1rem' }}>
									<label style={{ fontWeight: 'bold' }}>Category *</label>
									{validationErrors[i] && validationErrors[i].category && (
										<Label
											basic
											color='red'
											pointing='left'>
											{validationErrors[i].category}
										</Label>
									)}
									<Dropdown
										placeholder='Category'
										fluid
										search
										selection
										options={categoryOptions}
										value={participantsInfo[i].category}
										onChange={(e) => {
											console.log(e.target.innerText);
											setParticipantsInfo((prevParticipantsInfo) => {
												const updatedInfo = [...prevParticipantsInfo];
												updatedInfo[i] = {
													...updatedInfo[i],
													category: e.target.innerText,
													gender: e.target.innerText.includes('Feminas')
														? 'F'
														: 'M',
												};
												return updatedInfo;
											});
										}}
									/>
								</div> */}

								{customFields
									.filter((fld) => {
										return fld.published === true;
									})
									.map((field, index) => {
										// if (!field.published) {
										// 	return null;
										// }
										return (
											<Form.Field style={{ marginBottom: '1rem' }}>
												<label style={{ fontWeight: 'bold' }}>
													{field.name} *
												</label>
												{validationErrors[i] && validationErrors[i].values && (
													<Label
														basic
														color='red'
														pointing='left'>
														{validationErrors[i].values}
													</Label>
												)}
												{field.type === 'boolean' ? (
													<Form.Field
														control={Select}
														style={{ width: '100%' }}
														onChange={(e) => {
															console.log(e.target.textContent.toLowerCase());
															setParticipantsInfo((prevParticipantsInfo) => {
																const updatedInfo = [...prevParticipantsInfo];
																const propName = field.name;
																updatedInfo[i]['customValues'][index] = {
																	value: e.target.textContent.toLowerCase(),
																	cfid: field.id,
																	col_name: `${field.type}_value`,
																};
																// updatedInfo[i] = { ...updatedInfo[i], address: e.target.value };
																return updatedInfo;
															});
														}}
														options={[
															{ key: 't', text: 'True', value: 'true' },
															{ key: 'f', text: 'False', value: 'false' },
														]}
														placeholder={field.name}
														search
														searchInput={{ id: 'form-select-control-gender' }}
													/>
												) : null}
												{field.type === 'string' ? (
													<>
														{field.options.length ? (
															<Form.Input
																value={participantsInfo[i][field.name]}
																onChange={(e) => {
																	setParticipantsInfo(
																		(prevParticipantsInfo) => {
																			const updatedInfo = [
																				...prevParticipantsInfo,
																			];
																			const propName = field.name;
																			updatedInfo[i]['customValues'][index] = {
																				value: e.target.textContent,
																				cfid: field.id,
																				col_name: `${field.type}_value`,
																			};
																			// updatedInfo[i] = { ...updatedInfo[i], address: e.target.value };
																			return updatedInfo;
																		}
																	);
																}}
																control={Select}
																options={field.options.map((opt) => {
																	return { key: opt, text: opt, value: opt };
																})}
																searchInput={{
																	id: 'form-select-control-gender',
																}}
																fluid
																placeholder={`${field.name}`}
															/>
														) : (
															<Form.Input
																value={participantsInfo[i][field.name]}
																onChange={(e) => {
																	setParticipantsInfo(
																		(prevParticipantsInfo) => {
																			const updatedInfo = [
																				...prevParticipantsInfo,
																			];
																			const propName = field.name;
																			updatedInfo[i]['customValues'][index] = {
																				value: e.target.value,
																				cfid: field.id,
																				col_name: `${field.type}_value`,
																			};
																			// updatedInfo[i] = { ...updatedInfo[i], address: e.target.value };
																			return updatedInfo;
																		}
																	);
																}}
																fluid
																placeholder={`${field.name}`}
															/>
														)}
													</>
												) : null}
												{field.type === 'number' ? (
													<Form.Input
														value={
															participantsInfo[i]['customValues'][index]
																? participantsInfo[i]['customValues'][index][
																		'value'
																  ]
																: null
														}
														onChange={(e) => {
															let value = e.target.value.replace(/\D/g, '');
															setParticipantsInfo((prevParticipantsInfo) => {
																const updatedInfo = [...prevParticipantsInfo];
																const propName = field.name;
																updatedInfo[i]['customValues'][index] = {
																	value,
																	cfid: field.id,
																	col_name: `${field.type}_value`,
																};
																// updatedInfo[i] = { ...updatedInfo[i], address: e.target.value };
																return updatedInfo;
															});
														}}
														fluid
														placeholder={`${field.name}`}
													/>
												) : null}
												{field.type === 'date' ? (
													<div
														style={{
															display: 'flex',
															flexDirection: 'column',
														}}>
														<DatePicker
															onChange={(e) => {
																// participantsInfo[i] = { ...participantsInfo[i], birthdate: e };
																console.log(participantsInfo);
																// setParticipantsInfo(participantsInfo);
																setChangeState(!changeState);

																setParticipantsInfo((prevParticipantsInfo) => {
																	const updatedInfo = [...prevParticipantsInfo];
																	const propName = field.name;
																	updatedInfo[i]['customValues'][index] = {
																		value: e,
																		cfid: field.id,
																		col_name: `${field.type}_value`,
																	};
																	// updatedInfo[i] = { ...updatedInfo[i], address: e.target.value };
																	return updatedInfo;
																});
															}}
															value={participantsInfo[i].birthdate}
														/>
														{validationErrors[i] &&
															validationErrors[i].birthdate && (
																<Label
																	basic
																	color='red'
																	pointing>
																	{validationErrors[i].birthdate}
																</Label>
															)}
													</div>
												) : null}
											</Form.Field>
										);
									})}
							</Form.Group>
							<br />
						</div>
					);
				})}
				{/* <div className={styles.btnContainer}>
					<Button
						className={styles.btns}
						onClick={() => {
							setNumOfParticipants(numOfParticipants + 1);
							setParticipantsInfo([
								...participantsInfo,
								{
									name: '',
									email: '',
									phone: '',
									address: '',
									birthdate: new Date(),
									category: '',
									customValues: [],
								},
							]);
						}}>
						Add Participant{' '}
						<Icon
							style={{ marginLeft: '0.5rem' }}
							name='plus'
						/>
					</Button>
				</div> */}

				<div className={styles.btnContainer}>
					<Button
						className={styles.btns}
						onClick={(e) => {
							// handleSubmit();
							handleValidation();
						}}>
						Submit
					</Button>
				</div>
			</div>
			<Modal
				onClose={() => setOpen(false)}
				onOpen={() => setOpen(true)}
				open={open}>
				<Modal.Header>
					<div
						style={{
							display: 'flex',
							justifyContent: 'space-between',
							height: '1.5rem',
						}}>
						<p>Confirm Order</p>
						<p
							style={{
								display: 'flex',
								justifyContent: 'center',
								alignContent: 'center',
								height: 'min-content',
							}}>
							<span style={{ fontSize: '1rem', marginRight: '0.25rem' }}>
								Powered by{' '}
							</span>
							<FontAwesomeIcon
								icon={faStripe}
								size='xl'
							/>
						</p>
					</div>
				</Modal.Header>
				<Modal.Content>
					<Modal.Description></Modal.Description>
					<Form.Field>
						<label style={{ fontWeight: 'bold' }}>
							Order confirmation email
						</label>
						{!isEmailValid && (
							<Label
								basic
								color='red'
								pointing='left'>
								Invalid email address
							</Label>
						)}
						<Form.Input
							onChange={(e) => {
								setOrderCreator(e.target.value);
							}}
							className={styles.emailCreator}
							fluid
							placeholder='Order confirmation email'
						/>
					</Form.Field>

					{console.log('is email valid', isEmailValid)}
				</Modal.Content>
				<Modal.Actions>
					<Elements
						stripe={stripePromise}
						options={options}>
						<CheckoutForm
							setIsEmailValid={setIsEmailValid}
							validateEmail={validateEmail}
							amount={event.price * Number(numOfTickets)}
							numOfParticipants={Number(numOfTickets)}
							submitParticipants={handleSubmit}
							setOpen={setOpen}
							orderBodySend={{
								participants: participantsInfo,
								eventId: Number(eventId),
								paymentMethod: paymentMethod,
								orderCreatorEmail: orderCreator,
							}}
						/>
					</Elements>
				</Modal.Actions>
			</Modal>
		</div>
	) : (
		<>Loading Event</>
	);
}

export default RegisterForm;
