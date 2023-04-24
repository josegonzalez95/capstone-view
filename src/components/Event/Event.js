import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getEvent } from "../../api/Events/eventsRoutes";
import styles from "./Event.module.css"
import { numberOfParticipants } from "../../api/Participants/participantsRoute";
import CsvDownloader from 'react-csv-downloader';
import { getAllParticipantsByEvent } from "../../api/Events/eventsRoutes";
import MyMapComponent from "../Map/MyMapComponent";
import Image from "../Image/Image";
// const { GoogleMap, LoadScript, DirectionsService, DirectionsRenderer, useJsApiLoader } = require("@react-google-maps/api");
import { useJsApiLoader } from '@react-google-maps/api';
import { Button } from "semantic-ui-react";




function Event() {
  const [numberParticipants, setnumberOfParticipants] = useState()
  const {id} = useParams()
  console.log(window.location.pathname)
  // console.log(useLoaderData())
  console.log(id)
  const [event, setEvent] = useState()
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
    console.log('use effect', lat, lng)

  })

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

    const participantsResponse = await getAllParticipantsByEvent({eventid: Number(id)})

    console.log(participantsResponse.participants)


    // participants.forEach(client => {
    //   if (client.active) {
    //     let newClient = {
    //       'Name': client.name,
    //       'Phone': client.phone,
    //     }
    //     allClientsData.push(newClient);
    //   }
    // })
    return Promise.resolve(participantsResponse.participants);
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
const [date, time] = datetime.split('T');
  return (
    // console.log(event)
    // {event ? <>{event.details}</>:<>Loading Event</>}
    event ? (<div className={styles.parent}>
      <div className={styles.container}>
        <p className={styles.title}>{event.title}</p> 
        <div className={styles.dtls}>
        {/* <p className={styles.title}>{event.title}</p>  */}
        <p style={{alignSelf:"flex-start", fontWeight:"bold", fontSize:"2rem"}}>Details</p>
        
        <div className={styles.details}>
          <p style={{display:"flex"}}><p style={{fontWeight:"bold", marginRight:"1rem"}}>Price:{" "}</p> ${event.price}</p> 
          
        </div>
        <div className={styles.details}>
          <p style={{display:"flex"}}><p style={{fontWeight:"bold", marginRight:"1rem"}}>Date:</p> {date}</p> 
          
        </div>
        <div className={styles.details}>
          <p style={{display:"flex"}}><p style={{fontWeight:"bold", marginRight:"1rem"}}>Time:</p> {time.slice(0, -5)}</p> 
          
        </div>
        <div>
        <p style={{display:"flex"}}><p style={{fontWeight:"bold", marginRight:"1rem"}}>Participants:</p> {numberParticipants}</p> 

        </div>
        <Button className={styles.export}>
          <CsvDownloader className='export-container' datas={asyncGetParticipants} filename='participants-export.csv' >
              <i className="fa fa-download"></i> Export to CSV
          </CsvDownloader>
          </Button>
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
        <Image src={event.photo} width={800} height={800}/>

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
        
        {/* <img  src={defaultLocation} alt="fireSpot"/>  */}
      </div>
    </div>):<>Loading Event</>
  );
}

export default Event;
