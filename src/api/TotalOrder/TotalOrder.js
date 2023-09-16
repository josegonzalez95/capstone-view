//   functions that directly call promoters endpoints
//   @param req.body - body to be sent to the endpoint.

import axios from 'axios'
export const createTotalOrder = async (totalOrderBodySend) => {
    try {
        // console.log('from api call', signUpBodySend)
        const totalOrderResponse = await axios.post(process.env.REACT_APP_API_URL + "/totalOrderCreate",
        totalOrderBodySend,
            { headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "true" } },
        )
        const data = totalOrderResponse.data
        console.log(data)
        return data
    } catch (error) {
        console.log(error)
    }
}