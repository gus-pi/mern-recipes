import { useEffect, useState } from 'react';
import { Item } from '../../types/itemType';
import axios from 'axios';
import ItemCard from '../../components/ItemCard';
import CategoryWrapper from '../category/CategoryWrapper';

const Recipes = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true); // Start with loading true
  const [error, setError] = useState<string | null>(null);

  const fetchItems = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://mern-recipes-backend.vercel.app/api/items`
      );
      setItems(response.data);
    } catch (error: any) {
      setError(error.message || 'Error fetching data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  if (error) {
    return <p>Error: {error}</p>; // Display error message
  }

  return (
    <div className="px-6 lg:px-12 py-20">
      <h1 className="text-3xl mb-8 font-semibold text-secondary sm:text-5xl sm:leading-relaxed">
        All Recipes
      </h1>
      <CategoryWrapper />
      {loading && <p>Loading...</p>}
      <ul className="mt-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {items.length ? (
          items.map((item: Item) => (
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
export default Recipes;
