import { useState, useEffect } from 'react'
import axios, { AxiosError } from 'axios'

interface UseFetchResult<T> {
  response: T | undefined
  error: AxiosError | null
  loading: boolean
}

export default function useFetch<T = any>(url: string): UseFetchResult<T> {
  const [response, setResponse] = useState<T | undefined>(undefined)
  const [error, setError] = useState<AxiosError | null>(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!url || url.trim() === '') return

    const fetchData = async () => {
      try {
        setLoading(true)
        const result = await axios.get<T>(url)
        setResponse(result.data)
      } catch (err) {
        setError(err as AxiosError)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [url])

  return { response, error, loading }
}
