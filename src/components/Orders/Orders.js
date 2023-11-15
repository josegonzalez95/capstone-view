import React, { useEffect, useState } from 'react';
// import useFetch from '../../hooks/useFetch';
import { useParams, useNavigate } from 'react-router-dom';
import { Table, Button } from 'semantic-ui-react';
// import CsvDownloader from 'react-csv-downloader';
import { eventOrders } from '../../api/Orders/ordersRoutes';

const Orders = () => {
	const { eventId } = useParams();
	// const { data, error } = useFetch(
	// 	`${process.env.REACT_APP_API_URL}/search-payments`,
	// 	{ eventId: Number(eventId) }
	// );
	// const [loading, setLoading] = useState(true)
	const navigate = useNavigate();
	const [orders, setOrders] = useState([]);
	const itemsPerPage = 10;
	const [currentPage, setCurrentPage] = useState(1);
	const [loading, setLoading] = useState(true);

	const indexOfLastItem = currentPage * itemsPerPage;
	const indexOfFirstItem = indexOfLastItem - itemsPerPage;
	const currentItems = !loading
		? orders.slice(indexOfFirstItem, indexOfLastItem)
		: [];

	const [totalPages, setTotalPages] = useState(0);
	// Math.ceil(orders.length / itemsPerPage);

	useEffect(() => {
		const getOrders = async () => {
			const orders = await eventOrders({ eventId: Number(eventId) });
			console.log(orders);
			setOrders(orders.orders);
			setTotalPages(Math.ceil(orders.orders.length / itemsPerPage));
			setLoading(false);
		};
		getOrders().catch(console.error);
		// eslint-disable-next-line
	}, []);

	// let totalRevenue = 0;
	// if (!loading) {
	// 	orders.forEach((order) => {
	// 		totalRevenue += order.amount_payed;
	// 	});
	// }
	let totalRevenue = 0;
	// let serviceFee = 0;
	// let transactionFee = 0;
	if (!loading) {
		orders.forEach((order) => {
			totalRevenue += order.amount_payed;
			// serviceFee += order.service_fee;
			// transactionFee += order.transaction_fee;
		});
	}

	// const exportDocument = async () => {
	// 	// let result = [
	// 	//   "Total Revenue", `$${totalRevenue/100}`,
	// 	console.log('la mierda');
	// 	// ]
	// 	const res = await fetch(
	// 		`${process.env.REACT_APP_API_URL}/search-payments`,
	// 		{
	// 			method: 'POST',
	// 			body: JSON.stringify({ eventId: Number(eventId) }),
	// 			headers: {
	// 				'Content-Type': 'application/json',
	// 			},
	// 		}
	// 	);
	// 	console.log(res);
	// 	const data = await res.json();
	// 	// return data
	// 	console.log(data);
	// 	// return JSON.parse(data)
	// 	// const result = data.json()
	// 	const result = data.paymentIntent.data.map((order) => {
	// 		const { metadata, created, ...newOrder } = order;
	// 		return {
	// 			...newOrder,
	// 			order_id: metadata.order_id,
	// 			created: new Date(created * 1000).toLocaleString('default', {
	// 				month: 'long',
	// 				day: '2-digit',
	// 				year: 'numeric',
	// 			}),
	// 		};
	// 	});
	// 	// console.log(result)
	// 	return result;
	// };

	const handlePageChange = (newPage) => {
		if (newPage >= 1 && newPage <= totalPages) {
			setCurrentPage(newPage);
		}
	};
	// console.log(data.paymentIntent.data)
	// const getOrderDates = async () => {

	// };

	// if(loading && orders.length ===0){
	//   getOrderDates()
	// }

	return (
		<div
			style={{
				display: 'flex',
				alignItems: 'center',
				flexDirection: 'column',
				color: 'white',
				fontSize: '1.5rem',
			}}>
			{console.log(orders)}
			{
				loading ? (
					<p>Loading orders...</p>
				) : (
					<div style={{ width: '75%', marginBottom: '2rem' }}>
						{/* {console.log(data.paymentIntent.data)} */}
						<h1>Orders</h1>
						{/* <CsvDownloader className='export-container' datas={exportDocument} filename='orders-export.csv' >
          Export to CSV
        </CsvDownloader> */}
						<Table definition>
							<Table.Body>
								<Table.Row>
									<Table.Cell>Num. of orders</Table.Cell>
									<Table.Cell>{orders.length}</Table.Cell>
								</Table.Row>
								<Table.Row>
									<Table.Cell>Total Revenue</Table.Cell>
									<Table.Cell>${totalRevenue.toFixed(2)}</Table.Cell>
								</Table.Row>
								<Table.Row>
									<Table.Cell>Disbursement fees</Table.Cell>
									<Table.Cell>${(totalRevenue * 0.06).toFixed(2)}</Table.Cell>
								</Table.Row>
								<Table.Row>
									<Table.Cell>Profit after expenses</Table.Cell>
									<Table.Cell>
										${(totalRevenue - totalRevenue * 0.06).toFixed(2)}
									</Table.Cell>
								</Table.Row>
							</Table.Body>
						</Table>
						<Table
							celled
							selectable>
							<Table.Header>
								{/* Header cells */}
								<Table.Row>
									<Table.HeaderCell>Stripe Id</Table.HeaderCell>
									<Table.HeaderCell>Order Id</Table.HeaderCell>
									<Table.HeaderCell>Date created</Table.HeaderCell>
									<Table.HeaderCell>Amount payed</Table.HeaderCell>
									<Table.HeaderCell>Status</Table.HeaderCell>
								</Table.Row>
							</Table.Header>
							<Table.Body>
								{/* Map over currentItems to render table rows */}
								{currentItems.map((order, index) => {
									return (
										<Table.Row
											onClick={() => {
												navigate(
													`/event/${eventId}/orders/${order.orderid}/${order.paymentdetails}`,
													{ state: { order: order } }
												);
											}}>
											<Table.Cell>{order.paymentdetails}</Table.Cell>
											<Table.Cell>{order.orderid}</Table.Cell>
											<Table.Cell>
												{new Date(order.date_created).toLocaleString(
													'default',
													{ month: 'long', day: '2-digit', year: 'numeric' }
												)}
											</Table.Cell>
											<Table.Cell>${order.amount_payed}</Table.Cell>
											<Table.Cell>{order.payment_status}</Table.Cell>
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
				)

				//   )
				// })}</div>
			}
		</div>
	);
};

export default Orders;
