//   this component show all the event for participants to register

import { useEffect, useState } from 'react';
import { Grid, Card, Icon, Button } from 'semantic-ui-react';
import styles from './Participants.module.css';
import { useNavigate } from 'react-router-dom';
import { getAllEvents } from '../../api/Events/eventsRoutes';
import ResizableImage from '../ResizableImage/ResizableImage';

function Participants() {
	const [eventsLst, setEvents] = useState([]);
	const navigate = useNavigate();

	// use effect hook used to fetch all events data before rendering component
	useEffect(() => {
		let events = [];
		const evnts = async () => {
			let tempLst = [];
			const response = await getAllEvents();
			let allEvents = response.events.sort(
				(a, b) => new Date(b.date) - new Date(a.date)
			);

			console.log('evnts', allEvents);
			allEvents.forEach((evnt, i) => {
				// console.log(evnt)
				if (tempLst.length < 3) {
					tempLst.push(evnt);
				} else {
					events.push(tempLst);
					tempLst = [];
					tempLst = tempLst.concat(evnt);
				}
				if (i === allEvents.length - 1) events.push(tempLst);
			});
			console.log('events', events);
			setEvents(events);
		};
		evnts().catch(console.error);
	}, []);
	return (
		<div
			style={{
				display: 'flex',
				alignItems: 'center',
				flexDirection: 'column',
				backgroundColor: '#0c3c60',
			}}>
			{console.log(eventsLst)}
			{eventsLst.map((eventRow) => {
				// console.log(eventRow)
				return (
					// <Grid.Row className={eventRow.length === 3 ? styles.eventRow:styles.eventRowShort}>
					<Grid.Row className={styles.eventRow}>
						{eventRow.map((event) => {
							// console.log(event)
							return (
								<Card style={{ backgroundColor: '#38729b' }}>
									{/* <img  src={event.photo} alt="some"/> */}
									<ResizableImage
										src={event.photo}
										aspectRatio={1 / 1}
									/>
									<Card.Content>
										<Card.Header>{event.title}</Card.Header>
										<Card.Meta>
											{/* <span className='date'>Joined in 2015</span> */}
											<span className='date'>
												{new Date(event.date).toLocaleString('default', {
													month: 'long',
													day: '2-digit',
													year: 'numeric',
												})}
											</span>
										</Card.Meta>
										<Card.Description>
											{/* {event.details} */}
											{/* {event.photo} */}
										</Card.Description>
									</Card.Content>
									<Card.Content extra>
										<Icon name='user' />
									</Card.Content>
									<Button
										onClick={() => {
											navigate(`/registerParticipant/${event.id}`);
										}}
										className={styles.sbmtBtn}
										type='submit'>
										Register
									</Button>
								</Card>
							);
						})}
					</Grid.Row>
				);
			})}
		</div>
	);
}

export default Participants;
