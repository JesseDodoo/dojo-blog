import { useState, useEffect } from "react";


const useFetch = (url) => {
    const [data, setData] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(()=> {
        const AbortCont = new AbortController();

        fetch(url, {signal: AbortCont.signal})
        .then(res => {
            if(!res.ok){
                throw Error('could not find the data for that resource');
            }
           return res.json();
        })
        .then(data => {
            setData(data)
            setIsLoading(false)
            setError(null)
        })
        // Handling Errors
        .catch(err => {
            if(err.name === 'AbortError'){
                console.log('fetch aborted')
            } else {    
                setIsLoading(false)
            setError(err.message)
            }
            
        })
        return () => AbortCont.abort()
    }, [url]);

    

    return { data, isLoading, error }
}

export default useFetch;