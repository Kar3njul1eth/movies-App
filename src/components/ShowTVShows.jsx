import { useState } from 'react';

function ListOfShows ({ shows }) {
  return (
    <ul className="movies">
        {shows.map(show => (
          <li className="movie" key={show.id}>
            <h3 className="title-movie">{show.name}</h3>
            {show.poster ? (
              <img
                src={`https://image.tmdb.org/t/p/w300_and_h450_bestv2${show.poster}`}
                alt={show.name}
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
            <p className="title-movie">{show.date}</p>
          </li>
        ))}
    </ul>
  )
}

function NoShowsResults () {
  return (
    <p>No results</p>
  )
}

export function ShowTVShows ({ shows }) {

  const hasShows = shows?.length > 0
   return (
      <>
      {hasShows ? (
        <ListOfShows shows={shows} />
      ) : (
        <NoShowsResults />
      )}
    </>
   )
}