  // show events by promoters and provides a form for promoters to create an event


import styles from './Promoters.module.css'
import { Button, Grid, Card, Icon, Modal, Form } from 'semantic-ui-react'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { createEvent, getEventsByPromoter, updateEvent, deleteEvent, getEvent } from '../../api/Events/eventsRoutes'
import { uploadPhoto } from '../../api/photoUpload/photoUpload'
import { Dropdown } from 'semantic-ui-react'
import DatePicker from 'react-date-picker';
import 'react-date-picker/dist/DatePicker.css';
import 'react-calendar/dist/Calendar.css';
import StyledDropzone from '../FileUpload/FileUpload'





function Promoters() {

  const [eventsLst, setEvents] = useState([])

    // use effect hook used to load events data by promoter before rendering component
  useEffect(()=>{
    let events = [];
    const evnts =async()=>{
      
      let tempLst = [];
      let response = await getEventsByPromoter({id: Number(JSON.parse(localStorage.getItem('user')).id)})
      let allEvents = response.events.reverse()
      console.log('evnts', allEvents)
      allEvents.forEach((evnt, i)=>{
        // console.log(evnt)
        if(tempLst.length < 3){
          tempLst.push(evnt)
        }else{
          events.push(tempLst)
          tempLst = []
          tempLst = tempLst.concat(evnt)
        }
        if(i === allEvents.length -1) events.push(tempLst)
      })
      // console.log("events", events)
      setEvents(events)
    }
    evnts().catch(console.error)
  }, [])
  // let allEvents = []
 

 

  // const evnts =async()=>{
  //   let allEvents = await getAllEvents()
  //   // console.log('evnts', allEvents)
  //   allEvents.forEach((evnt, i)=>{
  //     console.log(evnt)
  //     if(tempLst.length < 3){
  //       tempLst.push(evnt)
  //     }else{
  //       events.push(tempLst)
  //       tempLst = []
  //       tempLst.push(evnt)
  //     }
  //     if(i === allEvents.length -1) events.push(tempLst)
  //   })
  //   console.log("events", events)
  //   setEvents(events)
  // }
  // evnts()

  // console.log("allEventos", allEvents)




  // const allEvents = [{name:"event1", photo:"url"}, {name:"event2", photo:"url"}, {name:"event3", photo:"url"}, {name:"event4", photo:"url"}, {name:"event5", photo:"url"}, {name:"event6", photo:"url"}, {name:"event7", photo:"url"}, {name:"event8", photo:"url"}, {name:"event9", photo:"url"}, {name:"event10", photo:"url"}]
  // const events = [[{name:"event1", photo:"url"}, {name:"event2", photo:"url"}, {name:"event3", photo:"url"}],[{name:"event4", photo:"url"}, {name:"event5", photo:"url"}, {name:"event6", photo:"url"}],[{name:"event7", photo:"url"}, {name:"event8", photo:"url"}, {name:"event9", photo:"url"}]]


  // allEvents.forEach((evnt, i)=>{
  //   if(tempLst.length < 3){
  //     tempLst.push(evnt)
  //   }else{
  //     events.push(tempLst)
  //     tempLst = []
  //     tempLst.push(evnt)
  //   }
  //   if(i === allEvents.length -1) events.push(tempLst)
  // })


  // console.log("all events", events)
  const [update, setUpdate] = useState(false)
  const [open, setOpen] = useState(false)
  const [eventInfo, setEventInfo] = useState({title:"", details:"", price:"", location:"", 
                                                          // date:`${new Date().getFullYear()}-${new Date().getMonth()+1}-${new Date().getDate()}`,
                                                          date: new Date(), 
                                                          photo:""})
  const navigate = useNavigate()
  const [eventToEditID, setEventToEditID] = useState(null)
  const [eventToDelID, setEventToDelID] = useState(null)

  // console.log(JSON.parse(localStorage.getItem('user')).id)

  // const createEventCall=async(e)=>{
  //   // e.preventDefault()
  //   // console.log('create event call')
  //   e.preventDefault()
  //   console.log('create event call')
  //   const{date, details, location, photo ,price, title}= eventInfo
  //   if(date && details && location && photo && price && title){
  //     console.log(eventInfo)
    
   
  //     console.log(eventInfo.photo[0])
  //     const photoUploadResponse = await uploadPhoto(eventInfo.photo[0])
  //     const photoURL = photoUploadResponse.data
  
  //     const eventBodySend = {...eventInfo, photo: photoURL,promoterid: JSON.parse(localStorage.getItem('user')).id}
  
  //      // console.log(eventBodySend)
  //     const result = await createEvent(eventBodySend)
  //     // console.log(result)
  //     // console.log(result.newEvent)
  //     window.location.replace(`event/${result.newEvent.event.id}`)
  //     setEventInfo({title:"", details:"", price:"", location:"", date:new Date(), photo:""})
  //   }
  // }
  const countryOptions = [
    {key:'adj', value:'Adjuntas', text:'Adjuntas'},
    {key:'agu', value:'Aguada', text:'Aguada'},
    {key:'aguad', value:'Aguadilla', text:'Aguadilla'},
    {key:'aguas', value:'Aguas Buenas', text:'Aguas Buenas'},
    {key:'aic', value:'Aibonito', text:'Aibonito'},
    {key:'anas', value:'Añasco', text:'Añasco'},
    {key:'are', value:'Arecibo', text:'Arecibo'},
    {key:'arr', value:'Arroyo', text:'Arroyo'},
    {key:'barc', value:'Barceloneta', text:'Barceloneta'},
    {key:'barr', value:'Barranquitas', text:'Barranquitas'},
    {key:'baya', value:'Bayamón', text:'Bayamón'},
    {key:'cabo', value:'Cabo Rojo', text:'Cabo Rojo'},
    {key:'cagu', value:'Caguas', text:'Caguas'},
    {key:'cam', value:'Camuy', text:'Camuy'},
    {key:'can', value:'Canóvanas', text:'Canóvanas'},
    {key:'car', value:'Carolina', text:'Carolina'},
    {key:'cat', value:'Cataño', text:'Cataño'},
    {key:'cay', value:'Cayey', text:'Cayey'},
    {key:'cei', value:'Ceiba', text:'Ceiba'},
    {key:'cia', value:'Ciales', text:'Ciales'},
    {key:'cid', value:'Cidra', text:'Cidra'},
    {key:'coa', value:'Coamo', text:'Coamo'},
    {key:'com', value:'Comerío', text:'Comerío'},
    {key:'cor', value:'Corozal', text:'Corozal'},
    {key:'cule', value:'Culebra', text:'Culebra'},
    {key:'dora', value:'Dorado', text:'Dorado'},
    {key:'faj', value:'Fajardo', text:'Fajardo'},
    {key:'flor', value:'Florida', text:'Florida'},
    {key:'guan', value:'Guanica', text:'Guanica'},
    {key:'guay', value:'Guayama', text:'Guayama'},
    {key:'guayn', value:'Guayanilla', text:'Guayanilla'},
    {key:'guaynabo', value:'Guaynabo', text:'Guaynabo'},
    {key:'gur', value:'Gurabo', text:'Gurabo'},
    {key:'hat', value:'Hatillo', text:'Hatillo'},
    {key:'horm', value:'Hormigueros', text:'Hormigueros'},
    {key:'hum', value:'Humacao', text:'Humacao'},
    {key:'isab', value:'Isabela', text:'Isabela'},
    {key:'jay', value:'Jayuya', text:'Jayuya'},
    {key:'juana', value:'Juana Díaz', text:'Juana Díaz'},
    {key:'junc', value:'Juncos', text:'Juncos'},
    {key:'laja', value:'Lajas', text:'Lajas'},
    {key:'lama', value:'Lares', text:'Lares'},
    {key:'lasm', value:'Las Marías', text:'Las Marías'},
    {key:'lasp', value:'Las Piedras', text:'Las Piedras'},
    {key:'loiz', value:'Loíza', text:'Loíza'},
    {key:'luq', value:'Luquillo', text:'Luquillo'},
    {key:'man', value:'Manatí', text:'Manatí'},
    {key:'mar', value:'Maricao', text:'Maricao'},
    {key:'mau', value:'Maunabo', text:'Maunabo'},
    {key:'may', value:'Mayagüez', text:'Mayagüez'},
    {key:'moca', value:'Moca', text:'Moca'},
    {key:'mor', value:'Morovis', text:'Morovis'},
    {key:'naguabo', value:'Naguabo', text:'Naguabo'},
    {key:'nara', value:'Naranjito', text:'Naranjito'},
    {key:'oroc', value:'Orocovis', text:'Orocovis'},
    {key:'pat', value:'Patillas', text:'Patillas'},
    {key:'pen', value:'Peñuelas', text:'Peñuelas'},
    {key:'pied', value:'Ponce', text:'Ponce'},
    {key:'quebr', value:'Quebradillas', text:'Quebradillas'},
    {key:'rin', value:'Rincón', text:'Rincón'},
    {key:'roos', value:'Río Grande', text:'Río Grande'},
    {key:'sab', value:'Sabana Grande', text:'Sabana Grande'},
    {key:'sal', value:'Salinas', text:'Salinas'},
    {key:'sanl', value:'San Lorenzo', text:'San Lorenzo'},
    {key:'sanse', value:'San Sebastián', text:'San Sebastián'},
    {key:'sant', value:'Santa Isabel', text:'Santa Isabel'},
    {key:'toa', value:'Toa Alta', text:'Toa Alta'},
    {key:'toc', value:'Toa Baja', text:'Toa Baja'},
    {key:'truj', value:'Trujillo Alto', text:'Trujillo Alto'},
    {key:'utu', value:'Utuado', text:'Utuado'},
    {key:'veg', value:'Vega Alta', text:'Vega Alta'},
    {key:'vegab', value:'Vega Baja', text:'Vega Baja'},
    {key:'viej', value:'Vieques', text:'Vieques'},
    {key:'vill', value:'Villalba', text:'Villalba'},
    {key:'yab', value:'Yabucoa', text:'Yabucoa'},
    {key:'yar', value:'Yauco', text:'Yauco'}
  ]

  const onDateChange=(e)=>{
    console.log(e)
    // const newDate = `${new Date(e).getFullYear()}-${new Date(e).getMonth()+1}-${new Date(e).getDate()}`
    // console.log(newDate)
    setEventInfo({...eventInfo, date: e })
  }

  const updateEventCall=async(e)=>{
    // e.preventDefault()
    // console.log('create event call')
    const eventBodySend = {...eventInfo, eventid: eventToEditID}
    // console.log(eventBodySend)
    const result = await updateEvent(eventBodySend)
    console.log(result)
    // console.log(result.newEvent)
    // window.location.replace(`event/${result.newEvent.event.id}`)
    setEventInfo({title:"", details:"", price:"", location:"", date:"", photo:""})
    window.location.reload(true)
  }
  const deleteEventCall=async(e)=>{
    // e.preventDefault()
    // console.log('create event call')
    const eventBodySend = {id: eventToDelID}
    console.log(eventBodySend)
    const result = await deleteEvent(eventBodySend)
    console.log(result)
    window.location.reload(true)
    // console.log(result.newEvent)
  }

  const handlePriceChange = (e)=>{

    // console.log(e.target.value)

    if(e.target.value.match(/^[0-9]/)){
      console.log(e.target.value)
      setEventInfo({...eventInfo, price:Number(e.target.value)})
    }
  }

  return (
    <div>
    {/* {console.log(eventsLst)} */}
      {/* <nav className={styles.navBar}>
        <p className={styles.title}>PURCycling</p>
        <Button className={styles.sbmtBtn} type='submit'>SignUp</Button>
      </nav> */}
      <div className={styles.events}>
        <Grid>
          <Grid.Row className={styles.eventsHeader}>
            {/* <Grid.Column> */}
              <p className={styles.title}>Events</p>
            {/* </Grid.Column> */}
            {/* <Grid.Column> */}
            <Button onClick={()=>{setOpen(true)}} className={styles.sbmtBtn} type='submit'>Create New Event</Button>
            {/* </Grid.Column> */}
          </Grid.Row>
          {/* <Grid.Row> */}

            {

              eventsLst.map(eventRow =>{
                // console.log(eventRow)
                return(
                  <Grid.Row className={styles.eventRow}>
                    {eventRow.map(event=>{
                      // console.log(event)
                      return(
                        <Card onClick={(e)=>{e.stopPropagation();navigate(`/event/${event.id}`)}}>
                          {/* <img  src={mainLogo} alt="fireSpot"/> */}
                          {/* <img src='https://storage.googleapis.com/capstone-event-photos/default-image.png' /> */}
                          <img src={event.photo} alt='some'></img>
                          <Card.Content>
                          <Card.Header>{event.title}</Card.Header>
                            <Card.Meta>
                              {/* <span className='date'>Joined in 2015</span> */}
                              <span className='date'>{event.date}</span>
                            </Card.Meta>
                            <Card.Description>
                              {event.details}
                            </Card.Description>
                          </Card.Content>
                          <Card.Content extra>
                              <Icon name='user' />
                          </Card.Content>
                          <Grid columns ={2}>
                            <Grid.Row>
                              <Grid.Column>
                          <Button onClick={async(e)=>{ 
                                    e.stopPropagation(); 
                                    
                                    setEventToEditID(event.id);
                                    const eventToBeEditedResponse = await getEvent({id: Number(event.id)})
                                    setEventInfo(eventToBeEditedResponse.event)
                                    setUpdate(true); 
                                    }
                                  } 
                            className={styles.sbmtBtn} type='submit'>Update</Button>
                          </Grid.Column>
                          <Grid.Column>
                          <Button onClick={(e)=>{ e.stopPropagation(); deleteEventCall(); setEventToDelID(event.id)}} className={styles.sbmtBtn} type='submit'>Delete</Button>
                            </Grid.Column>
                            </Grid.Row>
                          </Grid>
                        </Card>
                      )
                    })}
                  </Grid.Row>
                )

              })

              // events[0].map(event=>{
              //   return(
              //     <Card>
              //       <Image src='../../assets/Logo.jpeg' wrapped ui={false}/>
              //       <Card.Content>
              //       <Card.Header>{event.name}</Card.Header>
              //         <Card.Meta>
              //           <span className='date'>Joined in 2015</span>
              //         </Card.Meta>
              //         <Card.Description>
              //           Matthew is a musician living in Nashville.
              //         </Card.Description>
              //       </Card.Content>
              //       <Card.Content extra>
              //         <a>
              //           <Icon name='user' />
              //           22 Friends
              //         </a>
              //       </Card.Content>
              //     </Card>
              //   )
              // })
            }
          {/* </Grid.Row> */}
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
          <div style={{display:"flex", flexDirection:"column"}}>
          <label style={{fontWeight:"bold"}}>Date</label>
          <DatePicker onChange={(e)=>onDateChange(e)} value={eventInfo.date}/>
          </div>
          <Form >

            <Form.Group widths='equal' className={styles.eventForm}>
                <Form.Input onChange={(e)=>{setEventInfo({...eventInfo, title:e.target.value})}} fluid label='Title' placeholder='Title' />
                <Form.Input onChange={(e)=>{setEventInfo({...eventInfo, details:e.target.value})}} fluid label='Details' placeholder='Details' />
                
                {/* <Form.Input onChange={(e)=>{setEventInfo({...eventInfo, price:Number(e.target.value)})}} type='number' fluid label='Price' placeholder='Price' /> */}
                <Form.Input onChange={(e)=>{handlePriceChange(e)}} fluid label='Price' placeholder='Price' value={eventInfo.price}/>
                {/* <Form.Input onChange={(e)=>{setEventInfo({...eventInfo, location:e.target.value})}} fluid label='Location' placeholder='Location' /> */}
                <label style={{fontWeight:"bold"}}>Location</label>
                <Dropdown
                  placeholder='Select City'
                  fluid
                  search
                  selection
                  options={countryOptions}
                  onChange={(e)=>{console.log(e.target.textContent); setEventInfo({...eventInfo, location: e.target.textContent})}}
                />
                {/* <Form.Input onChange={(e)=>{setEventInfo({...eventInfo, date:e.target.value})}} fluid label='Date' placeholder='Date' /> */}
                  {/* <div> */}
                {/* <DatePicker onChange={(e)=>onDateChange(e)} value={date}/> */}
                {/* </div> */}
                {/* <Form.Input onChange={(e)=>{setEventInfo({...eventInfo, photo:e.target.value})}} fluid label='Photo' placeholder='Photo' /> */}
                <Form.Input label='Photo'>
                {/* <Dropzone onDrop={acceptedFiles => {console.log(acceptedFiles); setEventInfo({...eventInfo, photo:acceptedFiles})}}>
                  {({getRootProps, getInputProps}) => (
                    <section >
                      <div {...getRootProps()}>
                        <input {...getInputProps()} />
                        <p>Drag 'n' drop some files here, or click to select files</p>
                      </div>
                    </section>
                  )}
                </Dropzone> */}
                <StyledDropzone eventInfo={eventInfo} setEventInfo={setEventInfo}/>
                </Form.Input>
            </Form.Group>
          </Form>
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
          onClick={async() => {
              console.log("create event call on button")
              const{date, details, location, photo ,price, title}= eventInfo
              if(date && details && location && photo && price && title){
                console.log(eventInfo)

              const geoCodeResponse = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${location}, Puerto Rico&key=${process.env.REACT_APP_MAP_KEY}`).then(response => response.json())
              const { lat, lng } = geoCodeResponse.results[0].geometry.location
            
                console.log(eventInfo.photo[0])
                const photoUploadResponse = await uploadPhoto(eventInfo.photo[0])
                const photoURL = photoUploadResponse.data
                // const eventBodySend = {...eventInfo, location: JSON.stringify({lat: lat, lng:lng})}
                // console.log(eventBodySend)
            
                const eventBodySend = {...eventInfo, location: JSON.stringify({lat: lat, lng:lng}), photo: photoURL,promoterid: JSON.parse(localStorage.getItem('user')).id}
            
                // console.log(eventBodySend)
                const result = await createEvent(eventBodySend)
                // console.log(result)
                // console.log(result.newEvent)
                window.location.replace(`event/${result.newEvent.event.id}`)
                setEventInfo({title:"", details:"", price:"", location:"", date:new Date(), photo:""})
              }
              // createEventCall();
              // console.log(eventInfo);
              setOpen(false)
            }
          }
          positive
        />
      </Modal.Actions>
    </Modal>
    <Modal
      onClose={() => setUpdate(false)}
      onOpen={() => setUpdate(true)}
      open={update}
      // trigger={<Button>Show Modal</Button>}
    >
      <Modal.Header>Update Event</Modal.Header>
      <Modal.Content >
        {/* <Image size='medium' src='https://react.semantic-ui.com/images/avatar/large/rachel.png' wrapped /> */}
        <Modal.Description>
          {/* <Header>Default Profile Image</Header> */}
          {/* <p>
            We've found the following gravatar image associated with your e-mail
            address.
          </p>
          <p>Is it okay to use this photo?</p> */}
          <Form >
            <Form.Group widths='equal' className={styles.eventForm}>
                <Form.Input onChange={(e)=>{setEventInfo({...eventInfo, title:e.target.value})}} fluid label='Title' placeholder='Title' value={eventInfo.title}/>
                <Form.Input onChange={(e)=>{setEventInfo({...eventInfo, details:e.target.value})}} fluid label='Details' placeholder='Details' value={eventInfo.details}/>
                <Form.Input onChange={(e)=>{setEventInfo({...eventInfo, price:Number(e.target.value)})}} type='number' fluid label='Price' placeholder='Price' value={eventInfo.price}/>
                <Form.Input onChange={(e)=>{setEventInfo({...eventInfo, location:e.target.value})}} fluid label='Location' placeholder='Location' value={eventInfo.location}/>
                <Form.Input onChange={(e)=>{setEventInfo({...eventInfo, date:e.target.value})}} fluid label='Date' placeholder='Date' value={eventInfo.date}/>
                <Form.Input onChange={(e)=>{setEventInfo({...eventInfo, photo:e.target.value})}} fluid label='Photo' placeholder='Photo' value={eventInfo.photo}/>
            </Form.Group>
          </Form>
        </Modal.Description>
      </Modal.Content>
      <Modal.Actions>
        <Button color='black' onClick={() => setUpdate(false)}>
          Cancel
        </Button>
        <Button
          content="Update"
          labelPosition='right'
          icon='checkmark'
          onClick={() => {
              updateEventCall();
              console.log(eventInfo);
              setUpdate(false)
            }
          }
          positive
        />
      </Modal.Actions>
    </Modal>
        </Grid>
      </div>
    </div>
  );
}

export default Promoters;
