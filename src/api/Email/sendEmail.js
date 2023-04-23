import axios from "axios"
export const sendEmail = async (emailBodySend) => {
    
    try {
        // console.log('get all from api call')
        const eventResponse = await axios.post("https://api.emailjs.com/api/v1.0/email/send",
        emailBodySend,
            { headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "true" } },
        )
        const data = eventResponse.data
        console.log(data)
        return data
    } catch (error) {
        console.log(error)
    }
}