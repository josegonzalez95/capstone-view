import React, { useEffect, useState } from "react";
import { Grid, Card, Icon, Button } from "semantic-ui-react";
import { useNavigate } from "react-router-dom";
import { getAllEvents, getEventsByDate} from "../../api/Events/eventsRoutes";
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css'; 
import moment from 'moment'
import "./Calendar.css"
import ResizableImage from "../ResizableImage/ResizableImage";

function CalendarP() {
  const [highlightedDates, setHighlightedDates] = useState([
    new Date("2023-04-18 18:13:38.118000"),
    new Date("2023-08-12 04:00:00.000000"),
    new Date("2023-05-25"),
  ]);
  const [dateState, setDateState] = useState(new Date())
  const changeDate = async (e) => {
    let events = [];
    setDateState(e)
    //eventExists.set
    let tempLst = [];
    const response = await getEventsByDate({"timestamp": (moment(e).format('YYYY-MM-DD'))})
    // let monthThing = moment(dateState).format('YYYY-MM-DD')
    // let newMonthing = monthThing.replace(dateState.getMonth, dateState.getMonth+1)
    // console.log('will this work?', newMonthing)

    //const getEventsPerMonth = await getEventsByMonth({"timestampMin": (moment(e).format('YYYY-MM-DD')) , "timestampMin": "" })
    //console.log("what iis day",(moment(dateState).format('YYYY-MM-DD')))
    //console.log("response",response.events.length)
    let allEvents = response? response.events.reverse():null
    
    // const allEvents = [{name:"event1", photo:"url"}, {name:"event2", photo:"url"}, {name:"event3", photo:"url"}, {name:"event4", photo:"url"}, {name:"event5", photo:"url"}, {name:"event6", photo:"url"}, {name:"event7", photo:"url"}, {name:"event8", photo:"url"}, {name:"event9", photo:"url"}, {name:"event10", photo:"url"}]

    // console.log('evnts', allEvents)
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
    console.log("events", events)
    setEvents(events)
  }
  // const doesHaveEvent = async (e) =>{
  // const response = await getEventsByDate({"timestamp": (moment(e).format('YYYY-MM-DD'))})
  //  return response.events.length
  // }
  // const allEvents = [{name:"event1", photo:"url"}, {name:"event2", photo:"url"}, {name:"event3", photo:"url"}, {name:"event4", photo:"url"}, {name:"event5", photo:"url"}, {name:"event6", photo:"url"}, {name:"event7", photo:"url"}, {name:"event8", photo:"url"}, {name:"event9", photo:"url"}, {name:"event10", photo:"url"}]

  const [eventsLst, setEvents] = useState([])
  const navigate = useNavigate()

  useEffect(()=>{
    let events = [];
    let dateList = [];
    const evnts =async()=>{
      
      let tempLst = [];
      
      // let response = await getEventsByPromoter({id: Number(JSON.parse(localStorage.getItem('user')).id)})
      // let response = allEvenherots
      const response = await getEventsByDate({"timestamp": (moment(dateState).format('YYYY-MM-DD'))})
      const allEventsResponse = await getAllEvents()
      let dates = allEventsResponse.events
      
      dates.forEach((dates,i)=>{
        const d= new Date(dates.date) 
        dateList.push(d)
        // console.log(dates.date)
        // console.log(d.getDate)
      })
      // console.log("is the list a list?",dateList)
      // console.log("what does this list look like??",highlightedDates)
      
      setHighlightedDates(dateList)

      // console.log("what does this list look like??",highlightedDates)
      //console.log("what iis day",(moment(dateState).format('YYYY-MM-DD')))
      //console.log("response",response)
      let allEvents = response? response.events.reverse():null
      
      // const allEvents = [{name:"event1", photo:"url"}, {name:"event2", photo:"url"}, {name:"event3", photo:"url"}, {name:"event4", photo:"url"}, {name:"event5", photo:"url"}, {name:"event6", photo:"url"}, {name:"event7", photo:"url"}, {name:"event8", photo:"url"}, {name:"event9", photo:"url"}, {name:"event10", photo:"url"}]

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
      console.log("events", events)
      setEvents(events)
    }
    evnts().catch(console.error)
  }, 
  // eslint-disable-next-line 
  []
  )
 


  const tileClassName = ({ date, view }) => {
    // Check if the current date is in the highlightedDates array
    if (
      view === "month" &&
      highlightedDates.find((highlightedDate) => {
        return (
          highlightedDate.getDate() === date.getDate() &&
          highlightedDate.getMonth() === date.getMonth() &&
          highlightedDate.getFullYear() === date.getFullYear()
        );
      })
    ) {
      return "highlighted-date";
    }
  };
  return (
    // <Grid textAlign="center" style={{"margin-top": "auto"}}>
    <div style={{display:"flex", alignItems:"center", flexDirection:"column"}}>
    <Calendar 
      value={dateState}
      onChange={changeDate }
      tileClassName={tileClassName}
      />
    <p>Current Event Listing for the selected date  <b>{moment(dateState).format('MMMM Do YYYY')}</b></p> 
        {console.log(eventsLst)}
        {
          

eventsLst.map(eventRow =>{
  // console.log(eventRow)
  return(
    <Grid.Row className={"eventRow"}>
      {eventRow.map(event=>{
        // console.log(event)
        return(
          <Card>
            {/* <img  src={event.photo}/> */}
            <ResizableImage src={event.photo} aspectRatio={1/1}/>

            <Card.Content>
            <Card.Header>{event.title}</Card.Header>
              <Card.Meta>
                {/* <span className='date'>Joined in 2015</span> */}
                <span className='date'>{event.date}</span>
              </Card.Meta>
              <Card.Description>
                {/* {event.details} */}
                {/* {event.photo} */}
              </Card.Description>
            </Card.Content>
            <Card.Content extra>
                <Icon name='user' />
            </Card.Content>
            <Button onClick={()=>{navigate(`/registerParticipant/${event.id}`)}} className={"sbmtBtn"} type='submit'>Register</Button>
          </Card>
        )
      })}
    </Grid.Row>
  )

})
}
    </div>
    // </Grid>
    
  )
}
  export default CalendarP;