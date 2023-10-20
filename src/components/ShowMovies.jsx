import { useState } from 'react';
import { ModalMovie } from '../components/ModalMovie.jsx'
import PropTypes from 'prop-types';

function ListOfMovies ({ movies, onMovieClick }) {
  return (
    <ul className="movies">
        {movies.map(movie => (
          <li className="movie" key={movie.id} onClick={() => onMovieClick(movie)}>
            {movie.poster ? (
              <img
                src={`https://image.tmdb.org/t/p/w300_and_h450_bestv2${movie.poster}`}
                alt={movie.title}
              />
            ) : (
              <div className="image-no-available">
                <img
                  className=''
                  src="https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-38-picture-grey-c2ebdbb057f2a7614185931650f8cee23fa137b93812ccb132b9df511df1cfac.svg"
                  alt="image not available"
                  width="240"
                  height="360"
                />
              </div>
            )}
            <h3 className="title-movie">{movie.title}</h3>
          </li>
        ))}
    </ul>
  )
}

ListOfMovies.propTypes = {
  movies: PropTypes.array.isRequired,
  onMovieClick: PropTypes.func.isRequired
};

ShowMovies.propTypes = {
  movies: PropTypes.array.isRequired
};

function NoMoviesResults () {
  return (
    <p>No results</p>
  )
}

export function ShowMovies ({ movies }) {
  const [selectedMovie, setSelectedMovie] = useState(null)

  const handleMovieClick = (movie) => {
    setSelectedMovie(movie)
  };

  const handleCloseModal = () => {
    setSelectedMovie(null)
  }

  const hasMovies = movies?.length > 0
   return (
      <>
      {hasMovies ? (
        <ListOfMovies movies={movies} onMovieClick={handleMovieClick} />
      ) : (
        <NoMoviesResults />
      )}

      {selectedMovie && (
        <ModalMovie movie={selectedMovie} onClose={handleCloseModal} />
      )}
    </>
   )
}