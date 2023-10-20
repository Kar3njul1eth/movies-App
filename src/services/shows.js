const api_key = '5fc41d49762ed9707b7561ea86e7b21d'

export const searchShows =  async ({ searchShow }) => {
  if (searchShow === '') return null

  try {
    const response = await fetch(`https://api.themoviedb.org/3/trending/tv/week?api_key=${api_key}&query=${searchShow}`)
    const json = await response.json()

    const show = json.results

    return show?.map(show => ({
      id: show.id,
      name: show.name,
      poster: show.poster_path,
      overview: show.overview,
      date: show.first_air_date
    }))
  } catch (e) {
    throw new Error('Error searching TV shows')
  }
}