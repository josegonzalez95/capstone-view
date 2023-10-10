import React, { useEffect, useState } from 'react'
import useFetch from '../../hooks/useFetch'
import { useParams, useNavigate } from 'react-router-dom'
import { Table, Button } from 'semantic-ui-react';


const Orders = () => {
    const {eventId} = useParams()
    const { data, error, loading } = useFetch(`${process.env.REACT_APP_API_URL}/search-payments`, {eventId: Number(eventId)})
    // const [loading, setLoading] = useState(true)
    const navigate = useNavigate()
    const [orders, setOrders] = useState([])
    const itemsPerPage = 10;
    const [currentPage, setCurrentPage] = useState(1);
  
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = !loading ? data.paymentIntent.data.slice(indexOfFirstItem, indexOfLastItem):[];
  
    const totalPages = Math.ceil(orders.length / itemsPerPage);
  
    const handlePageChange = (newPage) => {
      if (newPage >= 1 && newPage <= totalPages) {
        setCurrentPage(newPage);
      }
    };
    // console.log(data.paymentIntent.data)
    const getOrderDates = async () => {
      
    };
    

    if(loading && orders.length ===0){
      getOrderDates()
    }

  return (
    <div style={{display:"flex", alignItems:"center", flexDirection:'column'}}>
      {loading ? <p>Loading orders...</p>:
        <div style={{width: "50%", marginBottom: "2rem"}}>
             {console.log(data.paymentIntent.data)}
        <h1>Orders</h1>
        <Table celled selectable>
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
          {currentItems.map((order, index)=>{
            return(
            <Table.Row onClick={()=>{navigate(`/event/${eventId}/orders/${order.metadata.order_id}/${order.id}`, {state:{order: order}})}}>
                <Table.Cell>{order.id}</Table.Cell>
                <Table.Cell>{order.metadata.order_id}</Table.Cell>
                <Table.Cell>{new Date(order.created*1000).toLocaleString('default', { month: 'long', day: '2-digit', year: 'numeric' })}</Table.Cell>
                <Table.Cell>${order.amount/100}</Table.Cell>
                <Table.Cell>{order.status}</Table.Cell>
          </Table.Row>)
          })}
        </Table.Body>
        </Table>
        <div className="pagination">
                <Button
                  disabled={currentPage === 1}
                  onClick={() => handlePageChange(currentPage - 1)}
                >
                  Previous
                </Button>
                
                <Button.Group>
                  
                    {currentPage!==1 && <Button
                    disabled={currentPage === 1}
                    onClick={() => handlePageChange(1)}
                  >1
                  </Button>}
                    
                  {currentPage > 3 && <Button disabled>...</Button>}
                  {currentPage > 2 && (
                    <Button onClick={() => handlePageChange(currentPage - 1)}>
                      {currentPage - 1}
                    </Button>
                  )}
                  <Button className="active">{currentPage}</Button>
                  {currentPage < totalPages - 1 && (
                    <Button onClick={() => handlePageChange(currentPage + 1)}>
                      {currentPage + 1}
                    </Button>
                  )}
                  {currentPage < totalPages - 2 && <Button disabled>...</Button>}
                {currentPage !== totalPages&& <Button
                    disabled={currentPage === totalPages}
                    onClick={() => handlePageChange(totalPages)}
                  >
                    {totalPages}
                  </Button>}
                </Button.Group>
                
                <Button
                  disabled={currentPage === totalPages}
                  onClick={() => handlePageChange(currentPage + 1)}
                >
                  Next
                </Button>
              </div>
        </div>

        //   )
        // })}</div>
      }
    </div>
  )
}

export default Orders