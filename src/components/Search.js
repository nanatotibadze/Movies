import "../index.css";

export default function Search({value, onChange}) {
  return (
    <input
      className='search'
      type='text'
      placeholder='Search movies...'
      value={value}
      onChange={onChange}
    />
  );
}
