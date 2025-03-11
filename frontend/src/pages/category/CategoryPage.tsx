import { useParams } from 'react-router-dom';
import CategoryWrapper from './CategoryWrapper';
import { useEffect, useState } from 'react';
import { Item } from '../../types/itemType';
import axios from 'axios';
import ItemCard from '../../components/ItemCard';

const CategoryPage = () => {
  const { category } = useParams();
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchCategoryData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://mern-recipes-backend.vercel.app/api/categories/${category}`
      );
      setItems(response.data);
    } catch (error: any) {
      setError(error.message || 'Error loading categories');
    }
  };

  if (error) {
    return <p>Error: {error}</p>; // Display error message
  }

  useEffect(() => {
    fetchCategoryData();
  }, [category]);

  return (
    <div className="px-6 lg:px-12 py-20">
      <h1 className="text-center text-3xl py-10 font-semibold text-secondary sm:text-6xl sm:leading-relaxed capitalize">
        {category}
      </h1>
      <CategoryWrapper />
      {loading && <p>Loading...</p>}
      <ul className="mt-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {items &&
          items.map((item: Item) => (
            <li key={item._id}>
              <ItemCard item={item} key={item._id} />
            </li>
          ))}
      </ul>
    </div>
  );
};
export default CategoryPage;
