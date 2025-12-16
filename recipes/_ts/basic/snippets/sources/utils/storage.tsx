const noop = () => ''

export const storageAPI = (type = 'local') => {
  if (typeof window !== 'undefined') {
    if (type === 'local') {
      return window.localStorage
    }

    return window.sessionStorage
  }

  return {
    getItem: noop,
    setItem: noop,
    removeItem: noop,
    clear: noop,
  }
}