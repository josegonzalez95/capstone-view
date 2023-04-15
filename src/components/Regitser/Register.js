import { useEffect, useState } from "react";
import { useLoaderData, useParams } from "react-router-dom";
import { Label, Form } from "semantic-ui-react";
import { getEvent } from "../../api/Events/eventsRoutes";
import defaultEventImg from "../../assets/default-image.png"
import defaultLocation from "../../assets/default.png"
import styles from "./Register.module.css"
import {createParticipant} from "../../api/Participants/participantsRoute.js"
import { createTicket } from "../../api/Tickets/ticketsRoutes";
import { createOrder } from "../../api/Orders/ordersRoutes";


function Event() {
  const [orderCreator, setOrderCreator] = useState('')
  const [participantInfo, setParticipantInfo] = useState()
  const [participantsInfo, setParticipantsInfo] = useState([{name:"", email:"", phone:"", address:"",birthdate:"", category:""}])
  let participantsFormHTML = []
  const {eventId} = useParams()
  console.log(eventId)
  console.log(window.location.pathname)
  // console.log(useLoaderData())
//   console.log(id)
  const [event, setEvent] = useState()
  const [numOfParticipants, setNumOfParticipants] = useState(1)

  const handleState = (index, value, attribute) =>{
    // participantInfo[i] = {...participantInfo[i], :}
  }

  const renderParticipantsForm = ()=>{
    for(let i = 0; i<numOfParticipants; i++){
      participantsFormHTML.push(
        <Form >
            {/* <Form.Group widths='equal' className={styles.eventForm}>
                <Form.Input onChange={(e)=>{setParticipantInfo({...participantInfo, name:e.target.value})}} fluid label='Name' placeholder='Name' />
                <Form.Input onChange={(e)=>{setParticipantInfo({...participantInfo, email:e.target.value})}} fluid label='Email' placeholder='Email' />
                <Form.Input onChange={(e)=>{setEventInfo({...eventInfo, price:Number(e.target.value)})}} type='number' fluid label='Price' placeholder='Price' />
                <Form.Input onChange={(e)=>{setParticipantInfo({...participantInfo, phone:e.target.value})}} fluid label='Phone' placeholder='Phone' />
                <Form.Input onChange={(e)=>{setParticipantInfo({...participantInfo, gender:e.target.value})}} fluid label='Gender' placeholder='Gender' />
                <Form.Input onChange={(e)=>{setParticipantInfo({...participantInfo, birthdate:e.target.value})}} fluid label='Birthdate' placeholder='Birthdate' />
                <Form.Input onChange={(e)=>{setParticipantInfo({...participantInfo, address:e.target.value})}} fluid label='Address' placeholder='Address' />
                <Form.Input onChange={(e)=>{setParticipantInfo({...participantInfo, category:e.target.value})}} fluid label='Category' placeholder='Category' />
            </Form.Group> */}
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

                <Form.Input onChange={(e)=>{
                  participantsInfo[i] = {...participantsInfo[i], birthdate:e.target.value}
                  setParticipantsInfo(participantsInfo)
                }} fluid label='Birthdate' placeholder='Birthdate' />

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
          </Form>
      )
    }
    return <>{participantsFormHTML}</>
  }


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
    // create tickets
  }

  useEffect(()=>{
    const event =async()=>{
      const eventResponse = await getEvent({id: Number(eventId)})
      console.log(eventResponse)
      console.log(eventResponse)
      setEvent(eventResponse.event)
    }
    event().catch(console.error)
  },[])
  return (
    // console.log(event)
    
    // {event ? <>{event.details}</>:<>Loading Event</>}
    event ? (<div className={styles.parent}>
      {console.log(participantsInfo)}
      <div className={styles.container}>
        <p className={styles.title}>{event.title}</p> 
        <button>show or export participants</button>
        <img  src={event.photo}/>
        <p style={{alignSelf:"flex-start", fontWeight:"bold", fontSize:"2rem"}}>Details</p>
        <div className={styles.details}>
          <p>${event.price} | {" "}</p> 
          <p>{event.date}</p> 
        </div>
        <img  src={defaultLocation} alt="fireSpot"/> 
        <Form.Input onChange={(e)=>{setOrderCreator(e.target.value)}} className={styles.emailCreator} fluid label='Order confirmation email' placeholder='Order confirmation email' />
        {renderParticipantsForm()}
        <button onClick={(e)=>{handleSubmit(e)}}>submit</button>

        <button onClick={()=>{
                              setNumOfParticipants(numOfParticipants + 1); 
                              setParticipantsInfo([...participantsInfo, {name:"", email:"", phone:"", address:"",birthdate:"", category:""}])
                            }}
                          >add participant</button>
        <button onClick={()=>{setNumOfParticipants(numOfParticipants - 1)}}>delete participant</button>
        {/* {numOfParticipants==1 ? <Form >
            <Form.Group widths='equal' className={styles.eventForm}>
                <Form.Input onChange={(e)=>{setParticipantInfo({...participantInfo, name:e.target.value})}} fluid label='Name' placeholder='Name' />
                <Form.Input onChange={(e)=>{setParticipantInfo({...participantInfo, email:e.target.value})}} fluid label='Email' placeholder='Email' />
                <Form.Input onChange={(e)=>{setEventInfo({...eventInfo, price:Number(e.target.value)})}} type='number' fluid label='Price' placeholder='Price' />
                <Form.Input onChange={(e)=>{setParticipantInfo({...participantInfo, phone:e.target.value})}} fluid label='Phone' placeholder='Phone' />
                <Form.Input onChange={(e)=>{setParticipantInfo({...participantInfo, gender:e.target.value})}} fluid label='Gender' placeholder='Gender' />
                <Form.Input onChange={(e)=>{setParticipantInfo({...participantInfo, birthdate:e.target.value})}} fluid label='Birthdate' placeholder='Birthdate' />
                <Form.Input onChange={(e)=>{setParticipantInfo({...participantInfo, address:e.target.value})}} fluid label='Address' placeholder='Address' />
                <Form.Input onChange={(e)=>{setParticipantInfo({...participantInfo, category:e.target.value})}} fluid label='Category' placeholder='Category' />
            </Form.Group>
            <button onClick={(e)=>{handleSubmit(e)}}>submit</button>
          </Form>:null} */}
      </div>
      
    </div>):<>Loading Event</>
  );
}

export default Event;
