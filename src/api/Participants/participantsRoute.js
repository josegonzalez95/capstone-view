//   functions that directly call participants endpoints
//   param  req.body - body to be sent to the endpoint.

import axios from 'axios'
export const createParticipant = async (participantBodySend) => {
    try {
        // console.log('from api call', signUpBodySend)
        const participantResponse = await axios.post(process.env.REACT_APP_API_URL + "/createParticipant",
        participantBodySend,
            { headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "true" } },
        )
        const data = participantResponse.data
        console.log(data)
        return data
    } catch (error) {
        console.log(error)
    }

    
}
export const numberOfParticipants = async (participantBodySend) => {
    try {
        // console.log('from api call', signUpBodySend)
        const participantResponse = await axios.post(process.env.REACT_APP_API_URL + "/numberOfParticipants",
        participantBodySend,
            { headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "true" } },
        )
        const data = participantResponse.data
        console.log(data)
        return data
    } catch (error) {
        console.log(error)
    }

    
}