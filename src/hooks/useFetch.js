import { useEffect, useState } from "react";

const useFetch = (url, body) => {
    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(()=>{
        const fetchData = async()=>{
            try {
                let res = {}
                if(body){
                    res = await fetch(url, {
                        method: 'POST',
                        body:JSON.stringify(body),
                        // headers: {
                        //     "Content-Type": "application/json",
                        // },
                        headers: { 
                            "Authorization": `${sessionStorage.getItem("jwtToken")}` ,
                            "Content-Type": "application/json", 
                            "Access-Control-Allow-Origin": "true",
                            // "x-auth-token": `${sessionStorage.getItem("jwtToken")}`
                         }
                    });
                }else{
                    res = await fetch(url)
                }
                const json = await res.json()
                setData(json)
            } catch (error) {
                setError(error)
            } finally {
                setLoading(false)
            }
        }
        fetchData()
    }, [url])
    return {data, loading, error}
}

export default useFetch