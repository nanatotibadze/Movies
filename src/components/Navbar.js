import "../index.css";
import Search from "./Search";
import Logo from "./Logo";
import Numresults from "./Numresults";

export default function Navbar({query, movies, setQuery}) {
  return (
    <nav className='nav-bar'>
      <Logo />
      <Search value={query} onChange={(e) => setQuery(e.target.value)} setQuery={setQuery} />
      <Numresults movies={movies} />
    </nav>
  );
}
