import Item from '../models/ItemModel.js';

export const getAllItems = async (req, res) => {
  const result = await Item.find().sort({ createdAt: -1 });
  res.status(200).json(result);
};

export const getSearchedItems = async (req, res) => {
  const { query } = req.query;
  try {
    let items;
    if (query) {
      items = await Item.find({ name: { $regex: query, $options: 'i' } }); //mongodb query, i for case insensitive
    } else items = await Item.find().sort({ createdAt: -1 });

    res.status(200).json(items);
  } catch (error) {
    res.status(500).json({ message: 'Error searching items' });
  }
};
