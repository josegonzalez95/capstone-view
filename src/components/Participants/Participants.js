import { useEffect, useState } from "react";
import { Grid, Card, Icon, Button } from "semantic-ui-react";
import styles from './Participants.module.css'
import { useNavigate, useParams } from "react-router-dom";
import mainLogo from '../../assets/eventPhoto.jpeg'
import { getAllEvents } from "../../api/Events/eventsRoutes";
import { numberOfParticipants } from "../../api/Participants/participantsRoute";

function Participants() {
  const allEvents = [{name:"event1", photo:"url"}, {name:"event2", photo:"url"}, {name:"event3", photo:"url"}, {name:"event4", photo:"url"}, {name:"event5", photo:"url"}, {name:"event6", photo:"url"}, {name:"event7", photo:"url"}, {name:"event8", photo:"url"}, {name:"event9", photo:"url"}, {name:"event10", photo:"url"}]

  const [eventsLst, setEvents] = useState([])
  const navigate = useNavigate()

  useEffect(()=>{
    let events = [];
    const evnts =async()=>{
      
      let tempLst = [];
      // let response = await getEventsByPromoter({id: Number(JSON.parse(localStorage.getItem('user')).id)})
      // let response = allEvenherots
      const response = await getAllEvents()
      let allEvents = response.events.reverse()
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
  }, [])
    return (
      <div>
        {console.log(eventsLst)}
        {
          

eventsLst.map(eventRow =>{
  // console.log(eventRow)
  return(
    <Grid.Row className={styles.eventRow}>
      {eventRow.map(event=>{
        // console.log(event)
        return(
          <Card>
            <img  src={event.photo}/>
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
              <a>
                <Icon name='user' />
              </a>
            </Card.Content>
            <Button onClick={()=>{navigate(`/registerParticipant/${event.id}`)}} className={styles.sbmtBtn} type='submit'>Register</Button>
          </Card>
        )
      })}
    </Grid.Row>
  )

})
}
      </div>
    );
  }
  
  export default Participants;
  