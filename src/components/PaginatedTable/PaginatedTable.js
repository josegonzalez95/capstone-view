import React, { useState } from 'react';
import { Table, Button } from 'semantic-ui-react';
import { useStripe } from '@stripe/react-stripe-js';

function PaginatedTable({ participants }) {
	const itemsPerPage = 10;
	const [currentPage, setCurrentPage] = useState(1);

	const indexOfLastItem = currentPage * itemsPerPage;
	const indexOfFirstItem = indexOfLastItem - itemsPerPage;
	const currentItems = participants.slice(indexOfFirstItem, indexOfLastItem);

	// stripe
	// .retrievePaymentIntent('{PAYMENT_INTENT_CLIENT_SECRET}')
	// .then(function(result) {
	//   // Handle result.error or result.paymentIntent
	// });

	// const stripe = useStripe();

	const totalPages = Math.ceil(participants.length / itemsPerPage);

	const handlePageChange = (newPage) => {
		if (newPage >= 1 && newPage <= totalPages) {
			setCurrentPage(newPage);
		}
	};

	const renderPageNumbers = () => {
		const pageNumbers = [];
		for (let i = 1; i <= totalPages; i++) {
			pageNumbers.push(
				<Button
					key={i}
					className={i === currentPage ? 'active' : ''}
					onClick={() => handlePageChange(i)}>
					{i}
				</Button>
			);
		}
		return pageNumbers;
	};

	return (
		<div style={{ width: '100%', marginBottom: '2rem' }}>
			<Table celled>
				<Table.Header>
					{/* Header cells */}
					<Table.Row>
						<Table.HeaderCell>Name</Table.HeaderCell>
						<Table.HeaderCell>Phone</Table.HeaderCell>
						<Table.HeaderCell>Category</Table.HeaderCell>
						<Table.HeaderCell>payment_status</Table.HeaderCell>
					</Table.Row>
				</Table.Header>
				<Table.Body>
					{/* Map over currentItems to render table rows */}
					{currentItems.map((part, index) => {
						return (
							<Table.Row>
								<Table.Cell>{part.name}</Table.Cell>
								<Table.Cell>{part.phone}</Table.Cell>
								<Table.Cell>{part.category}</Table.Cell>
								<Table.Cell>{part.payment_status}</Table.Cell>
							</Table.Row>
						);
					})}
				</Table.Body>
			</Table>
			{/* Pagination controls */}
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
	);
}

export default PaginatedTable;
