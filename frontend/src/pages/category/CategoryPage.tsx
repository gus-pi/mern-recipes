import { useParams } from 'react-router-dom';
import CategoryWrapper from './CategoryWrapper';
import { useEffect, useState } from 'react';
import { Item } from '../../types/itemType';
import axios from 'axios';

const CategoryPage = () => {
  const { category } = useParams();
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchCategoryData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `http://localhost:5000/api/categories/${category}`
      );
      setItems(response.data);
    } catch (error: any) {
      setError(error.message || 'Error loading categories');
    }
  };

  useEffect(() => {
    fetchCategoryData();
  }, [category]);

  return (
    <div className="px-6 lg:px-12 py-20">
      <h1 className="text-center text-3xl py-10 font-semibold text-secondary sm:text-6xl sm:leading-relaxed capitalize">
        {category}
      </h1>
      <CategoryWrapper />
      <ul>
        {items &&
          items.map((item: Item) => <li key={item._id}>{item.name}</li>)}
      </ul>
    </div>
  );
};
export default CategoryPage;
