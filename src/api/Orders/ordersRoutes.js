import axios from 'axios'
export const createOrder = async (orderBodySend) => {
    try {
        // console.log('from api call', signUpBodySend)
        const orderResponse = await axios.post("http://localhost:3333" + "/createOrder",
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