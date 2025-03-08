import axios from 'axios';
import { use, useEffect, useState } from 'react';
import { IoSearchOutline } from 'react-icons/io5';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { Item } from '../types/itemType';

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
        `http://localhost:5000/api/items/search`,
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
      <ul>
        {results &&
          results.map((item: Item) => <li key={item._id}>{item.name}</li>)}
      </ul>
    </div>
  );
};

export default Search;
