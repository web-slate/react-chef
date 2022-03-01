import { useState, useEffect } from 'react'
import axios from 'axios'

export default function useFetch(url) {
  const [response, setResponse] = useState(undefined)
  const [error, setError] = useState()
  const [loading, setLoading] = useState(false)

  useEffect(async () => {
    if (!url || url.trim() === '') return
    try {
      setLoading(true)
      const result = await axios.get(url)
      setResponse(result.data)
    } catch (err) {
      setError(err)
    } finally {
      setLoading(false)
    }
  }, [url])

  return { response, error, loading }
}