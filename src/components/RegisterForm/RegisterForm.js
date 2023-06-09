// this component show event information to participants and provides a form to registed as many participants the client wants


import DatePicker from 'react-date-picker';
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Form, Modal, Button } from "semantic-ui-react";
import { getEvent } from "../../api/Events/eventsRoutes";
import styles from "./RegisterForm.module.css"
import {createParticipant} from "../../api/Participants/participantsRoute.js"
import { createTicket } from "../../api/Tickets/ticketsRoutes";
import { createOrder } from "../../api/Orders/ordersRoutes";
import { Dropdown } from 'semantic-ui-react'
// import emailjs from "emailjs"
import { sendEmail } from '../../api/Email/sendEmail';

import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

// const { useJsApiLoader } = require("@react-google-maps/api");
// import { useJsApiLoader } from '@react-google-maps/api';


// const initDate = `${new Date().getFullYear()}-${new Date().getMonth()+1}-${new Date().getDate()}`

function RegisterForm() {

  const [orderCreator, setOrderCreator] = useState('')
  const [participantsInfo, setParticipantsInfo] = useState([{name:"", email:"", phone:"",gender:"", address:"",birthdate:new Date(), category:""}])
  // const [position, setPosition] = useState({lat:0, lng:0})
  // const position = {lat:0, lng:0}
  const [changeState, setChangeState] = useState(false)
  const [open, setOpen] = useState(false)


 
  const {eventId} = useParams()
  console.log(eventId)
  console.log(window.location.pathname)
  const [event, setEvent] = useState()
  const [numOfParticipants, setNumOfParticipants] = useState(1)

  const [disabled, setDisabled] = useState(true) //this controls the clickability of the order confirmation button
  const [paymentMethod, setPaymentMehtod] = useState("") //this controls what payment method the order receives

  const onDateChange=(e, i)=>{
    console.log(new Date(e))
    
    participantsInfo[i] = {...participantsInfo[i], birthdate: e}
                  console.log(participantsInfo)
    setParticipantsInfo(participantsInfo)
    setChangeState(!changeState)
  }

  // const genderOptions =  [{key:'m', value:'M', text:'M'}, {key:'f', value:'F', text:'F'}]

  const categoryOptions = [
    { key: 'infantiles-13-14', value: 'Infantiles 13-14', text: 'Infantiles 13-14' },
    { key: 'cadete-15-16', value: 'Cadete 15-16', text: 'Cadete 15-16' },
    { key: 'junior-17-18', value: 'Junior 17-18', text: 'Junior 17-18' },
    { key: 'elite-open-19+', value: 'Elite open 19+', text: 'Elite open 19+' },
    { key: 'master-30-39', value: 'Master 30-39', text: 'Master 30-39' },
    { key: 'master-40-49', value: 'Master 40-49', text: 'Master 40-49' },
    { key: 'master-50-59', value: 'Master 50-59', text: 'Master 50-59' },
    { key: 'master-60+', value: 'Master 60+', text: 'Master 60+' },
    { key: 'aficionados-open', value: 'Aficionados Open', text: 'Aficionados Open' },
    { key: 'categoria-pueblo', value: 'Categoría Pueblo (No Federado)', text: 'Categoría Pueblo (No Federado)' },
    { key: 'infantiles-13-14', value: 'Feminas Infantiles 13-14', text: 'Feminas Infantiles 13-14' },
    { key: 'cadete-15-16', value: 'Feminas Cadete 15-16', text: 'Feminas Cadete 15-16' },
    { key: 'junior-17-18', value: 'Feminas Junior 17-18', text: 'Feminas Junior 17-18' },
    { key: 'elite-open', value: 'Feminas Elites open', text: 'Feminas Elites open' },
    { key: 'master-30-39', value: 'Feminas Master 30-39', text: 'Feminas Master 30-39' },
    { key: 'master-40-49', value: 'Feminas Master 40-49', text: 'Feminas Master 40-49' },
    { key: 'master-50+', value: 'Feminas Master 50+', text: 'Feminas Master 50+' },
    { key: 'aficionada-open', value: 'Feminas Aficionada Open', text: 'Feminas Aficionada Open' },
    { key: 'categoria-pueblo', value: 'Feminas Categoría Pueblo (No Federada)', text: 'Feminas Categoría Pueblo (No Federada)' }
  ];
  

  //  this will show as many forms as the numbers of participants in order to register such participants
  const renderParticipantsForm = ()=>{
    let participantsFormHTML = []
    for(let i = 0; i<numOfParticipants; i++){
      participantsFormHTML.push(
        <div className={styles.form}>
          <h3>Participant {i + 1}</h3>
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

                {/* <Form.Input onChange={(e)=>{
                  participantsInfo[i] = {...participantsInfo[i], gender:e.target.value}
                  setParticipantsInfo(participantsInfo)
                }} fluid label='Gender' placeholder='Gender' /> */}
                {/* <label style={{fontWeight:"bold"}}>Gender</label>
                <Dropdown
                  placeholder='Gender'
                  fluid
                  search
                  selection
                  options={genderOptions}
                  onChange={(e)=>{
                    participantsInfo[i] = {...participantsInfo[i], gender:e.target.textContent}
                    setParticipantsInfo(participantsInfo)
                  }}
                /> */}

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

                {/* <Form.Input onChange={(e)=>{
                  participantsInfo[i] = {...participantsInfo[i], category:e.target.value}
                  setParticipantsInfo(participantsInfo)
                }} fluid label='Category' placeholder='Category' /> */}
                <label style={{fontWeight:"bold"}}>Category</label>
                <Dropdown
                  placeholder='Category'
                  fluid
                  search
                  selection
                  options={categoryOptions}
                  value={participantsInfo[i].category}
                  onChange={(e)=>{
                    participantsInfo[i] = {...participantsInfo[i], category:e.target.textContent}
                    setParticipantsInfo(participantsInfo)
                  }}
                />
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
    let participantInfoEmail = ""
    let emailData = {
      "service_id": process.env.REACT_APP_service_id,
      "user_id": process.env.REACT_APP_user_id,
      "template_id": process.env.REACT_APP_template_id,
      "template_params":{
          "destination":`"${orderCreator}"`,
          "name":`"${orderCreator}"`,
          "subject": "Order confirmation email",
          "from_name":"PUR Cycling registration platform",
      }}
    // setOpen(true)
    let listOfParticipantId = []
    e.preventDefault()

    console.log(participantsInfo)
    console.log(orderCreator)

    participantsInfo.forEach(async (participant, i) => {
      if(participant.name && participant.email && participant.address && participant.birthdate && participant.category && participant.phone && participant.gender){
        if(participant.name.length <= 50 && participant.email.length<=255 && participant.address.length<=200 && participant.category.length<=255 && participant.phone.length<=10 && participant.gender.length===1){
          participantInfoEmail+= `- Participant ${i+1}\n 
                                  name: ${participant.name}\n  
                                  email: ${participant.email}\n 
                                  phone: ${participant.phone}\n
                                  birthdate: ${participant.birthdate.toLocaleDateString()}\n
                                  category: ${participant.category}\n\n`
          const participantResponse = await createParticipant(participant)
          listOfParticipantId = listOfParticipantId.concat(participantResponse.newParticipant.participant.id)
        }
      }
    });
    console.log(participantInfoEmail)
    emailData["template_params"]["participants"] = participantInfoEmail
    // create order
    const orderResponse = await createOrder({orderemail: orderCreator, paymentdetails:paymentMethod})
    // console.log(listOfParticipantId)

    const orderId = orderResponse.newOrder.order.id
    listOfParticipantId.forEach(async id=>{
      await createTicket({participantid: id, orderid: orderId, eventid: Number(eventId)})
    })
    console.log(emailData)
    await sendEmail(emailData)

    setPaymentMehtod("") //resets the payment method back to blank
    setDisabled(true) //disables the order confirmation button after a successful confirmation

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
  const datetime = event ? event.date:"";
  const [date] = datetime.split('T');
  return (
    
    
    // console.log(event)
    
    // {event ? <>{event.details}</>:<>Loading Event</>}
    event ? (<div className={styles.parent}>
      {console.log(participantsInfo)}
      
      <div className={styles.container}>
      <p style={{alignSelf:"flex-start", fontWeight:"bold", fontSize:"2rem"}}>Register Participants</p>

        <p style={{alignSelf:"flex-start", fontWeight:"bold", fontSize:"2rem"}}>{event.title}</p>
        
        <div className={styles.details}>
          <p style={{display:"flex"}}><p style={{fontWeight:"bold", marginRight:"1rem"}}>Price:{" "}</p> ${event.price}</p> 
          
        </div>
        <div className={styles.details}>
          <p style={{display:"flex"}}><p style={{fontWeight:"bold", marginRight:"1rem"}}>Date:</p> {date} (YYYY-MM-DD)</p> 
          
        </div>
        {/* <div className={styles.details}>
          <p style={{display:"flex"}}><p style={{fontWeight:"bold", marginRight:"1rem"}}>Time:</p> {time.slice(0, -5)}</p> 
          
        </div> */}
        {/* <p className={styles.title}>{event.title}</p>  */}
        <div className={styles.btnContainer}>
        <Button className={styles.btns} onClick={()=>{
                              setNumOfParticipants(numOfParticipants + 1); 
                              setParticipantsInfo([...participantsInfo, {name:"", email:"", phone:"", address:"",birthdate:new Date(), category:""}])
                            }}
                          >Add Participant</Button>
        <Button className={styles.btns} onClick={()=>{
          if(numOfParticipants>1){
            setNumOfParticipants(numOfParticipants - 1)}
          }
          }>Delete Participant</Button>
          </div>
        {/* <div className={styles.details}> */}
          {/* <p>${event.price} | {" "}</p> 
          <p>{event.date}</p>  */}
        {/* </div> */}
        {/* <Image src={event.photo} width={800} height={800}/> */}
        {/* <img  src={event.photo} alt="some"/> */}
        
        {/* {isLoaded ?<MyMapComponent position={position} location={event.location}/>:<></>} */}
        {/* <Form.Input onChange={(e)=>{setOrderCreator(e.target.value)}} className={styles.emailCreator} fluid label='Order confirmation email' placeholder='Order confirmation email' /> */}
        {renderParticipantsForm()}
        <div className={styles.btnContainer}>
        <Button className={styles.btns} onClick={(e)=>{setOpen(true)}}>Submit</Button>
        </div>

        {/* <button onClick={()=>{
                              setNumOfParticipants(numOfParticipants + 1); 
                              setParticipantsInfo([...participantsInfo, {name:"", email:"", phone:"", address:"",birthdate:new Date(), category:""}])
                            }}
                          >add participant</button>
        <button onClick={()=>{
          if(numOfParticipants>1){
            setNumOfParticipants(numOfParticipants - 1)}
          }
          }>delete participant</button> */}
      </div>
      <Modal
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      // trigger={<Button>Show Modal</Button>}
    >
      <Modal.Header>Confirm Order</Modal.Header>
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
        <Form.Input onChange={(e)=>{setOrderCreator(e.target.value)}} className={styles.emailCreator} fluid label='Order confirmation email' placeholder='Order confirmation email' />

      </Modal.Content>
      <Modal.Actions>

        {/* PAYPAL START! */}
        <PayPalScriptProvider options={{ "client-id": "test", "disable-funding":"venmo"}}> {/* Has to changed to a PayPal Business ID for deployment */}
            <PayPalButtons
                createOrder={(data, actions) => {
                    return actions.order.create({
                        purchase_units: [
                            {
                                amount: {
                                    value: event.price*numOfParticipants, //controls the price charged on PayPal
                                },
                            },
                        ],
                    });
                }}
                onApprove={(data, actions) => {
                  setDisabled(false); //makes the order confirmation button clickable
                        return actions.order.capture().then((details) => {
                        const name = details.payer.name.given_name;
                        alert(`Transaction completed by ${name}, please confirm your order`);
                        setPaymentMehtod("PayPal"); //Sets the Payment Method type for the order
                    });
                }}
            />
          </PayPalScriptProvider>
          {/* PAYPAL END! */}
          
        <Button color='black' onClick={() => setOpen(false)}>
        Cancel
        </Button>
        <Button 
          disabled = {disabled}
          content="Confirm Order"
          labelPosition='right'
          icon='checkmark'
          onClick={(e) => {
            if(orderCreator){
              handleSubmit(e)
              setOpen(false)
            }
              // createEventCall();
              // console.log(eventInfo);
            }
          }
          positive
        />
      </Modal.Actions>
    </Modal>
    </div>):<>Loading Event</>
  );
}

export default RegisterForm;