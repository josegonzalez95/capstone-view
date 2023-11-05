import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Table, Button } from 'semantic-ui-react';
import { getAllEvents } from '../../api/Events/eventsRoutes';

const Billing = () => {
	const navigate = useNavigate();
	const [state, setState] = useState({
		events: [],
	});
	const itemsPerPage = 10;
	const [currentPage, setCurrentPage] = useState(1);
	const [loading, setLoading] = useState(true);

	const indexOfLastItem = currentPage * itemsPerPage;
	const indexOfFirstItem = indexOfLastItem - itemsPerPage;
	const currentItems = !loading
		? state.events.slice(indexOfFirstItem, indexOfLastItem)
		: [];

	const [totalPages, setTotalPages] = useState(0);

	useEffect(() => {
		const getEvents = async () => {
			const events = await getAllEvents();
			const currentDate = new Date();
			let pastDates = [];
			let futureDates = [];
			events.events.forEach((event) => {
				const dateObj = new Date(event.date);
				if (dateObj < currentDate) {
					pastDates.push({ ...event, past: true });
				} else {
					futureDates.push({ ...event, past: false });
				}
			});
			pastDates.sort((a, b) => new Date(a.date) - new Date(b.date));

			futureDates.sort((a, b) => new Date(a.date) - new Date(b.date));

			setState((prevState) => {
				return {
					...prevState,
					events: futureDates.concat(pastDates),
				};
			});
			setTotalPages(Math.ceil(events.events.length / itemsPerPage));
			setLoading(false);
		};
		getEvents().catch(console.error);
	}, []);

	const handlePageChange = (newPage) => {
		if (newPage >= 1 && newPage <= totalPages) {
			setCurrentPage(newPage);
		}
	};

	return (
		<div
			style={{
				display: 'flex',
				alignItems: 'center',
				flexDirection: 'column',
				color: 'white',
				fontSize: '1.5rem',
			}}>
			{loading ? (
				<p>Loading events...</p>
			) : (
				<div style={{ width: '75%', marginBottom: '2rem' }}>
					<h1>Billing</h1>
					<Table definition>
						<Table.Body>
							<Table.Row>
								<Table.Cell>Num. of events</Table.Cell>
								<Table.Cell>{state.events.length}</Table.Cell>
							</Table.Row>
						</Table.Body>
					</Table>
					<Table
						celled
						selectable>
						<Table.Header>
							<Table.Row>
								<Table.HeaderCell>Name</Table.HeaderCell>
								<Table.HeaderCell>Date created</Table.HeaderCell>
								<Table.HeaderCell>Past</Table.HeaderCell>
							</Table.Row>
						</Table.Header>
						<Table.Body>
							{/* Map over currentItems to render table rows */}
							{currentItems.map((event, index) => {
								return (
									<Table.Row
										onClick={() => {
											navigate(`/billing/${event.id}/orders`);
										}}>
										<Table.Cell>{event.title}</Table.Cell>
										<Table.Cell>
											{new Date(event.date).toLocaleString('default', {
												month: 'long',
												day: '2-digit',
												year: 'numeric',
											})}
										</Table.Cell>
										<Table.Cell>{String(event.past)}</Table.Cell>
									</Table.Row>
								);
							})}
						</Table.Body>
					</Table>
					<div className='pagination'>
						<Button
							disabled={currentPage === 1}
							onClick={() => handlePageChange(currentPage - 1)}>
							Previous
						</Button>

						<Button.Group>
							{currentPage !== 1 && (
								<Button
									disabled={currentPage === 1}
									onClick={() => handlePageChange(1)}>
									1
								</Button>
							)}

							{currentPage > 3 && <Button disabled>...</Button>}
							{currentPage > 2 && (
								<Button onClick={() => handlePageChange(currentPage - 1)}>
									{currentPage - 1}
								</Button>
							)}
							<Button className='active'>{currentPage}</Button>
							{currentPage < totalPages - 1 && (
								<Button onClick={() => handlePageChange(currentPage + 1)}>
									{currentPage + 1}
								</Button>
							)}
							{currentPage < totalPages - 2 && <Button disabled>...</Button>}
							{currentPage !== totalPages && (
								<Button
									disabled={currentPage === totalPages}
									onClick={() => handlePageChange(totalPages)}>
									{totalPages}
								</Button>
							)}
						</Button.Group>

						<Button
							disabled={currentPage === totalPages}
							onClick={() => handlePageChange(currentPage + 1)}>
							Next
						</Button>
					</div>
				</div>
			)}
		</div>
	);
};

export default Billing;
