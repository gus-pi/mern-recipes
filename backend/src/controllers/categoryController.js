import Category from '../models/categoryModel.js';
import Item from '../models/ItemModel.js';

export const getAllCategories = async (req, res) => {
  const result = await Category.find();
  res.status(200).json(result);
};

export const getCategory = async (req, res) => {
  const { category } = req.params;
  try {
    const categoryData = await Category.findOne({ name: category });
    if (!categoryData) {
      return res.status(404).json({ message: 'No Category Found' });
    }
    const items = await Item.find({ menuId: categoryData.menuId });
    res.status(200).json(items);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching category' });
  }
};
