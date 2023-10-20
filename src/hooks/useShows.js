import { useRef, useState, useMemo, useCallback } from 'react'
import { searchShows } from '../services/shows.js'

export function useShows ({ searchShow, sort }) {
  const [shows, setShows] = useState([])
  const [loading, setLoading] = useState(false)
  const [,setError] = useState(null)
  const previousSearch = useRef(searchShow)

  const getShows = useCallback(async ({ searchShow }) => {
    if (searchShow === previousSearch.current) return

    try {
      setLoading(true)
      setError(null)
      previousSearch.current = searchShow
      const newShows = await searchShows({ searchShow })
      setShows(newShows)
    } catch (e) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }, [])

  const sortedShows = useMemo(() => {
    return sort
      ? [...shows].sort((a, b) => a.date.localeCompare(b.date))
      : shows
  }, [sort, shows])
  return { shows:sortedShows, getShows, loading }
}
