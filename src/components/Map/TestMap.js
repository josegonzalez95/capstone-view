// const { Component } = require('react');
// const { GoogleMap, LoadScript, DirectionsService,Marker, DirectionsRenderer } = require("@react-google-maps/api");
import { LoadScript, GoogleMap, DirectionsService, Marker } from "@react-google-maps/api"
// const ScriptLoaded = require("../../docs/ScriptLoaded").default;
import React from "react"

class Directions extends React.Component {

    
  constructor (props) {
    super(props)

    this.state = {
      response: null,
      travelMode: 'DRIVING',
      origin: '',
      destination: '',
      position:{lat:0, lng:0}
    }

    this.directionsCallback = this.directionsCallback.bind(this)
    this.checkDriving = this.checkDriving.bind(this)
    // this.checkBicycling = this.checkBicycling.bind(this)
    // this.checkTransit = this.checkTransit.bind(this)
    // this.checkWalking = this.checkWalking.bind(this)
    this.getOrigin = this.getOrigin.bind(this)
    this.getDestination = this.getDestination.bind(this)
    this.onClick = this.onClick.bind(this)
    this.onMapClick = this.onMapClick.bind(this)
  }



  directionsCallback (response) {
    console.log('route response' ,response)
    console.log("directionsCallback", response.routes[0].legs[0].end_location)
    const destination =response.routes[0].legs[0].end_location
    const lat = Number(destination.lat())
    const lng = Number(destination.lng())
    this.setState({position:{lat, lng}})
    this.props.setPosition({lat: Number(lat), lng: Number(lng)})
    localStorage.setItem('lat', lat)
    localStorage.setItem('lng', lng)
    console.log(lat, lng)

    if (response !== null) {
      if (response.status === 'OK') {
        this.setState(
          () => ({
            response
          })
        )
      } else {
        console.log('response: ', response)
      }
    }
  }

  checkDriving ({ target: { checked } }) {
    checked &&
      this.setState(
        () => ({
          travelMode: 'DRIVING'
        })
      )
  }



  getOrigin (ref) {
    this.origin = ref
  }

  getDestination (ref) {
    this.destination = ref
  }

  onClick () {
    if (this.origin.value !== '' && this.destination.value !== '') {
      this.setState(
        () => ({
          origin: this.origin.value,
          destination: this.destination.value
        })
      )
    }
  }

  onMapClick (...args) {
    console.log('onClick args: ', args)
  }

  render () {
    {console.log('location', this.props.location)}
    return (
      <div className='map'>
        <div className='map-settings'>
          <hr className='mt-0 mb-3' />

          <div className='row'>
            <div className='col-md-6 col-lg-4'>
              <div className='form-group'>
                {/* <label htmlFor='ORIGIN'>Origin</label> */}
                <br />
                {/* <input id='ORIGIN' className='form-control' type='text' ref={this.getOrigin} /> */}
              </div>
            </div>

            <div className='col-md-6 col-lg-4'>
              <div className='form-group'>
                {/* <label htmlFor='DESTINATION'>Destination</label> */}
                <br />
                {/* <input id='DESTINATION' className='form-control' type='text' ref={this.getDestination} /> */}
              </div>
            </div>
          </div>

         
        </div>
        {console.log(this.state.position)}

        <div className='map-container'>
          <GoogleMap
            // required
            // id='direction-example'
            // required
            mapContainerStyle={{
              height: '400px',
              width: '400px'
            }}
            // required
            zoom={8}
            // required
            center={this.state.position}
            // optional
            onClick={this.onMapClick}
            // optional
            onLoad={map => {
              console.log('DirectionsRenderer onLoad map: ', map)
            }}
            // optional
            onUnmount={map => {
              console.log('DirectionsRenderer onUnmount map: ', map)
              

            }}
          >

            {
              (
                this.state.destination === '' &&
                this.state.origin === ''
              ) && (<>
                <DirectionsService
                  // required
                  options={{ 
                    // destination: this.state.destination,
                    // origin: this.state.origin,
                    // destination:"rincon",
                    destination:this.props.location,
                    origin:"fajardo",
                    travelMode: this.state.travelMode
                  }}
                  // required
                  callback={this.directionsCallback}
                  // optional
                  onLoad={directionsService => {
                    console.log('DirectionsService onLoad directionsService: ', directionsService)
                  }}
                  // optional
                  onUnmount={directionsService => {
                    console.log('DirectionsService onUnmount directionsService: ', directionsService)
                    localStorage.removeItem('lat')
                    localStorage.removeItem('lng')
                  }}
                />
                <Marker onLoad={(marker)=>console.log("marker",marker)}   position={this.state.position}/>
</>
              )
            }

            {
              this.state.response !== null && (
                <></>
                // <DirectionsRenderer
                //   // required
                //   options={{ 
                //     directions: this.state.response
                //   }}
                //   // optional
                //   onLoad={directionsRenderer => {
                //     console.log('DirectionsRenderer onLoad directionsRenderer: ', directionsRenderer)
                //   }}
                //   // optional
                //   onUnmount={directionsRenderer => {
                //     console.log('DirectionsRenderer onUnmount directionsRenderer: ', directionsRenderer)
                //   }}
                // />
              )
            }

          </GoogleMap>
        </div>
      </div>
    )
  }
}

<LoadScript>
  <Directions />
</LoadScript>

export default Directions