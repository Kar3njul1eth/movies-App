import './App.css'
import { useMovies } from './hooks/useMovies.js'
import { useShows } from './hooks/useShows'
import { ShowTVShows } from './components/ShowTVShows'
import { SelectionMenu } from './components/SelectionMenu.jsx'
import { ShowMovies } from  './components/ShowMovies.jsx'
import { SearchMovies } from  './components/SearchMovies.jsx'
import { useEffect, useState, useRef, useCallback } from 'react'
import debounce from 'just-debounce-it'
import { SearchShows } from './components/SearchShows'

function useSearch () {
  const [search, updateSearch,] = useState('')
  const [error, setError] = useState(null)
  const isFirstInput = useRef(true)

  useEffect (() => {
    if(isFirstInput.current){
      isFirstInput.current = search === ''
      return
    }
    if(search === '') {
      setError('Enter a movie for your search')
      return
    }

    if(search.match(/^\d+$/)) {
      setError('Cant search for a movie with a number')
      return
    }

    setError(null)
  }, [search])

  return { search, updateSearch, error }
}

function useSearchShow () {
  const [searchShow, updateSearchShow] = useState('')
  const [error, setError] = useState(null)
  const isFirstInput = useRef(true)

  useEffect (() => {
    if(isFirstInput.current){
      isFirstInput.current = searchShow === ''
      return
    }
    if(searchShow === '') {
      setError('Enter a movie for your searchShow')
      return
    }

    if(searchShow.match(/^\d+$/)) {
      setError('Cant searchShow for a movie with a number')
      return
    }

    setError(null)
  }, [searchShow])

  return { searchShow, updateSearchShow, error }
}
function App() {
  const [ sort, setSort   ] = useState(false)
  const [selectedOption, setSelectedOption] = useState(null);
  const { search, updateSearch, error } = useSearch()
  const { searchShow, updateSearchShow } = useSearchShow()
  const { movies, loading: moviesLoading, getMovies } = useMovies({ search })
  const { shows, loading: showsLoading, getShows } = useShows({ searchShow, sort })


  const debouncedGetMovies = useCallback(
    debounce((search) => {
      getMovies({ search })
    }, 300),
    [getMovies]
  )

  const debouncedGetShows = useCallback(
    debounce((searchShow) => {
      getShows({ searchShow })
    }, 300),
    [getShows]
  )

  const handleSelect = (option) => {
    setSelectedOption(option);
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    getMovies({ search })
  }

  const handleSubmitShows = (event) => {
    event.preventDefault()
    getShows({ searchShow })
  }

  const handleSort = () => {
    setSort(!sort)
  }

  const handleChange = (event) => {
    const newSearch = event.target.value
    updateSearch(newSearch)
    debouncedGetMovies(newSearch)
  }
  const handleChangeShows = (event) => {
    const newSearch = event.target.value
    updateSearchShow(newSearch)
    debouncedGetShows(newSearch)
  }

  return (
    <div className='page'>

      <header>
        <SelectionMenu onSelect={handleSelect} />
        {selectedOption === 'movies' && (
          <SearchMovies search={search} handleSubmit={handleSubmit} handleChange={handleChange} error={error} />
        )}
        {selectedOption === 'tvShows' && (
          <>
            <SearchShows
              searchShow={searchShow}
              handleSubmit={handleSubmitShows}
              handleChange={handleChangeShows}
              error={error}
            />
            <label>
              Order By Date
              <input type='checkbox' onChange={handleSort} checked={sort} />
            </label>
          </>
        )}
      </header>

      <main>
        {selectedOption === 'movies' && (
          moviesLoading ? <p>Loading</p> : <ShowMovies movies={movies} />
        )}
        {selectedOption === 'tvShows' && (
          showsLoading ? <p>Loading</p> : <ShowTVShows shows={shows} />
        )}
      </main>
    </div>
  )
}

export default App
