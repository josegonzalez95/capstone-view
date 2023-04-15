import axios from 'axios'
export const createTicket = async (ticketBodySend) => {
    try {
        // console.log('from api call', signUpBodySend)
        const ticketResponse = await axios.post("http://localhost:3333" + "/createTicket",
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