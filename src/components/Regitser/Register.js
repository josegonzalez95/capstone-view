// this component show event information to participants and provides a form to registed as many participants the client wants


import DatePicker from 'react-date-picker';
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Form } from "semantic-ui-react";
import { getEvent } from "../../api/Events/eventsRoutes";
import styles from "./Register.module.css"
import {createParticipant} from "../../api/Participants/participantsRoute.js"
import { createTicket } from "../../api/Tickets/ticketsRoutes";
import { createOrder } from "../../api/Orders/ordersRoutes";
import MyMapComponent from "../Map/MyMapComponent";
import Image from "../Image/Image.js";

// const { useJsApiLoader } = require("@react-google-maps/api");
import { GoogleMap, useJsApiLoader, Marker, DirectionsRenderer, DirectionsService } from '@react-google-maps/api';


const initDate = `${new Date().getFullYear()}-${new Date().getMonth()+1}-${new Date().getDate()}`



function Event() {
  const [orderCreator, setOrderCreator] = useState('')
  const [participantsInfo, setParticipantsInfo] = useState([{name:"", email:"", phone:"",gender:"", address:"",birthdate:new Date(), category:""}])
  const [position, setPosition] = useState({lat:0, lng:0})
  const [changeState, setChangeState] = useState(false)


 
  const {eventId} = useParams()
  console.log(eventId)
  console.log(window.location.pathname)
  const [event, setEvent] = useState()
  const [numOfParticipants, setNumOfParticipants] = useState(1)

    const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.REACT_APP_MAP_KEY
  })

  const onDateChange=(e, i)=>{
    console.log(new Date(e))
    
    participantsInfo[i] = {...participantsInfo[i], birthdate: e}
                  console.log(participantsInfo)
    setParticipantsInfo(participantsInfo)
    setChangeState(!changeState)
  }

  //  his will show as many forms as the numbers of participants in order to register such participants
  const renderParticipantsForm = ()=>{
    let participantsFormHTML = []
    for(let i = 0; i<numOfParticipants; i++){
      participantsFormHTML.push(
        <div >
            <Form.Group widths='equal' className={styles.eventForm}>
                <Form.Input onChange={(e)=>{
                  participantsInfo[i] = {...participantsInfo[i], name:e.target.value}
                  // console.log(participantsInfo)
                  setParticipantsInfo(participantsInfo)
                }} fluid label='Name' placeholder='Name' />

                <Form.Input onChange={(e)=>{
                  participantsInfo[i] = {...participantsInfo[i], email:e.target.value}
                  setParticipantsInfo(participantsInfo)
                }} fluid label='Email' placeholder='Email' />

                <Form.Input onChange={(e)=>{
                  participantsInfo[i] = {...participantsInfo[i], phone:e.target.value}
                  setParticipantsInfo(participantsInfo)
                }} fluid label='Phone' placeholder='Phone' />

                <Form.Input onChange={(e)=>{
                  participantsInfo[i] = {...participantsInfo[i], gender:e.target.value}
                  setParticipantsInfo(participantsInfo)
                }} fluid label='Gender' placeholder='Gender' />

          <div style={{display:"flex", flexDirection:"column"}}>
          <label style={{fontWeight:"bold"}}>Birthdate</label>
          {console.log(participantsInfo[i].birthdate)}
          <DatePicker onChange={(e)=>onDateChange(e, i)} value={participantsInfo[i].birthdate}/>
          </div>
                {/* 
                <Form.Input onChange={(e)=>{
                  participantsInfo[i] = {...participantsInfo[i], birthdate:e.target.value}
                  setParticipantsInfo(participantsInfo)
                }} fluid label='Birthdate' placeholder='Birthdate' /> */}

                <Form.Input onChange={(e)=>{
                  participantsInfo[i] = {...participantsInfo[i], address:e.target.value}
                  setParticipantsInfo(participantsInfo)
                }} fluid label='Address' placeholder='Address' />

                <Form.Input onChange={(e)=>{
                  participantsInfo[i] = {...participantsInfo[i], category:e.target.value}
                  setParticipantsInfo(participantsInfo)
                }} fluid label='Category' placeholder='Category' />
            </Form.Group>
            {/* <button onClick={(e)=>{handleSubmit(e)}}>submit</button> */}
            <br/>
          </div>
      )
    }
    return <>{participantsFormHTML}</>
  }


  //   participants creation, first it creates participants and collect their ids
  //   then it create the order and collect its id
  //   finally it create the tickets for the participants and the order
  const handleSubmit =async(e)=>{
    let listOfParticipantId = []
    e.preventDefault()

    console.log(participantsInfo)
    console.log(orderCreator)

    participantsInfo.forEach(async participant => {
      const participantResponse = await createParticipant(participant)
      console.log((participantResponse))
      listOfParticipantId = listOfParticipantId.concat(participantResponse.newParticipant.participant.id)
    });
    // create order
    const orderResponse = await createOrder({orderemail: orderCreator, paymentdetails:""})
    console.log(listOfParticipantId)

    const orderId = orderResponse.newOrder.order.id
    listOfParticipantId.forEach(async id=>{
      await createTicket({participantid: id, orderid: orderId, eventid: Number(eventId)})
    })
    setNumOfParticipants(1)
    setParticipantsInfo([{name:"", email:"", phone:"", address:"",birthdate:new Date(), category:""}])
    window.location.reload()
    // create tickets
  }

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
  return (
    // console.log(event)
    
    // {event ? <>{event.details}</>:<>Loading Event</>}
    event ? (<div className={styles.parent}>
      {console.log(participantsInfo)}
      <div className={styles.container}>
        <p className={styles.title}>{event.title}</p> 
        <p style={{alignSelf:"flex-start", fontWeight:"bold", fontSize:"2rem"}}>Details</p>
        <div className={styles.details}>
          <p>${event.price} | {" "}</p> 
          <p>{event.date}</p> 
        </div>
        <Image src={event.photo} width={800} height={800}/>
        {/* <img  src={event.photo} alt="some"/> */}
        
        {isLoaded ?<MyMapComponent position={position} location={event.location}/>:<></>}
        <Form.Input onChange={(e)=>{setOrderCreator(e.target.value)}} className={styles.emailCreator} fluid label='Order confirmation email' placeholder='Order confirmation email' />
        {renderParticipantsForm()}
        <button onClick={(e)=>{handleSubmit(e)}}>submit</button>

        <button onClick={()=>{
                              setNumOfParticipants(numOfParticipants + 1); 
                              setParticipantsInfo([...participantsInfo, {name:"", email:"", phone:"", address:"",birthdate:new Date(), category:""}])
                            }}
                          >add participant</button>
        <button onClick={()=>{setNumOfParticipants(numOfParticipants - 1)}}>delete participant</button>
      </div>
      
    </div>):<>Loading Event</>
  );
}

export default Event;
