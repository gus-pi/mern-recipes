import mongoose from 'mongoose';
const { Schema } = mongoose;

const CategorySchema = new Schema({
  name: String,
  menuId: Number,
});

const Category = mongoose.model('Category', CategorySchema);

export default Category;
