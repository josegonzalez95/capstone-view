//   functions that directly call promoters endpoints
//   @param req.body - body to be sent to the endpoint.

import axios from 'axios'
export const signUp = async (signUpBodySend) => {
    try {
        // console.log('from api call', signUpBodySend)
        const signUpResponse = await axios.post(process.env.REACT_APP_API_URL + "/createPromoter",
        signUpBodySend,
            { headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "true" } },
        )
        const data = signUpResponse.data
        console.log(data)
        return data
    } catch (error) {
        console.log(error)
    }
}

export const logIn = async (logInBodySend) => {
    try {
        console.log('from api call', logInBodySend)
        const logInResponse = await axios.post(process.env.REACT_APP_API_URL + "/logInPromoter",
        logInBodySend,
            { headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "true" } },
        )
        const data = logInResponse.data
        // console.log(data)
        return data
    } catch (error) {
        console.log(error)
    }
}

export const getPromoterById = async (promoterBodySend)=>{
    try {
        console.log('from api call', promoterBodySend)
        const promoterResponse = await axios.post(process.env.REACT_APP_API_URL + "/getPromoter",
        promoterBodySend,
            { headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "true" } },
        )
        const data = promoterResponse.data
        console.log(data)
        return data
    } catch (error) {
        console.log(error)
    }
}

export const updatePromoter = async (promoterBodySend)=>{
    try {
        console.log('from api call', promoterBodySend)
        const promoterResponse = await axios.post(process.env.REACT_APP_API_URL + "/updatePromoter",
        promoterBodySend,
            { headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "true" } },
        )
        const data = promoterResponse.data
        console.log(data)
        return data
    } catch (error) {
        console.log(error)
    }
}