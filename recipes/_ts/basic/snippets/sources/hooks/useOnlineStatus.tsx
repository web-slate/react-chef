import { useState, useEffect } from 'react'

function useOnlineStatus(): boolean {
  const [online, setOnline] = useState<boolean>(window.navigator.onLine)

  useEffect(() => {
    function handleOnline() {
      setOnline(true)
    }
    function handleOffline() {
      setOnline(false)
    }

    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)

    return () => {
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)
    }
  }, [])

  return online
}

export default useOnlineStatus
