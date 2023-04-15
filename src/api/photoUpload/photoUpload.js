import axios from 'axios'
export const uploadPhoto = async (file) => {
    let formData = new FormData()
    formData.append("file", file)
    try {
        console.log('from api call', formData)
        const uploadResponse = await axios.post(process.env.REACT_APP_API + "/uploads",
        formData,
            { headers: { 'Content-Type': 'multipart/form-data', "Access-Control-Allow-Origin": "true" } },
        )
        const data = uploadResponse.data
        console.log(data)
        return data
    } catch (error) {
        console.log(error)
    }
}