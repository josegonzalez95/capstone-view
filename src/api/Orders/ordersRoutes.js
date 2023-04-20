//   functions that directly call orders endpoints
//   param req.body - body to be sent to the endpoint.
import axios from 'axios'
export const createOrder = async (orderBodySend) => {
    try {
        // console.log('from api call', signUpBodySend)
        const orderResponse = await axios.post(process.env.REACT_APP_API_URL + "/createOrder",
        orderBodySend,
            { headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "true" } },
        )
        const data = orderResponse.data
        console.log(data)
        return data
    } catch (error) {
        console.log(error)
    }
}