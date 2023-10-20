import PropTypes from 'prop-types';

export function SearchMovies({ search, handleSubmit, handleChange, error }) {

  return (
    <header>
      <h1>Explore now, millions of movies.</h1>
      <form className='form' onSubmit={handleSubmit}>
        <input onChange={handleChange} value={search} name='query' placeholder='Futurama, Matrix...' />
        <button type='submit'>Search</button>
      </form>
      {error && <p style={{color: 'red'}}>{error}</p>}
    </header>
  );
}

SearchMovies.propTypes = {
  search: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  error: PropTypes.string
};
