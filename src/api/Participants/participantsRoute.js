import axios from 'axios'
export const createParticipant = async (participantBodySend) => {
    try {
        // console.log('from api call', signUpBodySend)
        const participantResponse = await axios.post("http://localhost:3333" + "/createParticipant",
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
        const participantResponse = await axios.post("http://localhost:3333" + "/numberOfParticipants",
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