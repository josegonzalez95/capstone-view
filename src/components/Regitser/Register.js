// this component show event information to participants and provides a form to registed as many participants the client wants


// import DatePicker from 'react-date-picker';
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Modal, Button } from "semantic-ui-react";
import { getEvent } from "../../api/Events/eventsRoutes";
import styles from "./Register.module.css"
// import {createParticipant} from "../../api/Participants/participantsRoute.js"
// import { createTicket } from "../../api/Tickets/ticketsRoutes";
// import { createOrder } from "../../api/Orders/ordersRoutes";
import MyMapComponent from "../Map/MyMapComponent";
// import Image from "../Image/Image.js";

// const { useJsApiLoader } = require("@react-google-maps/api");
import { useJsApiLoader } from '@react-google-maps/api';
import ResizableImage from "../ResizableImage/ResizableImage";


// const initDate = `${new Date().getFullYear()}-${new Date().getMonth()+1}-${new Date().getDate()}`



function Event() {
  // const [orderCreator, setOrderCreator] = useState('')
  // const [participantsInfo, setParticipantsInfo] = useState([{name:"", email:"", phone:"",gender:"", address:"",birthdate:new Date(), category:""}])
  // const [position, setPosition] = useState({lat:0, lng:0})
  const position = {lat:0, lng:0}
  // const [changeState, setChangeState] = useState(false)
  const [open, setOpen] = useState(false)
  const navigate = useNavigate()

  console.log(window.location)



 
  const {eventId} = useParams()
  console.log(eventId)
  console.log(window.location.pathname)
  const [event, setEvent] = useState()
  // const [numOfParticipants, setNumOfParticipants] = useState(1)

    const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.REACT_APP_MAP_KEY
  })

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
  useEffect(()=>{
    const event =async()=>{
      const eventResponse = await getEvent({id: Number(eventId)})
      console.log(eventResponse)
      console.log(eventResponse)
      setEvent(eventResponse.event)
    }
    event().catch(console.error)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

    const datetime = event ? event.date:"";
const [date] = datetime.split('T');

// console.log('Date:', date); // Date: 2023-04-13
// console.log('Time:', time.slice(0, -5)); // Time: 08:00:00
  return (
    // console.log(event)



    
    // {event ? <>{event.details}</>:<>Loading Event</>}
    event ? (<div className={styles.parent}>
      {/* {console.log(participantsInfo)} */}
      <div className={styles.container}>
        <p className={styles.title}>{event.title}</p>
        	
        {/* The following section enables and controls the Social Media Buttons  */}
        <div className={styles.dtls}>
        <div className='container' id='contact'>
        <link
          rel='stylesheet'
          //Here's the host for the Font Awesome icons we're using
          href='https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css'
        />
        </div>
        {/* The buttons for Twitter, WhatsApp and Gmail also share the price and date of the event
            The Facebook buttons don't work the same way because of how they're formatted */}
        <a href={`https://www.addtoany.com/add_to/facebook?linkurl=https://capstone-view.herokuapp.com/registerParticipant/${eventId}%2F&linkname=${event.title}`} className='fa fa-facebook'>acebook </a>
        
        <a href={`https://www.addtoany.com/add_to/twitter?linkurl=https://capstone-view.herokuapp.com/registerParticipant/${eventId}%2F%0DDate:${event.date}%0DPrice:$${event.price}&linkname=${event.title}`} className='fa fa-twitter'>Twitter </a>
        
        <a href={`https://www.addtoany.com/add_to/whatsapp?linkurl=https://capstone-view.herokuapp.com/registerParticipant/${eventId}%2F%0DDate:${event.date}%0DPrice:$${event.price}&linkname=${event.title}`} className='fa fa-whatsapp'>WhatsApp </a>
        
        <a href={`https://www.addtoany.com/add_to/facebook_messenger?linkurl=https://capstone-view.herokuapp.com/registerParticipant/${eventId}%2F&linkname=${event.title}`} className='fa fa-facebook-square'>Messegener </a>

        <a href={`https://www.addtoany.com/add_to/google_gmail?linkurl=https://capstone-view.herokuapp.com/registerParticipant/${eventId}%2F%0DDate:${event.date}%0DPrice:$${event.price}&linkname=${event.title}`} className='fa fa-google'>mail </a>
        </div>

        <p style={{alignSelf:"flex-start", fontWeight:"bold", fontSize:"2rem"}}>Details</p>

        
        
        <div className={styles.details}>
          <p style={{display:"flex"}}><p style={{fontWeight:"bold", marginRight:"1rem"}}>Price:{" "}</p> ${event.price}</p> 
          
        </div>
        <div className={styles.details}>
          <p style={{display:"flex"}}><p style={{fontWeight:"bold", marginRight:"1rem"}}>Date:</p> {date} (YYYY-MM-DD)</p> 
          
        </div>
        {/* <div className={styles.details}>
          <p style={{display:"flex"}}><p style={{fontWeight:"bold", marginRight:"1rem"}}>Time:</p> {time.slice(0, -5)}</p> 
          
        </div> */}
        <div style={{marginBottom: "1rem", marginTop:"1rem"}} className={styles.details}>
        <Button className={styles.rgtsBtn} onClick={()=>{navigate(`registerForm`)}}>Register</Button>
        </div>
        

        {/* <Image src={event.photo} width={800} height={800}/> */}
        <ResizableImage src={event.photo} aspectRatio={1/1}/>
        {/* <img  src={event.photo} alt="some"/> */}
        
        {isLoaded ?<MyMapComponent position={position} location={event.location}/>:<></>}
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
      <Modal.Content >
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
        <Button color='black' onClick={() => setOpen(false)}>
          Cancel
        </Button>
        <Button
          content="Create Event"
          labelPosition='right'
          icon='checkmark'
          onClick={() => {
              // createEventCall();
              // console.log(eventInfo);
              setOpen(false)
            }
          }
          positive
        />
      </Modal.Actions>
    </Modal>
      
    </div>):<>Loading Event</>
  );
}

export default Event;
