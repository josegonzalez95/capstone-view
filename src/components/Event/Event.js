import { useEffect, useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { getEvent } from "../../api/Events/eventsRoutes";
import styles from "./Event.module.css"
import { numberOfParticipants } from "../../api/Participants/participantsRoute";
import CsvDownloader from 'react-csv-downloader';
import { getAllParticipantsByEvent } from "../../api/Events/eventsRoutes";
import MyMapComponent from "../Map/MyMapComponent";
// import Image from "../Image/Image";
// const { GoogleMap, LoadScript, DirectionsService, DirectionsRenderer, useJsApiLoader } = require("@react-google-maps/api");
import { useJsApiLoader } from '@react-google-maps/api';
import { Button } from "semantic-ui-react";
import ResizableImage from "../ResizableImage/ResizableImage";
import PaginatedTable from "../PaginatedTable/PaginatedTable";
import MessageBar from "../MessageBar/MessageBar";
// import { useStripe } from "@stripe/react-stripe-js";




function Event() {
  const [numberParticipants, setnumberOfParticipants] = useState()
  const {id} = useParams()
  const navigate = useNavigate()
  const location = useLocation()
  console.log(window.location.pathname)
  // const stripe = useStripe()
  // console.log(useLoaderData())
  console.log(id)
  const [event, setEvent] = useState()
  const [showMessageBar, setShowMessageBar] = useState(false)

  const [participants, setParticipants] = useState([])
  const position = {lat:0, lng:0}

  useEffect(()=>{
    // geocoder = new google.maps.Geocoder();
    // geocoder = window.google ? window.google.maps.Geocoder():null
    let lat;
    let lng
    
    const successCallback = async(position) => {
      // console.log("position",position);
      lat = String(position.coords.latitude) 
      lng = String(position.coords.longitude)
    };
    
    const errorCallback = (error) => {
      console.log(error);
    };
  
    navigator.geolocation.getCurrentPosition(successCallback, errorCallback);

    if(location.state && location.state.isEventCreate){
      setShowMessageBar(true)
    }
    console.log('use effect', lat, lng)
  },[])

  useEffect(()=>{
    const getParts =async()=>{
      const participants = await asyncGetParticipants()
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
      setParticipants(participants)
    }
    getParts().catch(console.error);
  },[])

  useEffect(()=>{
    setTimeout(()=> {
      if(showMessageBar){
        navigate('', {replace: true})

        setShowMessageBar(false)
      }
    }, 5000);
  }, [showMessageBar])

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.REACT_APP_MAP_KEY
  })

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

  const asyncGetParticipants=async()=>{
    console.log(id)
    const participantsResponse = await getAllParticipantsByEvent({eventid: Number(id)})

    console.log(participantsResponse)
    const res = await fetch(`${process.env.REACT_APP_API_URL}/get-payment-intent`, {
      method: 'POST',
      body:JSON.stringify({
        paymentId:"pi_3Nyd3JDhrjzxPiXM48vQZ7B5"
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const {paymentIntent} = await res.json()
    console.log(paymentIntent.status)
    let participantsResult = []
    async function processList() {
      const results = await Promise.all(participantsResponse.participants.map(async (item) => {
        // console.log(item)

        const result = await fetch(`${process.env.REACT_APP_API_URL}/get-payment-intent`, {
          method: 'POST',
          body:JSON.stringify({
            paymentId:item.paymentdetails
          }),
          headers: {
            "Content-Type": "application/json",
          },
        });
        const response = await result.json()
        // return response.paymentIntent.status
        let status = response.paymentIntent.status
        // ==='succeeded' ? response.paymentIntent.status:"failed"
        return {...item, paymentdetails: status}
      }));
    
      console.log(results);
      participantsResult = results
    }
    
    // Call the async function to start processing the list
    await processList();


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
    return participantsResult
  }

  useEffect(()=>{
    const event =async()=>{
      const eventResponse = await getEvent({id: Number(id)})
      const numberOfParts = await numberOfParticipants({eventid: Number(id)})
      console.log(numberOfParts)
      console.log(eventResponse)
      console.log(eventResponse)
      setEvent(eventResponse.event)
      setnumberOfParticipants(numberOfParts.ticketNumber.count)
    }
    event().catch(console.error)
    // eslint-disable-next-line
  },[])
  const datetime = event ? event.date:"";
const [date] = datetime.split('T');
  return (
    // console.log(event)
    // {event ? <>{event.details}</>:<>Loading Event</>}
    event ? (<div className={styles.parent}>
                  {/* /event/:id/orders/ */}

      <div className={styles.container}>
      {showMessageBar && <MessageBar message={'Event created successfully'}/>}

        <p className={styles.title}>{event.title}</p>
        <div className={styles.dtls}>
        {/* <p className={styles.title}>{event.title}</p>  */}

        {/* The following section enables and controls the Social Media Buttons  */}
        <div className='container' id='contact'>
        <link
          rel='stylesheet'
          //Here's the host for the Font Awesome icons we're using
          href='https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css'
        />
        </div>
        {/* The buttons for Twitter, WhatsApp and Gmail also share the price and date of the event
            The Facebook buttons don't work the same way because of how they're formatted */}
        <a href={`https://www.addtoany.com/add_to/facebook?linkurl=https://capstone-view.herokuapp.com/registerParticipant/${id}%2F&linkname=${event.title}`} className='fa fa-facebook'> </a>
        
        <a href={`https://www.addtoany.com/add_to/twitter?linkurl=https://capstone-view.herokuapp.com/registerParticipant/${id}%2F%0DDate:${event.date}%0DPrice:$${event.price}&linkname=${event.title}`} className='fa fa-twitter'> </a>
        
        <a href={`https://www.addtoany.com/add_to/whatsapp?linkurl=https://capstone-view.herokuapp.com/registerParticipant/${id}%2F%0DDate:${event.date}%0DPrice:$${event.price}&linkname=${event.title}`} className='fa fa-whatsapp'> </a>
        
        <a href={`https://www.addtoany.com/add_to/facebook_messenger?linkurl=https://capstone-view.herokuapp.com/registerParticipant/${id}%2F&linkname=${event.title}`} className='fa fa-facebook-square'> </a>

        <a href={`https://www.addtoany.com/add_to/google_gmail?linkurl=https://capstone-view.herokuapp.com/registerParticipant/${id}%2F%0DDate:${event.date}%0DPrice:$${event.price}&linkname=${event.title}`} className='fa fa-google'> </a>

        <p style={{alignSelf:"flex-start", fontWeight:"bold", fontSize:"2rem"}}>Details</p>

        <div className={styles.details}>
          <p style={{display:"flex"}}><p style={{fontWeight:"bold", marginRight:"1rem"}}>Price:{" "}</p> ${event.price}</p> 
          
        </div>
        <div className={styles.details}>
          <p style={{display:"flex"}}><p style={{fontWeight:"bold", marginRight:"1rem"}}>Date:</p> {new Date(date).toLocaleString('default', { month: 'long', day:'2-digit' , year:'numeric'})}</p> 
          
        </div>
        {/* <div className={styles.details}>
          <p style={{display:"flex"}}><p style={{fontWeight:"bold", marginRight:"1rem"}}>Time:</p> {time.slice(0, -5)}</p> 
          
        </div> */}
        <div>
        <p style={{display:"flex"}}><p style={{fontWeight:"bold", marginRight:"1rem"}}>Participants:</p> {numberParticipants}</p> 

        </div>
        <div style={{display:"flex", flexDirection:"column", width:"fit-content"}}>

        
        <Button className={styles.export} style={{marginTop:"0.5rem"}}>
          <CsvDownloader className='export-container' datas={asyncGetParticipants} filename='participants-export.csv' >
              Export to CSV
          </CsvDownloader>
          </Button>
          <Button className={styles.export} onClick={()=>{navigate(`/event/${event.id}/orders`)}} type='submit'>Orders</Button>
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
        <ResizableImage src={event.photo} aspectRatio={1/1}/>

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
        {isLoaded ?<MyMapComponent position={position} location={event.location}/>:<></>} 
        <PaginatedTable participants={participants}/>
        
        {/* <img  src={defaultLocation} alt="fireSpot"/>  */}
      </div>
    </div>):<>Loading Event</>
  );
}

export default Event;
