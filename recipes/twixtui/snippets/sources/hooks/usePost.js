import { useState } from 'react'
import axios from 'axios'

export default function usePost(url, methodName = 'sendPostData'){
    
  const [response, setResponse] = useState(undefined)
  const [error, setError] = useState()
  const [loading, setLoading] = useState(false)

 const postData = async (payload) => {
      if (!url || url.trim() === '') return
      try {
        setLoading(true)
        const result = await axios.post(url, payload)
        setResponse(result.data)
      } catch (err) {
        setError(err)
      } finally {
        setLoading(false)
      }
  }
  
  return { response, error, loading, [methodName]:postData }
}