import React from 'react';
import { useParams } from 'react-router-dom';
import useFetch from '../../hooks/useFetch';
import { Table } from 'semantic-ui-react';

const Order = () => {
	const { orderId } = useParams();
	// console.table(paymentId);
	// const [order, setOrder] = useState(null);
	// const location = useLocation();

	// useEffect(() => {
	// 	if (location.state && location.state.order) setOrder(location.state.order);
	// });

	const orderParticipantsResponse = useFetch(
		`${process.env.REACT_APP_API_URL}/get-order-participants`,
		{ orderId: Number(orderId) }
	);
	// const paymentIntentResponse = useFetch(
	// 	`${process.env.REACT_APP_API_URL}/get-payment-intent`,
	// 	{ paymentId: paymentId }
	// );
	const thisOrder = useFetch(`${process.env.REACT_APP_API_URL}/getOrder`, {
		id: Number(orderId),
	});
	console.log(thisOrder);
	// console.log(paymentIntentResponse);
	// console.log(orderParticipantsResponse.data)
	// console.log(location)
	// console.log(order)
	// const orderPayment = useFetch(`${process.env.REACT_APP_API_URL}/search-payments`, {orderId: Number(orderId)})
	// console.log(orderPayment)

	return (
		<div
			style={{
				display: 'flex',
				alignItems: 'center',
				flexDirection: 'column',
				color: 'white',
				fontSize: '1.5rem',
			}}>
			<div style={{ width: '75%', marginBottom: '2rem' }}>
				{orderParticipantsResponse.loading || thisOrder.loading ? (
					<p>Loading participants...</p>
				) : (
					<>
						<h1>Order Details</h1>
						<Table definition>
							<Table.Body>
								<Table.Row>
									<Table.Cell>Stripe Id</Table.Cell>
									<Table.Cell>{thisOrder.data.order.paymentdetails}</Table.Cell>
								</Table.Row>
								<Table.Row>
									<Table.Cell>Order Id</Table.Cell>
									<Table.Cell>{thisOrder.data.order.id}</Table.Cell>
								</Table.Row>
								<Table.Row>
									<Table.Cell>Amount Payed</Table.Cell>
									<Table.Cell>${thisOrder.data.order.amount_payed}</Table.Cell>
								</Table.Row>
								<Table.Row>
									<Table.Cell>Date created</Table.Cell>
									<Table.Cell>
										{new Date(thisOrder.data.order.date_created).toLocaleString(
											'default',
											{
												month: 'long',
												day: '2-digit',
												year: 'numeric',
											}
										)}
									</Table.Cell>
								</Table.Row>
								<Table.Row>
									<Table.Cell>Status</Table.Cell>
									<Table.Cell>{thisOrder.data.order.payment_status}</Table.Cell>
								</Table.Row>
							</Table.Body>
						</Table>
						<Table celled>
							<Table.Header>
								{/* Header cells */}
								<Table.Row>
									{/* <Table.HeaderCell>Stripe Id</Table.HeaderCell> */}
									<Table.HeaderCell>Name</Table.HeaderCell>
									<Table.HeaderCell>Email</Table.HeaderCell>
									<Table.HeaderCell>Phone</Table.HeaderCell>
									{/* <Table.HeaderCell>Category</Table.HeaderCell> */}
									{/* <Table.HeaderCell>Date created</Table.HeaderCell>
        <Table.HeaderCell>Amount payed</Table.HeaderCell>
        <Table.HeaderCell>Status</Table.HeaderCell> */}
								</Table.Row>
							</Table.Header>
							<Table.Body>
								{/* Map over currentItems to render table rows */}
								{orderParticipantsResponse.data.order.map((order, index) => {
									return (
										<Table.Row>
											{/* <Table.Cell>{order.id}</Table.Cell>
                <Table.Cell>{order.metadata.order_id}</Table.Cell>
                <Table.Cell>{new Date(order.created*1000).toLocaleString('default', { month: 'long', day: '2-digit', year: 'numeric' })}</Table.Cell>
                <Table.Cell>${order.amount/100}</Table.Cell> */}
											<Table.Cell>{order.name}</Table.Cell>
											<Table.Cell>{order.email}</Table.Cell>
											<Table.Cell>{order.phone}</Table.Cell>
											{/* <Table.Cell>{order.category}</Table.Cell> */}
										</Table.Row>
									);
								})}
							</Table.Body>
						</Table>
					</>
				)}
			</div>
		</div>
	);
};

export default Order;
