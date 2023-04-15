import axios from 'axios'
export const createEvent = async (eventBodySend) => {
    try {
        console.log('from api call', eventBodySend)
        const eventResponse = await axios.post(process.env.REACT_APP_API + "/createEvent",
        eventBodySend,
            { headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "true" } },
        )
        const data = eventResponse.data
        console.log(data)
        return data
    } catch (error) {
        console.log(error)
    }
}

export const getAllParticipantsByEvent=async(bodySend)=>{
    try {
        console.log('from api call', bodySend)
        const queryResponse = await axios.post(process.env.REACT_APP_API + "/participantsByEvent",
        bodySend,
            { headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "true" } },
        )
        const data = queryResponse.data
        console.log(data)
        return data
    } catch (error) {
        console.log(error)
    }
}

export const getAllEvents = async () => {
    try {
        // console.log('get all from api call')
        const eventResponse = await axios.get(process.env.REACT_APP_API + "/getAllEvents",
            { headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "true" } },
        )
        const data = eventResponse.data
        // console.log(data)
        return data
    } catch (error) {
        console.log(error)
    }
}

export const getEvent = async (eventBodySend) => {
    try {
        // console.log('get all from api call')
        const eventResponse = await axios.post(process.env.REACT_APP_API + "/getEvent",
        eventBodySend,
            { headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "true" } },
        )
        const data = eventResponse.data
        console.log(data)
        return data
    } catch (error) {
        console.log(error)
    }
}

export const getEventsByPromoter = async (eventBodySend) => {
    try {
        // console.log('get all from api call')
        const eventResponse = await axios.post(process.env.REACT_APP_API + "/getEventsByPomoter",
        eventBodySend,
            { headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "true" } },
        )
        const data = eventResponse.data
        console.log(data)
        return data
    } catch (error) {
        console.log(error)
    }
}
export const updateEvent = async (eventBodySend) => {
    try {
        console.log('from api call', eventBodySend)
        const eventResponse = await axios.post(process.env.REACT_APP_API + "/updateEvent",
        eventBodySend,
            { headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "true" } },
        )
        const data = eventResponse.data
        console.log(data)
        return data
    } catch (error) {
        console.log(error)
    }
}

export const deleteEvent = async (eventBodySend) => {
    try {
        console.log('from api call', eventBodySend)
        const eventResponse = await axios.post(process.env.REACT_APP_API + "/deleteEvent",
        eventBodySend,
            { headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "true" } },
        )
        const data = eventResponse.data
        console.log(data)
        return data
    } catch (error) {
        console.log(error)
    }
}