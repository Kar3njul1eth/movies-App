import PropTypes from 'prop-types';

export function SearchShows({ searchShow, handleSubmit, handleChange, error }) {

  return (
    <header>
      <h1>Explore now, TV Shows.</h1>
      <form className='form' onSubmit={handleSubmit}>
        <input onChange={handleChange} value={searchShow} name='query' placeholder='Search a TV Show' />
        <button type='submit'>Search</button>
      </form>
      {error && <p style={{color: 'red'}}>{error}</p>}
    </header>
  );
}

SearchShows.propTypes = {
  searchShow: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  error: PropTypes.string
};
