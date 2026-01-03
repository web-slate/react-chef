import { useState } from 'react'
import axios, { AxiosError } from 'axios'

interface UsePostResult<T, P> {
  response: T | undefined
  error: AxiosError | null
  loading: boolean
  [key: string]: any
}

export default function usePost<T = any, P = any>(
  url: string,
  methodName: string = 'sendPostData'
): UsePostResult<T, P> {
  const [response, setResponse] = useState<T | undefined>(undefined)
  const [error, setError] = useState<AxiosError | null>(null)
  const [loading, setLoading] = useState(false)

  const postData = async (payload: P) => {
    if (!url || url.trim() === '') return
    try {
      setLoading(true)
      const result = await axios.post<T>(url, payload)
      setResponse(result.data)
    } catch (err) {
      setError(err as AxiosError)
    } finally {
      setLoading(false)
    }
  }

  return { response, error, loading, [methodName]: postData }
}
