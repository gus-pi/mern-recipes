import axios from 'axios';
import { use, useEffect, useState } from 'react';
import { IoSearchOutline } from 'react-icons/io5';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { Item } from '../types/itemType';
import ItemCard from '../components/ItemCard';

const Search = () => {
  const [query, setQuery] = useState('');
  const [inputQuery, setInputQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const queryParams = params.get('query');
    if (queryParams) {
      setQuery(queryParams);
    }
  }, [location.search]);

  const fetchItems = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://mern-recipes-backend.vercel.app/api/items/search`,
        {
          params: { query: query },
        }
      );
      setResults(response.data);
    } catch (error: any) {
      setError(error.message || 'Error fetching data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, [query]);

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent page reload
    setQuery(inputQuery);
    navigate(`/search?query=${inputQuery}`); // Update URL
  };

  return (
    <div className="px-6 lg:px-12 py-20">
      <h1 className="text-center text-3xl py-10 font-semibold text-secondary sm:text-6xl sm:leading-relaxed">
        Search
      </h1>
      <form
        onSubmit={handleSearch}
        className="bg-white p-4 rounded relative flex items-center"
      >
        <IoSearchOutline className="w-5 h-5 mr-2 text-neutral-300" />
        <input
          className="outline-none w-full placeholder:text-[#1b2629]"
          name="query"
          type="search"
          placeholder="Search for a recipe"
          id="search"
          onChange={(e) => setInputQuery(e.target.value)}
        />
        <button
          type="submit"
          className="ml-2 px-4 py-2 bg-red-300 text-white rounded cursor-pointer"
        >
          Search
        </button>
      </form>
      {loading && <div>Loading...</div>}
      {error && <div>Error fetching data</div>}

      <ul className="mt-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {results.length ? (
          results.map((item: Item) => (
            <li key={item._id}>
              <ItemCard item={item} />
            </li>
          ))
        ) : (
          <span>No results</span>
        )}
      </ul>
    </div>
  );
};

export default Search;
