const api_key = '5fc41d49762ed9707b7561ea86e7b21d'

export const searchMovies =  async ({ search }) => {
  if (search === '') return null

  try {
    const response = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${api_key}&query=${search}`)
    const json = await response.json()

    const movies = json.results

    return movies?.map(movie => ({
      id: movie.id,
      title: movie.original_title,
      poster: movie.poster_path,
      synopsis: movie.overview,
      genre: movie.genre_ids,
      release: movie.release_date
    }))
  } catch (e) {
    throw new Error('Error searching movies')
  }
}