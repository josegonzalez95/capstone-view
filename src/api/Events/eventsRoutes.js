//   functions that directly call events endpoints
//   param  req.body - body to be sent to the endpoint.

import axios from 'axios'
export const createEvent = async (eventBodySend) => {
    try {
        console.log('from api call', eventBodySend)
        const eventResponse = await axios.post(process.env.REACT_APP_API_URL + "/createEvent",
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
        const queryResponse = await axios.post(process.env.REACT_APP_API_URL + "/participantsByEvent",
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
        const eventResponse = await axios.get(process.env.REACT_APP_API_URL + "/getAllEvents",
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
        const eventResponse = await axios.post(process.env.REACT_APP_API_URL + "/getEvent",
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
        const eventResponse = await axios.post(process.env.REACT_APP_API_URL + "/getEventsByPomoter",
        eventBodySend,
            { headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "true" } },
        )
        const data = eventResponse.data
        //console.log(data)
        return data
    } catch (error) {
        console.log(error)
    }
}
export const updateEvent = async (eventBodySend) => {
    try {
        console.log('from api call', eventBodySend)
        const eventResponse = await axios.post(process.env.REACT_APP_API_URL + "/updateEvent",
        eventBodySend,
            { headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "true" } },
        )
        const data = eventResponse.data
        //console.log(data)
        return data
    } catch (error) {
        console.log(error)
    }
}

export const deleteEvent = async (eventBodySend) => {
    try {
        console.log('from api call', eventBodySend)
        const eventResponse = await axios.post(process.env.REACT_APP_API_URL + "/deleteEvent",
        eventBodySend,
            { headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "true" } },
        )
        const data = eventResponse.data
        //console.log(data)
        return data
    } catch (error) {
        console.log(error)
    }
}
export const getEventsByDate = async (eventBodySend) => {
    try {
        // console.log('get all from api call')
        const eventResponse = await axios.post(process.env.REACT_APP_API_URL + "/getEventsByDate",
        eventBodySend,
            { headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "true" } },
        )
        const data = eventResponse.data
        //console.log(data)
        return data
    } catch (error) {
        console.log(error)
    }
}