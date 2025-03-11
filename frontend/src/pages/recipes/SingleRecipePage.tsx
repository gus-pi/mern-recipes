import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Item } from '../../types/itemType';
import axios from 'axios';

const SingleRecipePage = () => {
  const { id } = useParams();
  const [item, setItem] = useState<Item>();
  const [loading, setLoading] = useState(true); // Start with loading true
  const [error, setError] = useState<string | null>(null);

  const fetchRecipeData = async () => {
    setLoading(true);
    setError(null); // Clear any previous errors
    try {
      const response = await axios.get(`http://localhost:5000/api/items/${id}`);
      setItem(response.data);
    } catch (err: any) {
      setError(err.message || 'Error loading recipe');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecipeData();
  }, [id]);

  if (loading) {
    return <p>Loading...</p>; // Display loading message
  }

  if (error) {
    return <p>Error: {error}</p>; // Display error message
  }

  if (!item) {
    return <p>Recipe not found.</p>; // Handle case where item is still null
  }
  const extractNumber = (timeString: string) => {
    let TimeArray = timeString.split(' ');
    return parseInt(TimeArray[0]);
  };

  const prepTime = extractNumber(item.more?.prep_time);
  const cookTime = extractNumber(item.more?.cook_time);

  return (
    <section className="min-h-dvh md:flex justify-center items-center md:bg-stone-50">
      <article>
        <div className="bg-white md:my-[5rem] md:py-8 md:rounded-xl">
          <picture>
            <img
              src={item.thumbnail_image}
              alt={item.name}
              className="md-max-w-[90%] w-full md:h-[570px] md:rounded-xl md:md:mx-auto"
            />
          </picture>
          <div className="px-8">
            <h1 className="text-4xl mt-12 text-secondary ">{item.name}</h1>
            <article className="bg-rose-50 mt-6 p-5 rounded-xl">
              <h3 className="text-xl font-semibold ml-2">Preparation time</h3>
              <ul className="list-disc mt-3 ml-8 text-lg marker:text-orange-500">
                <li className="pl-3">
                  <p>
                    <span>Total: </span>
                    <span>{prepTime + cookTime} minutes</span>
                  </p>
                </li>
                <li className="pl-3 mt-3">
                  <p>
                    <span>Preparation: </span>
                    <span>{prepTime} minutes</span>
                  </p>
                </li>
                <li className="pl-3 mt-3">
                  <p>
                    <span>Cooking: </span> <span>{cookTime} minutes</span>
                  </p>
                </li>
              </ul>
            </article>
            <div className="mt-5">
              <h3 className="text-xl font-semibold ml-2">Ingredients</h3>
              <ul className="list-disc marker:text-blue-500 mt-4 ml-6 text-secondary marker:align-middle">
                {item.ingredients.map((ingredient, index) => (
                  <li key={index} className="pl-4 mt-2">
                    <span>{ingredient?.name}: </span>
                    <span>{ingredient?.quantity}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </article>
    </section>
  );
};

export default SingleRecipePage;
