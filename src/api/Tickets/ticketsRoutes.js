//   param  req.body - body to be sent to the endpoint.

import axios from 'axios'
export const createTicket = async (ticketBodySend) => {
    try {
        // console.log('from api call', signUpBodySend)
        const ticketResponse = await axios.post(process.env.REACT_APP_API_URL + "/createTicket",
        ticketBodySend,
            { headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "true" } },
        )
        const data = ticketResponse.data
        console.log(data)
        return data
    } catch (error) {
        console.log(error)
    }
}