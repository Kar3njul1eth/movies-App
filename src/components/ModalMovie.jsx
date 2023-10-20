export function ModalMovie({ movie, onClose }) {
  return (
    <div className="modal">
      <button className="modal-close" onClick={onClose}>
        x
      </button>
      <h2>{movie.title}</h2>
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
         <p>{movie.release}</p>
        <p>{movie.synopsis}</p>
    </div>
  );
}
