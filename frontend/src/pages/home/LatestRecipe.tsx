import { useEffect, useState } from 'react';
import { Item } from '../../types/itemType';
import axios from 'axios';
import ItemCard from '../../components/ItemCard';
import { Link } from 'react-router-dom';

const LatestRecipe = () => {
  const [items, setItems] = useState<Item[]>([]);

  const getLatestItems = async () => {
    const response = await axios.get(
      `https://mern-recipes-backend.vercel.app/api/items`
    );
    setItems(response.data);
  };
  useEffect(() => {
    getLatestItems();
  }, []);

  return (
    <div className="px-5 xl:px-10 py-16">
      <h2 className="text-3xl mb-8 font-semibold text-secondary sm:text-5xl sm:leading-relaxed">
        Latest Recipes
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {items.length ? (
          items
            .slice(0, 4)
            .map((item: Item) => <ItemCard key={item._id} item={item} />)
        ) : (
          <p>No recipes to show</p>
        )}
      </div>

      <div className="sm:w-64 mx-auto mt-16">
        <Link to={'/recipes'}>
          <button className="py-4 px-8 bg-[#9c702a] text-white hover:text-gray-600 w-full transition ease-in duration-200 text-center text-base font-semibold border border-[#9c702a] focus:outline-none rounded-lg">
            View All Recipes
          </button>
        </Link>
      </div>
    </div>
  );
};

export default LatestRecipe;
