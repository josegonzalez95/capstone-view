  // google maps component showing a pin location for each event

import React, { useEffect, useState } from 'react'
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';

// const containerStyle = {
//   width: '800px',
//   height: '800px'
// };



// const containerStyle = {
//   width: window.innerWidth > 800 ? '800px':'400px',
//   height: window.innerWidth > 800 ? '800px':'400px',
// };


// const handleResize = ()=>{
//   if(window.innerWidth > 800){
//     setSize({width: '800px', height:'800px'})
//   }else{
//     setSize({width: '400px', height:'400px'})
//   }
// }

// window.addEventListener('resize', handleResize)

// console.log(window.innerWidth)


function MyComponent(props) {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.REACT_APP_MAP_KEY
  })

  const [size, setSize] = useState({width: '800px', height:'800px'})


  const containerStyle = {
    width: size.width,
    height: size.height
  };



  useEffect(()=>{
    if(window.innerWidth > 800){
      setSize({width: '800px', height:'800px'})
    }else if(window.innerWidth > 400 && window.innerWidth <800){
      setSize({width: '400px', height:'400px'})
    }else if(window.innerWidth <400){
      setSize({width: '370px', height:'370px'})
    }
    const handleResize = ()=>{
      if(window.innerWidth > 800){
        setSize({width: '800px', height:'800px'})
      }else if(window.innerWidth > 400 && window.innerWidth <800){
        setSize({width: '400px', height:'400px'})
      }else if(window.innerWidth <400){
        setSize({width: '370px', height:'370px'})
      }
    }
    
    window.addEventListener('resize', handleResize)
  },[])

  // position state use to display the pin on the map
  // const [position, setPosition] = useState({coords:{lat:0, lng:0}})



  


    // use effect hook used to load position data as latitude and longitude of the event using google maps api
//   useEffect(()=>{
//     console.log(props)
//     // const lat = localStorage.getItem('lat')
//     // const lng = localStorage.getItem('lng')
//     // console.log('posssss',Number(lng), Number(lat))
//     const getPosition=async()=>{
//       console.log(props.location)
//       const cityName = props.location; // Replace with the name of the city you want to geocode
//       const apiKey = process.env.REACT_APP_MAP_KEY; // Replace with your Google Maps API key
//       // console.log(cityName, apiKey)
//       // const apiURL = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
//       // cityName + ", Puerto Rico"
//     // )}&key=${apiKey}`
//       // Make a request to the Google Maps Geocoding API
//       // fetch(apiURL)

//       // fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${cityName}, Puerto Rico&key=${apiKey}`)
//       //   .then(response => {response.json();console.log(response)})
//       //   .then(data => {
//       //     console.log(data)
//       //     // Get the latitude and longitude from the response
//       //     const lat = data.results[0].geometry.location.lat;
//       //     const lng = data.results[0].geometry.location.lng;
//       //     setPosition({coords:{lat:lat, lng:lng}})
          
//       //     console.log(`Latitude: ${lat}, Longitude: ${lng}`);
//       //   })
//       //   .catch(error => console.log(error));


//       // const geoCodeResponse = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${cityName}, Puerto Rico&key=${apiKey}`).then(response => response.json())
//       // console.log(geoCodeResponse)
//       // const { lat, lng } = geoCodeResponse.results[0].geometry.location
//       // setPosition({coords:{lat:lat, lng:lng}})
//     }
  
//     getPosition()
//   //   const successCallback = (position) => {
//   //     console.log(position.coords);
//   //     setPosition(position)
//   //   };
    
//   //   const errorCallback = (error) => {
//   //     console.log(error);
//   //   };

//   // navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
// // eslint-disable-next-line
//   },[])

  // const [response, setResponse] = useState()
  // const [destination, setDestination] = useState('San Juan')

  // const center = {lat: Number(localStorage.getItem('lat')), lng: Number(localStorage.getItem('lng'))};
  // const center = {lat: Number(position.coords.lat), lng: Number(position.coords.lng)}
  // const directionsCallback =(response) =>{
  //   console.log("directionsCallback", response)

  //   if (response) {
  //     if (response.status === 'OK') {
  //       setResponse(
  //           response
  //       )
  //     } else {
  //       console.log('response: ', response)
  //     }
  //   }
  // }
  

  // const [map, setMap] = React.useState(null)

  // const onLoad = React.useCallback(function callback(map) {
  //   const bounds = new window.google.maps.LatLngBounds(center);
  //   map.fitBounds(bounds);

  //   setMap(map)
  // }, [])

  // const onUnmount = React.useCallback(function callback(map) {
  //   setMap(null)
  // }, [])

  return isLoaded ? (
    <div style={{marginBottom:"2rem"}}>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={JSON.parse(props.location)}
        zoom={10}
        // onLoad={onLoad}
        // onUnmount={onUnmount}
      >
        
                {/* <DirectionsService
                  // required
                  options={{ 
                    destination: "san juan",
                    origin: "rincon",
                    travelMode:"DRIVING"
                  }}
                  // required
                  callback={directionsCallback()}
                  // optional
                  onLoad={directionsService => {
                    console.log('DirectionsService onLoad directionsService: ', directionsService)
                  }}
                  // optional
                  onUnmount={directionsService => {
                    console.log('DirectionsService onUnmount directionsService: ', directionsService)
                  }}
                />
               { response !== null && (
                <DirectionsRenderer
                  // required
                  options={{ 
                    directions: response
                  }}
                  // optional
                  onLoad={directionsRenderer => {
                    console.log('DirectionsRenderer onLoad directionsRenderer: ', directionsRenderer)
                  }}
                  // optional
                  onUnmount={directionsRenderer => {
                    console.log('DirectionsRenderer onUnmount directionsRenderer: ', directionsRenderer)
                  }}
                />
              )} */}
        { /* Child components, such as markers, info windows, etc. */ }
        {/* <Marker  position={{ lat: position.coords.latitude, lng: position.coords.longitude }}/> */}
        {/* <Marker  position={{lat: Number(localStorage.getItem('lat')), lng: Number(localStorage.getItem('lng'))}}/> */}
        <Marker position={JSON.parse(props.location)} />
        
      </GoogleMap>
      </div>
  ) : <></>
}

export default React.memo(MyComponent)