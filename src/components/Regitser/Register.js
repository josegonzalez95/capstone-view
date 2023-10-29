// this component show event information to participants and provides a form to registed as many participants the client wants
import { useEffect, useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { Modal, Button, Select, Form } from 'semantic-ui-react';
import { getEvent } from '../../api/Events/eventsRoutes';
import styles from './Register.module.css';
import MyMapComponent from '../Map/MyMapComponent';
import { useJsApiLoader } from '@react-google-maps/api';
import ResizableImage from '../ResizableImage/ResizableImage';
import MessageBar from '../MessageBar/MessageBar';

function Event() {
	const position = { lat: 0, lng: 0 };
	const [open, setOpen] = useState(false);
	const navigate = useNavigate();
	const location = useLocation();
	console.log(window.location);

	const { eventId } = useParams();
	console.log(eventId);
	console.log(window.location.pathname);
	const [event, setEvent] = useState();
	const [showRegisterMessgeBar, setShowRegisterMessageBar] = useState(false);

	const { isLoaded } = useJsApiLoader({
		id: 'google-map-script',
		googleMapsApiKey: process.env.REACT_APP_MAP_KEY,
	});

	// const onDateChange=(e, i)=>{
	//   console.log(new Date(e))

	//   participantsInfo[i] = {...participantsInfo[i], birthdate: e}
	//                 console.log(participantsInfo)
	//   setParticipantsInfo(participantsInfo)
	//   setChangeState(!changeState)
	// }

	//  his will show as many forms as the numbers of participants in order to register such participants
	// const renderParticipantsForm = ()=>{
	//   let participantsFormHTML = []
	//   for(let i = 0; i<numOfParticipants; i++){
	//     participantsFormHTML.push(
	//       <div >
	//           <Form.Group widths='equal' className={styles.eventForm}>
	//               <Form.Input onChange={(e)=>{
	//                 participantsInfo[i] = {...participantsInfo[i], name:e.target.value}
	//                 // console.log(participantsInfo)
	//                 setParticipantsInfo(participantsInfo)
	//               }} fluid label='Name' placeholder='Name' />

	//               <Form.Input onChange={(e)=>{
	//                 participantsInfo[i] = {...participantsInfo[i], email:e.target.value}
	//                 setParticipantsInfo(participantsInfo)
	//               }} fluid label='Email' placeholder='Email' />

	//               <Form.Input onChange={(e)=>{
	//                 participantsInfo[i] = {...participantsInfo[i], phone:e.target.value}
	//                 setParticipantsInfo(participantsInfo)
	//               }} fluid label='Phone' placeholder='Phone' />

	//               <Form.Input onChange={(e)=>{
	//                 participantsInfo[i] = {...participantsInfo[i], gender:e.target.value}
	//                 setParticipantsInfo(participantsInfo)
	//               }} fluid label='Gender' placeholder='Gender' />

	//         <div style={{display:"flex", flexDirection:"column"}}>
	//         <label style={{fontWeight:"bold"}}>Birthdate</label>
	//         {console.log(participantsInfo[i].birthdate)}
	//         <DatePicker onChange={(e)=>onDateChange(e, i)} value={participantsInfo[i].birthdate}/>
	//         </div>
	//               {/*
	//               <Form.Input onChange={(e)=>{
	//                 participantsInfo[i] = {...participantsInfo[i], birthdate:e.target.value}
	//                 setParticipantsInfo(participantsInfo)
	//               }} fluid label='Birthdate' placeholder='Birthdate' /> */}

	//               <Form.Input onChange={(e)=>{
	//                 participantsInfo[i] = {...participantsInfo[i], address:e.target.value}
	//                 setParticipantsInfo(participantsInfo)
	//               }} fluid label='Address' placeholder='Address' />

	//               <Form.Input onChange={(e)=>{
	//                 participantsInfo[i] = {...participantsInfo[i], category:e.target.value}
	//                 setParticipantsInfo(participantsInfo)
	//               }} fluid label='Category' placeholder='Category' />
	//           </Form.Group>
	//           {/* <button onClick={(e)=>{handleSubmit(e)}}>submit</button> */}
	//           <br/>
	//         </div>
	//     )
	//   }
	//   return <>{participantsFormHTML}</>
	// }

	//   participants creation, first it creates participants and collect their ids
	//   then it create the order and collect its id
	//   finally it create the tickets for the participants and the order
	// const handleSubmit =async(e)=>{
	//   let listOfParticipantId = []
	//   e.preventDefault()

	//   console.log(participantsInfo)
	//   console.log(orderCreator)

	//   participantsInfo.forEach(async participant => {
	//     const participantResponse = await createParticipant(participant)
	//     console.log((participantResponse))
	//     listOfParticipantId = listOfParticipantId.concat(participantResponse.newParticipant.participant.id)
	//   });
	//   // create order
	//   const orderResponse = await createOrder({orderemail: orderCreator, paymentdetails:""})
	//   console.log(listOfParticipantId)

	//   const orderId = orderResponse.newOrder.order.id
	//   listOfParticipantId.forEach(async id=>{
	//     await createTicket({participantid: id, orderid: orderId, eventid: Number(eventId)})
	//   })
	//   setNumOfParticipants(1)
	//   setParticipantsInfo([{name:"", email:"", phone:"", address:"",birthdate:new Date(), category:""}])
	//   window.location.reload()
	//   // create tickets
	// }

	//  use effect hook used to load event data before rendering component
	useEffect(() => {
		const event = async () => {
			const eventResponse = await getEvent({ id: Number(eventId) });
			console.log(eventResponse);
			console.log(eventResponse);
			setEvent(eventResponse.event);

			if (location.state && location.state.isRegister) {
				setShowRegisterMessageBar(true);
			}
		};
		event().catch(console.error);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		setTimeout(() => {
			if (showRegisterMessgeBar) {
				navigate('', { replace: true });

				setShowRegisterMessageBar(false);
			}
		}, 5000);
	}, [showRegisterMessgeBar]);

	const datetime = event ? event.date : '';
	const [date] = datetime.split('T');

	// console.log('Date:', date); // Date: 2023-04-13
	// console.log('Time:', time.slice(0, -5)); // Time: 08:00:00
	const [quantity, setQuantity] = useState(0);

	const PRICE = event && event.price;
	const FEE = event && event.price * 0.06;
	const transactionFee = 1;

	const total = quantity + (PRICE + FEE) * quantity;
	return (
		// console.log(event)
		// {event ? <>{event.details}</>:<>Loading Event</>}
		event ? (
			<div className={styles.parent}>
				{/* {console.log(participantsInfo)} */}

				<div className={styles.container}>
					{showRegisterMessgeBar && (
						<MessageBar message={'Participants registered successfully'} />
					)}

					<p className={styles.title}>{event.title}</p>

					{/* The following section enables and controls the Social Media Buttons  */}
					<div className={styles.dtls}>
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
							href={`https://www.addtoany.com/add_to/facebook?linkurl=https://capstone-view.herokuapp.com/registerParticipant/${eventId}%2F&linkname=${event.title}`}
							className='fa fa-facebook'>
							{' '}
						</a>

						<a
							href={`https://www.addtoany.com/add_to/twitter?linkurl=https://capstone-view.herokuapp.com/registerParticipant/${eventId}%2F%0DDate:${event.date}%0DPrice:$${event.price}&linkname=${event.title}`}
							className='fa fa-twitter'>
							{' '}
						</a>

						<a
							href={`https://www.addtoany.com/add_to/whatsapp?linkurl=https://capstone-view.herokuapp.com/registerParticipant/${eventId}%2F%0DDate:${event.date}%0DPrice:$${event.price}&linkname=${event.title}`}
							className='fa fa-whatsapp'>
							{' '}
						</a>

						<a
							href={`https://www.addtoany.com/add_to/facebook_messenger?linkurl=https://capstone-view.herokuapp.com/registerParticipant/${eventId}%2F&linkname=${event.title}`}
							className='fa fa-facebook-square'>
							{' '}
						</a>

						<a
							href={`https://www.addtoany.com/add_to/google_gmail?linkurl=https://capstone-view.herokuapp.com/registerParticipant/${eventId}%2F%0DDate:${event.date}%0DPrice:$${event.price}&linkname=${event.title}`}
							className='fa fa-google'>
							{' '}
						</a>
					</div>

					<p
						style={{
							alignSelf: 'flex-start',
							fontWeight: 'bold',
							fontSize: '2rem',
						}}>
						Details
					</p>

					<div className={styles.details}>
						<p style={{ display: 'flex' }}>
							<p
								style={{
									fontWeight: 'bold',
									marginRight: '1rem',
									fontSize: '1.15rem',
								}}>
								Price:{' '}
							</p>{' '}
							<p
								style={{
									fontSize: '1.15rem',
								}}>
								${event.price}
							</p>
						</p>
					</div>
					<div className={styles.details}>
						<p style={{ display: 'flex' }}>
							<p
								style={{
									fontWeight: 'bold',
									marginRight: '1rem',
									fontSize: '1.15rem',
								}}>
								Date:
							</p>{' '}
							<p
								style={{
									fontSize: '1.15rem',
								}}>
								{new Date(date).toLocaleString('default', {
									month: 'long',
									day: '2-digit',
									year: 'numeric',
								})}
							</p>
						</p>
					</div>
					{/* <div className={styles.details}>
          <p style={{display:"flex"}}><p style={{fontWeight:"bold", marginRight:"1rem"}}>Time:</p> {time.slice(0, -5)}</p> 
          
        </div> */}
					<div
						style={{ marginBottom: '1rem' }}
						className={styles.details}>
						{/* <Button
							className={styles.rgtsBtn}
							onClick={() => {
								navigate(`registerForm`);
							}}>
							Register
						</Button> */}
					</div>
					<div
						style={{
							fontFamily: 'Arial, sans-serif',
							width: '100%',
							margin: '50px auto',
							fontSize: '1.15rem',
						}}>
						<h2>Entradas</h2>
						<span>
							Precio: ${PRICE.toFixed(2)} + ${FEE.toFixed(2)} Service Fee + $
							{transactionFee} Transaction Fee
						</span>
						<br />
						<label>
							<p>Cantidad:</p>
							<div className={styles['select-container']}>
								<select
									value={quantity}
									onChange={(e) => setQuantity(Number(e.target.value))}>
									{Array.from({ length: 51 }).map((_, index) => (
										<option
											key={index}
											value={index}>
											{index}
										</option>
									))}
									{/* <option value='0'>0</option>
								<option value='1'>1</option>
								<option value='2'>2</option>
								<option value='3'>3</option> */}
								</select>
							</div>
						</label>
						<br />
						<br />
						<label>Total: ${total.toFixed(2)}</label>
						<br />
						<br />
						<Button
							className={styles.rgtsBtn}
							onClick={() => {
								if (total > 0) {
									navigate(`registerForm/${quantity}`);
								}
							}}>
							Confirmar pedido
						</Button>
						{/* <button
							className={styles.rgtsBtn}
							onClick={() =>
								// total > 0
								// 	? alert(`Pedido confirmado! Total: $${total.toFixed(2)}`)
								// 	: alert('Por favor, seleccione una cantidad válida.')
								{
									if (total > 0) {
										navigate(`registerForm/${quantity}`);
									}
								}
							}>
							Confirmar pedido
						</button> */}
					</div>

					{/* <Image src={event.photo} width={800} height={800}/> */}
					<ResizableImage
						src={event.photo}
						aspectRatio={1 / 1}
					/>
					{/* <img  src={event.photo} alt="some"/> */}

					{isLoaded ? (
						<MyMapComponent
							position={position}
							location={event.location}
						/>
					) : (
						<></>
					)}
					{/* <Form.Input onChange={(e)=>{setOrderCreator(e.target.value)}} className={styles.emailCreator} fluid label='Order confirmation email' placeholder='Order confirmation email' /> */}
					{/* {renderParticipantsForm()} */}
					{/* <button onClick={(e)=>{handleSubmit(e)}}>submit</button>

        <button onClick={()=>{
                              setNumOfParticipants(numOfParticipants + 1); 
                              setParticipantsInfo([...participantsInfo, {name:"", email:"", phone:"", address:"",birthdate:new Date(), category:""}])
                            }}
                          >add participant</button>
        <button onClick={()=>{setNumOfParticipants(numOfParticipants - 1)}}>delete participant</button> */}
				</div>
				<Modal
					onClose={() => setOpen(false)}
					onOpen={() => setOpen(true)}
					open={open}
					// trigger={<Button>Show Modal</Button>}
				>
					<Modal.Header>Create Event</Modal.Header>
					<Modal.Content>
						{/* <Image size='medium' src='https://react.semantic-ui.com/images/avatar/large/rachel.png' wrapped /> */}
						<Modal.Description>
							{/* <Header>Default Profile Image</Header> */}
							{/* <p>
            We've found the following gravatar image associated with your e-mail
            address.
          </p>
          <p>Is it okay to use this photo?</p> */}
							{/* <div style={{display:"flex", flexDirection:"column"}}>
          <label style={{fontWeight:"bold"}}>Date</label>
          <DatePicker onChange={(e)=>onDateChange(e)} value={eventInfo.date}/>
          </div> */}
							{/* {renderParticipantsForm()} */}
						</Modal.Description>
					</Modal.Content>
					<Modal.Actions>
						<Button
							color='black'
							onClick={() => setOpen(false)}>
							Cancel
						</Button>
						<Button
							content='Create Event'
							labelPosition='right'
							icon='checkmark'
							onClick={() => {
								// createEventCall();
								// console.log(eventInfo);
								setOpen(false);
							}}
							positive
						/>
					</Modal.Actions>
				</Modal>
			</div>
		) : (
			<>Loading Event</>
		)
	);
}

export default Event;
