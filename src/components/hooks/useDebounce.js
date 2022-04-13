import { useEffect, useState } from 'react'

export const useDebounce = (value, ms = 0) => {
  const [debouncedState, setDebouncedState] = useState(value)

  useEffect(() => {
    
    const symbol = setTimeout(() => {
      setDebouncedState(value) 
    }, ms);
    
    return () => clearTimeout(symbol)
  }, [value, ms])
  
  return debouncedState
}
