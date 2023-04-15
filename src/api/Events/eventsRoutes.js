import axios from 'axios'
export const createEvent = async (eventBodySend) => {
    try {
        console.log('from api call', eventBodySend)
        const eventResponse = await axios.post("http://localhost:3333" + "/createEvent",
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
        const queryResponse = await axios.post("http://localhost:3333" + "/participantsByEvent",
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
        const eventResponse = await axios.get("http://localhost:3333" + "/getAllEvents",
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
        const eventResponse = await axios.post("http://localhost:3333" + "/getEvent",
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
        const eventResponse = await axios.post("http://localhost:3333" + "/getEventsByPomoter",
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
        const eventResponse = await axios.post("http://localhost:3333" + "/updateEvent",
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
        const eventResponse = await axios.post("http://localhost:3333" + "/deleteEvent",
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