import "../index.css";

export default function Numresults({movies}) {
  return (
    <p className='num-results'>
      Found <strong>{movies.length}</strong> results
    </p>
  );
}