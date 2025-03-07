import Item from '../models/ItemModel.js';

export const getAllItems = async (req, res) => {
  const result = await Item.find().sort({ createdAt: -1 });
  res.status(200).json(result);
};
