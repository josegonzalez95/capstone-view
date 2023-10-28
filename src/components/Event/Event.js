import { useEffect, useState } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { getEvent } from '../../api/Events/eventsRoutes';
import styles from './Event.module.css';
import { numberOfParticipants } from '../../api/Participants/participantsRoute';
import CsvDownloader from 'react-csv-downloader';
import {
	getAllParticipantsByEvent,
	getAllParticipantsByEventWithCustomFields,
} from '../../api/Events/eventsRoutes';
import MyMapComponent from '../Map/MyMapComponent';
// import Image from "../Image/Image";
// const { GoogleMap, LoadScript, DirectionsService, DirectionsRenderer, useJsApiLoader } = require("@react-google-maps/api");
import { useJsApiLoader } from '@react-google-maps/api';
import {
	Button,
	Modal,
	Table,
	Form,
	Input,
	Select,
	Card,
} from 'semantic-ui-react';
import ResizableImage from '../ResizableImage/ResizableImage';
import PaginatedTable from '../PaginatedTable/PaginatedTable';
import MessageBar from '../MessageBar/MessageBar';
import {
	getCustomField,
	createCustomField,
	createOption,
	getOptions,
	updateCustomFieldPublished,
	updateCustomFieldName,
	updateCustomFieldOption,
	deleteCustomFieldOption,
} from '../../api/CustomFields/customFields';
// import { useStripe } from "@stripe/react-stripe-js";

