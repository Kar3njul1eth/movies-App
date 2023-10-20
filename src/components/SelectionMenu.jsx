export function SelectionMenu({ onSelect }) {
  const handleSelect = (option) => {
    onSelect(option);
  };

  return (
    <div className='container-option'>
      <button onClick={() => handleSelect('movies')}>Search Movies</button>
      <button onClick={() => handleSelect('tvShows')}>Search TV Shows</button>
    </div>
  );
}