function Event() {
	const [numberParticipants, setnumberOfParticipants] = useState();
	const { id } = useParams();
	const navigate = useNavigate();
	const location = useLocation();
	const [event, setEvent] = useState();
	const [showMessageBar, setShowMessageBar] = useState(false);
	const [open, setOpen] = useState(false);
	const [isFieldCreate, setIsFieldCreate] = useState(false);
	const [customFields, setCustomFields] = useState([]);
	const [eventInfo, setEventInfo] = useState({ name: '', type: '' }); // this should be called fieldInfo
	const [publishField, setPublishField] = useState(false);
	const [idToPublished, setIdToPublished] = useState(null);
	const [addOptions, setAddOptions] = useState(false);
	const [options, setOptions] = useState([]);
	const [isOptionCreate, setIsOptionCreate] = useState(false);
	const [state, setState] = useState({
		optionsValue: '',
		isUpdateFieldName: false,
		nameToUpdate: '',
		isUpdateOption: false,
		optionValueToUpdate: '',
		idOptionToUpdate: null,
		isDeleteOption: false,
	});

	const [participants, setParticipants] = useState([]);
	const position = { lat: 0, lng: 0 };
	console.log(process.env.REACT_APP_MAP_KEY);
	const { isLoaded } = useJsApiLoader({
		id: 'google-map-script',
		googleMapsApiKey: process.env.REACT_APP_MAP_KEY,
	});

	useEffect(() => {
		// geocoder = new google.maps.Geocoder();
		// geocoder = window.google ? window.google.maps.Geocoder():null
		let lat;
		let lng;

		const successCallback = async (position) => {
			// console.log("position",position);
			lat = String(position.coords.latitude);
			lng = String(position.coords.longitude);
		};

		const errorCallback = (error) => {
			console.log(error);
		};

		navigator.geolocation.getCurrentPosition(successCallback, errorCallback);

		// if (location.state && location.state.isEventCreate) {
		// 	setShowMessageBar(true);
		// }
		console.log('use effect', lat, lng);
	}, []);

	useEffect(() => {
		const getParts = async () => {
			// const participants = await asyncGetParticipants();
			// const getCustomFieldsResponse = await getCustomField({ eventid: id });
			// setCustomFields(getCustomFieldsResponse.eventCustomFields.customFields);
			// setParticipants(participants);
			// const res = await fetch(`${process.env.REACT_APP_API_URL}/get-payment-intent`, {
			//   method: 'POST',
			//   body:JSON.stringify({
			//     paymentId:"pi_3Nyd3JDhrjzxPiXM48vQZ7B5"
			//   }),
			//   headers: {
			//     "Content-Type": "application/json",
			//   },
			// });
			// const {paymentIntent} = await res.json()
			// console.log(paymentIntent.status)
			// let participantsResult = []
			// async function processList() {
			//   const results = await Promise.all(participants.map(async (item) => {
			//     // console.log(item)
			//     const result = await fetch(`${process.env.REACT_APP_API_URL}/get-payment-intent`, {
			//       method: 'POST',
			//       body:JSON.stringify({
			//         paymentId:item.paymentdetails
			//       }),
			//       headers: {
			//         "Content-Type": "application/json",
			//       },
			//     });
			//     const response = await result.json()
			//     // return response.paymentIntent.status
			//     let status = response.paymentIntent.status
			//     // ==='succeeded' ? response.paymentIntent.status:"failed"
			//     return {...item, paymentdetails: status}
			//   }));
			//   console.log(results);
			//   participantsResult = results
			// }
			// // Call the async function to start processing the list
			// await processList();
			// setParticipants(participantsResult)
			// console.log(participants);
			// setParticipants(participants);
		};
		// getParts().catch(console.error);
	}, []);

	useEffect(() => {
		setTimeout(() => {
			if (showMessageBar) {
				navigate('', { replace: true });

				setShowMessageBar(false);
			}
		}, 5000);
	}, [showMessageBar]);

	// let lat;
	// let lng

	// const successCallback = (position) => {
	//   console.log("position",position);
	//   lat = position.coords.latitude
	//   lng = position.coords.longitude
	// };

	// const errorCallback = (error) => {
	//   console.log(error);
	// };

	// navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
	// const geocoder = new window.google.maps.Geocoder()

	//  let city
	//   let latlng = new window.google.maps.LatLng(lat, lng)
	//   geocoder.geocode({'latLng': latlng }, function(results, status){
	//     if(status===window.google.maps.GeocoderStatus.OK){
	//       console.log(results)
	//       if(results[1]){
	//         console.log(results[0].formatted_address)
	//         for (var i=0; i<results[0].address_components.length; i++) {
	//           for (var b=0;b<results[0].address_components[i].types.length;b++) {

	//           //there are different types that might hold a city admin_area_lvl_1 usually does in come cases looking for sublocality type will be more appropriate
	//               if (results[0].address_components[i].types[b] === "administrative_area_level_1") {
	//                   //this is the object you are looking for
	//                   city= results[0].address_components[i];
	//                   break;
	//               }
	//           }
	//       }
	//       console.log(city.short_name + " " + city.long_name)
	//       }else{
	//         console.log('results not found')
	//       }
	//     }else{
	//       console.log('geocoder failed')
	//     }
	//   })

	const asyncGetParticipants = async () => {
		console.log(id);
		// const participantsResponse = await getAllParticipantsByEvent({
		// 	eventid: Number(id),
		// });

		const participantsResponse =
			await getAllParticipantsByEventWithCustomFields({
				eventid: Number(id),
			});
		// console.log(participantsResponse)
		// const res = await fetch(`${process.env.REACT_APP_API_URL}/get-payment-intent`, {
		//   method: 'POST',
		//   body:JSON.stringify({
		//     paymentId:"pi_3Nyd3JDhrjzxPiXM48vQZ7B5"
		//   }),
		//   headers: {
		//     "Content-Type": "application/json",
		//   },
		// });
		// const {paymentIntent} = await res.json()
		// console.log(paymentIntent.status)
		// let participantsResult = [];
		// async function processList() {
		// 	const results = await Promise.all(
		// 		participantsResponse.participants.map(async (item) => {
		// 			// console.log(item)

		// 			const result = await fetch(
		// 				`${process.env.REACT_APP_API_URL}/get-payment-intent`,
		// 				{
		// 					method: 'POST',
		// 					body: JSON.stringify({
		// 						paymentId: item.paymentdetails,
		// 					}),
		// 					headers: {
		// 						'Content-Type': 'application/json',
		// 					},
		// 				}
		// 			);
		// 			const response = await result.json();
		// 			// return response.paymentIntent.status
		// 			let status = response.paymentIntent.status;
		// 			// ==='succeeded' ? response.paymentIntent.status:"failed"
		// 			return { ...item, paymentdetails: status };
		// 		})
		// 	);

		// 	console.log(results);
		// 	participantsResult = results;
		// }

		// // Call the async function to start processing the list
		// await processList();

		// participants.forEach(client => {
		//   if (client.active) {
		//     let newClient = {
		//       'Name': client.name,
		//       'Phone': client.phone,
		//     }
		//     allClientsData.push(newClient);
		//   }
		// })
		// return Promise.resolve(participantsResponse.participants);
		const participants = participantsResponse.participants.map(
			(participant) => {
				const transformedObject = {
					...participant, // Spread all properties from the original object
					...participant.customValues.reduce((result, item) => {
						if (item[item.type + '_value'] !== null) {
							result[item.name] = item[item.type + '_value'];
						}
						return result;
					}, {}),
				};
				delete transformedObject['customValues'];
				return transformedObject;
			}
		);

		// participantsResponse.participants.forEach((participant) => {
		// 	const filteredCustomValues = participant.customValues.reduce(
		// 		(result, item) => {
		// 			for (const key in item) {
		// 				if (item[key] !== null) {
		// 					result[item.name] = item[item.type + '_value'];
		// 				}
		// 			}
		// 			return { ...participant, result };
		// 		},
		// 		{ ...participant }
		// 	);
		// 	participants.push(filteredCustomValues);
		// });
		console.log('mis listaaaaa', participants);

		return participants;
	};

	useEffect(() => {
		const event = async () => {
			const eventResponse = await getEvent({ id: Number(id) });
			const numberOfParts = await numberOfParticipants({ eventid: Number(id) });
			const participants = await asyncGetParticipants();
			// const getCustomFieldsResponse = await getCustomField({ eventid: id });
			// console.log(getCustomFieldsResponse);
			// setCustomFields(getCustomFieldsResponse.eventCustomFields.customFields);
			setParticipants(participants);
			setEvent(eventResponse.event);
			setnumberOfParticipants(numberOfParts.ticketNumber.count);
		};
		event().catch(console.error);
		if (location.state && location.state.isEventCreate) {
			setShowMessageBar(true);
		}
		// eslint-disable-next-line
	}, []);
	const datetime = event ? event.date : '';
	const [date] = datetime.split('T');
	return (
		// {event ? <>{event.details}</>:<>Loading Event</>}
		event && participants ? (
			<div className={styles.parent}>
				{console.log(participants)}
				{/* /event/:id/orders/ */}

				<div className={styles.container}>
					{showMessageBar && (
						<MessageBar message={'Event created successfully'} />
					)}

					<p className={styles.title}>{event.title}</p>
					<div className={styles.dtls}>
						{/* <p className={styles.title}>{event.title}</p>  */}

						{/* The following section enables and controls the Social Media Buttons  */}
						<div
							className='container'
							id='contact'>
							<link
								rel='stylesheet'
								//Here's the host for the Font Awesome icons we're using
								href='https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css'
							/>
						</div>
						{/* The buttons for Twitter, WhatsApp and Gmail also share the price and date of the event
            The Facebook buttons don't work the same way because of how they're formatted */}
						<a
							href={`https://www.addtoany.com/add_to/facebook?linkurl=https://capstone-view.herokuapp.com/registerParticipant/${id}%2F&linkname=${event.title}`}
							className='fa fa-facebook'>
							{' '}
						</a>

						<a
							href={`https://www.addtoany.com/add_to/twitter?linkurl=https://capstone-view.herokuapp.com/registerParticipant/${id}%2F%0DDate:${event.date}%0DPrice:$${event.price}&linkname=${event.title}`}
							className='fa fa-twitter'>
							{' '}
						</a>

						<a
							href={`https://www.addtoany.com/add_to/whatsapp?linkurl=https://capstone-view.herokuapp.com/registerParticipant/${id}%2F%0DDate:${event.date}%0DPrice:$${event.price}&linkname=${event.title}`}
							className='fa fa-whatsapp'>
							{' '}
						</a>

						<a
							href={`https://www.addtoany.com/add_to/facebook_messenger?linkurl=https://capstone-view.herokuapp.com/registerParticipant/${id}%2F&linkname=${event.title}`}
							className='fa fa-facebook-square'>
							{' '}
						</a>

						<a
							href={`https://www.addtoany.com/add_to/google_gmail?linkurl=https://capstone-view.herokuapp.com/registerParticipant/${id}%2F%0DDate:${event.date}%0DPrice:$${event.price}&linkname=${event.title}`}
							className='fa fa-google'>
							{' '}
						</a>

						<p
							style={{
								alignSelf: 'flex-start',
								fontWeight: 'bold',
								fontSize: '2rem',
							}}>
							Details
						</p>
						<Button
							className={styles.export}
							style={{ marginTop: '0.5rem' }}>
							<CsvDownloader
								className='export-container'
								datas={asyncGetParticipants}
								filename='participants-export.csv'>
								Export to CSV
							</CsvDownloader>
						</Button>

						<div className={styles.details}>
							<p style={{ display: 'flex' }}>
								<p style={{ fontWeight: 'bold', marginRight: '1rem' }}>
									Price:{' '}
								</p>{' '}
								${event.price}
							</p>
						</div>
						<div className={styles.details}>
							<p style={{ display: 'flex' }}>
								<p style={{ fontWeight: 'bold', marginRight: '1rem' }}>Date:</p>{' '}
								{new Date(date).toLocaleString('default', {
									month: 'long',
									day: '2-digit',
									year: 'numeric',
								})}
							</p>
						</div>
						{/* <div className={styles.details}>
          <p style={{display:"flex"}}><p style={{fontWeight:"bold", marginRight:"1rem"}}>Time:</p> {time.slice(0, -5)}</p> 
          
        </div> */}
						<div>
							<p style={{ display: 'flex' }}>
								<p style={{ fontWeight: 'bold', marginRight: '1rem' }}>
									Participants:
								</p>{' '}
								{numberParticipants}
							</p>
						</div>

						<div
							style={{
								display: 'flex',
								// flexDirection: 'column',
								// width: 'fit-content',
								// backgroundColor: 'red',
								justifyContent: 'space-evenly',
								width: '100%',
								alignItems: 'center',
								marginTop: '1rem',
							}}>
							{/* <Button
								className={styles.export}
								onClick={() => {
									navigate(`/event/${event.id}/orders`);
								}}
								type='submit'>
								Orders
							</Button> */}
							{/* <Card
								onClick={() => {
									navigate(`/event/${event.id}/orders`);
								}}
								style={{ height: '8rem' }}
								className={styles.card}
								header='Orders'
								description='View details of orders for this event.'
							/> */}
							<Card
								onClick={() => {
									navigate(`/event/${event.id}/orders`);
								}}
								className={styles.card}
								style={{ height: '8rem' }}>
								<Card.Content>
									<Card.Header className={styles.card}>Orders</Card.Header>
									<Card.Description className={styles.card}>
										View details of orders for this event.
									</Card.Description>
								</Card.Content>
							</Card>

							{/* <Button
								className={styles.export}
								onClick={async () => {
									// const getCustomFieldsResponse = await getCustomField({
									// 	eventid: id,
									// });
									// console.log(getCustomFieldsResponse);
									// setCustomFields(
									// 	getCustomFieldsResponse.eventCustomFields.customFields
									// );
									// setOpen(true);
									navigate(`/event/${event.id}/formfields`);
								}}>
								Form Fields
							</Button> */}

							<Card
								onClick={() => {
									navigate(`/event/${event.id}/formfields`);
								}}
								className={styles.card}
								style={{ height: '8rem', marginBottom: '2rem' }}>
								<Card.Content>
									<Card.Header className={styles.card}>Form Fields</Card.Header>
									<Card.Description className={styles.card}>
										Customize the fields of your registration form.
									</Card.Description>
								</Card.Content>
							</Card>
						</div>
					</div>
					{/* <p style={{alignSelf:"flex-start", fontWeight:"bold", fontSize:"2rem"}}>Details</p> */}
					<div className={styles.details}>
						{/* <p>${event.price} | {" "}</p>  */}
						{/* <p>{event.date}</p>  */}
						{/* <p> | Participants: {numberParticipants}</p> */}
						{/* <button>
          <CsvDownloader className='export-container' datas={asyncGetParticipants} filename='participants-export.csv' >
              <i className="fa fa-download"></i> Export to CSV
          </CsvDownloader>
          </button> */}
					</div>

					{/* <button>show or export participants</button> */}
					{/* <Image src={event.photo} width={800} height={800}/> */}
					<ResizableImage
						src={event.photo}
						aspectRatio={1 / 1}
					/>

					{/* <img  src={event.photo} alt="fireSpot"/> */}
					{/* <CsvDownloader className='export-container' datas={asyncGetParticipants} filename='participants-export.csv' >
              <i className="fa fa-download"></i> Export to CSV
          </CsvDownloader> */}
					{/* <p style={{alignSelf:"flex-start", fontWeight:"bold", fontSize:"2rem"}}>Details</p>
        <div className={styles.details}>
          <p>${event.price} | {" "}</p> 
          <p>{event.date}</p> 
          <p> | Participants: {numberParticipants}</p>
        </div> */}
					{/* <div style={{display:"none"}}>
        {isLoaded ? <TestMap setPosition={setPosition} location={event.location}/>:<></>}
        </div>*/}
					{isLoaded ? (
						<MyMapComponent
							position={position}
							location={event.location}
						/>
					) : (
						<></>
					)}
					<PaginatedTable participants={participants} />

					<Modal
						onClose={() => setOpen(false)}
						onOpen={() => setOpen(true)}
						open={open}
						// trigger={<Button>Show Modal</Button>}
					>
						{console.log(customFields)}
						<Modal.Header>
							Custom Fields
							<Button
								style={{ marginLeft: '1rem' }}
								color='black'
								onClick={() => {
									setIsFieldCreate(true);
								}}>
								Create Field
							</Button>
						</Modal.Header>
						<Modal.Content>
							{isFieldCreate && (
								<div>
									<Form>
										<Form.Group widths='equal'>
											<Form.Field
												id='form-input-control-first-name'
												control={Input}
												label='Field Name'
												placeholder='Field Name'
												onChange={(e) => {
													console.log(e.target.value);
													setEventInfo((prev) => {
														return { ...prev, name: e.target.value };
													});
												}}
											/>
											<Form.Field
												control={Select}
												onChange={(e) => {
													console.log(e.target.textContent.toLowerCase());
													setEventInfo((prev) => {
														return {
															...prev,
															type: e.target.textContent.toLowerCase(),
														};
													});
												}}
												options={[
													{ key: 's', text: 'String', value: 'string' },
													{ key: 'b', text: 'Boolean', value: 'boolean' },
													{ key: 'd', text: 'Date', value: 'date' },
													{ key: 'n', text: 'Number', value: 'number' },
												]}
												label={{
													children: 'Type',
													htmlFor: 'form-select-control-gender',
												}}
												placeholder='Type'
												search
												searchInput={{ id: 'form-select-control-gender' }}
											/>
										</Form.Group>
									</Form>
									<Button
										color='black'
										onClick={async () => {
											if (eventInfo.name === '' || eventInfo.type === '') {
												setIsFieldCreate(false);
												return;
											}
											await createCustomField({ ...eventInfo, eventid: id });
											setCustomFields((prev) => {
												return [...prev, eventInfo];
											});
											// console.log(eventInfo)
											setIsFieldCreate(false);
										}}>
										Create
									</Button>
									<Button
										color='black'
										onClick={() => setIsFieldCreate(false)}>
										Close
									</Button>
								</div>
							)}
							<Modal.Description>
								<Table celled>
									<Table.Header>
										<Table.Row>
											<Table.HeaderCell>Name</Table.HeaderCell>
											<Table.HeaderCell>Type</Table.HeaderCell>
											<Table.HeaderCell>Options</Table.HeaderCell>
											<Table.HeaderCell>Published</Table.HeaderCell>
										</Table.Row>
									</Table.Header>
									<Table.Body>
										{customFields.map((field, index) => {
											console.log(customFields);
											console.log(field.options);
											return (
												<Table.Row>
													<Table.Cell
														className={styles.selectableCell}
														selectable
														onClick={() => {
															setIdToPublished(field.id);
															setState((prevState) => {
																return {
																	...prevState,
																	isUpdateFieldName: true,
																};
															});
														}}>
														{field.name}
													</Table.Cell>
													<Table.Cell>{field.type}</Table.Cell>
													{field.type === 'string' ? (
														<Table.Cell
															// className={styles.published}
															className={styles.selectableCell}
															selectable
															onClick={async () => {
																const options = await getOptions({
																	cfid: field.id,
																});
																// console.log(options.options);
																setOptions(options.options);
																setAddOptions(true);
																setIdToPublished(field.id);
															}}>
															Manage OPTIONS
														</Table.Cell>
													) : (
														<Table.Cell />
													)}
													<Table.Cell
														className={styles.selectableCell}
														selectable
														onClick={() => {
															setPublishField(true);
															setIdToPublished(field.id);
														}}>
														<p>{String(field.published)}</p>
													</Table.Cell>
												</Table.Row>
												// <div style={{display:'flex'}}>
												//   <p>Name: {field.name}</p>
												//   <p>Type: {field.type}</p>
												// </div>
											);
										})}
									</Table.Body>
								</Table>
							</Modal.Description>
						</Modal.Content>
						<Modal.Actions>
							<Button
								color='black'
								onClick={() => setOpen(false)}>
								Close
							</Button>
						</Modal.Actions>
					</Modal>

					{/* Publish Field Modal */}
					<Modal
						onClose={() => {
							setPublishField(false);
							setIdToPublished(null);
						}}
						// onOpen={() => setPublishField(true)}
						open={publishField}>
						<Modal.Header>Publish Custom Fields ?</Modal.Header>
						<Modal.Actions>
							<Button
								color='black'
								onClick={async () => {
									setPublishField(false);
									setIdToPublished(null);
								}}>
								Close
							</Button>
							<Button
								color='black'
								onClick={async () => {
									await updateCustomFieldPublished({
										id: idToPublished,
										published: false,
									});
									setCustomFields((prevState) => {
										console.log(prevState);
										return prevState.map((field) => {
											if (field.id === idToPublished) {
												return { ...field, published: false };
											}
											return field;
										});
									});
									setPublishField(false);
									setIdToPublished(null);
								}}>
								No
							</Button>
							<Button
								content='Yes'
								labelPosition='right'
								icon='checkmark'
								onClick={async () => {
									await updateCustomFieldPublished({
										id: idToPublished,
										published: true,
									});
									setCustomFields((prevState) => {
										console.log(prevState);
										return prevState.map((field) => {
											if (field.id === idToPublished) {
												return { ...field, published: true };
											}
											return field;
										});
									});
									setPublishField(false);
									setIdToPublished(null);
								}}
								positive
							/>
						</Modal.Actions>
					</Modal>

					{/* Add Options To Field Modal */}
					<Modal
						onClose={() => {
							setAddOptions(false);
							setIdToPublished(null);
						}}
						// onOpen={() => setPublishField(true)}
						open={addOptions}>
						<Modal.Header>
							Manage Field Options
							<Button
								style={{ marginLeft: '1rem' }}
								color='black'
								onClick={() => {
									setIsOptionCreate(true);
								}}>
								Create Option
							</Button>
						</Modal.Header>
						<Modal.Content>
							{isOptionCreate && (
								<div>
									<Form>
										<Form.Group widths='equal'>
											<Form.Field
												id='form-input-control-first-name'
												control={Input}
												label='Option Value'
												placeholder='Option Value'
												onChange={(e) => {
													console.log(e.target.value);
													// setEventInfo((prev) => {
													// 	return { ...prev, name: e.target.value };
													// });
													setState((prevState) => {
														return {
															...prevState,
															optionsValue: e.target.value,
														};
													});
												}}
											/>
										</Form.Group>
									</Form>
									<Button
										color='black'
										onClick={async () => {
											console.log(state.optionsValue, idToPublished);
											if (state.optionsValue === '') {
												setIsOptionCreate(false);
												return;
											}
											// await createCustomField({ ...eventInfo, eventid: id });
											const optResponse = await createOption({
												cfid: idToPublished,
												value: state.optionsValue,
											});
											setOptions((prev) => {
												return [
													...prev,
													{
														id: optResponse.option.id,
														value: state.optionsValue,
														cfid: idToPublished,
													},
												];
											});
											// console.log(eventInfo)
											setIsOptionCreate(false);
										}}>
										Create
									</Button>
									<Button
										color='black'
										onClick={() => {
											setIsOptionCreate(false);
										}}>
										Close
									</Button>
								</div>
							)}
							<Table celled>
								<Table.Header>
									<Table.Row>
										<Table.HeaderCell>Value</Table.HeaderCell>
										<Table.HeaderCell>Actions</Table.HeaderCell>
									</Table.Row>
								</Table.Header>
								<Table.Body>
									{console.log(options)}
									{options.map((opt) => {
										return (
											<>
												<Table.Row>
													<Table.Cell
														className={styles.actionsCell}
														selectable
														onClick={() => {
															setState((prevState) => {
																return {
																	...prevState,
																	isUpdateOption: true,
																	idOptionToUpdate: opt.id,
																};
															});
														}}>
														{opt.value}
													</Table.Cell>
													<Table.Cell
														// className={styles.actionsCell}
														style={{ paddingLeft: '1rem' }}
														selectable
														onClick={() => {
															setState((prevState) => {
																return {
																	...prevState,
																	isDeleteOption: true,
																	idOptionToUpdate: opt.id,
																};
															});
														}}>
														<Button color='black'>Delete option</Button>
													</Table.Cell>
												</Table.Row>
											</>
										);
									})}
								</Table.Body>
							</Table>
						</Modal.Content>
						<Modal.Actions>
							<Button
								color='black'
								onClick={() => {
									setAddOptions(false);
									setIdToPublished(null);
									setOptions([]);
								}}>
								Close
							</Button>
						</Modal.Actions>
					</Modal>
					{/* <img  src={defaultLocation} alt="fireSpot"/>  */}
					{/* update field name modal */}
					<Modal
						open={state.isUpdateFieldName}
						onClose={() =>
							setState((prevState) => {
								return { ...prevState, isUpdateFieldName: false };
							})
						}>
						<Modal.Header>Update Field Name</Modal.Header>
						<Modal.Content>
							<Form.Field
								id='form-input-control-first-name'
								control={Input}
								placeholder='Input Name'
								onChange={(e) => {
									setState((prevState) => {
										return { ...prevState, nameToUpdate: e.target.value };
									});
								}}
							/>
						</Modal.Content>
						<Modal.Actions>
							<Button
								content='Update'
								labelPosition='right'
								icon='checkmark'
								onClick={async () => {
									if (state.nameToUpdate === '') {
										setState((prevState) => {
											return {
												...prevState,
												isUpdateFieldName: false,
											};
										});
										return;
									}
									await updateCustomFieldName({
										id: idToPublished,
										name: state.nameToUpdate,
									});
									setCustomFields((prevState) => {
										console.log(prevState);
										return prevState.map((field) => {
											if (field.id === idToPublished) {
												return { ...field, name: state.nameToUpdate };
											}
											return field;
										});
									});
									setState((prevState) => {
										return {
											...prevState,
											isUpdateFieldName: false,
											nameToUpdate: '',
										};
									});
								}}
								positive
							/>
							<Button
								content='Cancel'
								color='black'
								onClick={() => {
									setState((prevState) => {
										return { ...prevState, isUpdateFieldName: false };
									});
								}}
							/>
						</Modal.Actions>
					</Modal>

					{/* update option value modal */}
					<Modal
						open={state.isUpdateOption}
						onClose={() =>
							setState((prevState) => {
								return { ...prevState, isUpdateOption: false };
							})
						}>
						<Modal.Header>Update Option Value</Modal.Header>
						<Modal.Content>
							<Form.Field
								id='form-input-control-first-name'
								control={Input}
								placeholder='Input Value'
								onChange={(e) => {
									setState((prevState) => {
										return {
											...prevState,
											optionValueToUpdate: e.target.value,
										};
									});
								}}
							/>
						</Modal.Content>
						<Modal.Actions>
							<Button
								content='Update'
								labelPosition='right'
								icon='checkmark'
								onClick={async () => {
									await updateCustomFieldOption({
										id: state.idOptionToUpdate,
										value: state.optionValueToUpdate,
									});
									setOptions((prevState) => {
										return prevState.map((opt) => {
											if (opt.id === state.idOptionToUpdate) {
												return { ...opt, value: state.optionValueToUpdate };
											}
											return opt;
										});
									});
									setState((prevState) => {
										return { ...prevState, isUpdateOption: false };
									});
								}}
								positive
							/>
							<Button
								content='Cancel'
								labelPosition='right'
								onClick={() => {
									setState((prevState) => {
										return { ...prevState, isUpdateOption: false };
									});
								}}
							/>
						</Modal.Actions>
					</Modal>

					{/* delete option modal */}
					<Modal
						open={state.isDeleteOption}
						onClose={() =>
							setState((prevState) => {
								return { ...prevState, isDeleteOption: false };
							})
						}>
						<Modal.Header>Delete Option</Modal.Header>
						<Modal.Actions>
							<Button
								content='Delete'
								labelPosition='right'
								icon='checkmark'
								onClick={async () => {
									await deleteCustomFieldOption({
										id: state.idOptionToUpdate,
									});
									setOptions((prevState) => {
										return prevState.filter((opt) => {
											return opt.id !== state.idOptionToUpdate;
										});
									});
									setState((prevState) => {
										return { ...prevState, isDeleteOption: false };
									});
								}}
								positive
							/>
							<Button
								content='Cancel'
								labelPosition='right'
								onClick={() => {
									setState((prevState) => {
										return { ...prevState, isDeleteOption: false };
									});
								}}
							/>
						</Modal.Actions>
					</Modal>
				</div>
			</div>
		) : (
			<>Loading Event</>
		)
	);
}

export default Event;
