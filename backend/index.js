import itemRoutes from './src/routes/itemRoutes.js';
import categoryRoutes from './src/routes/categoryRoutes.js';
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

async function main() {
  await mongoose.connect(process.env.MONGO_URL);

  app.get('/', (req, res) => {
    res.send('Veggify Recipe App Server is running!');
  });
}

main()
  .then(() => console.log('mongodb connected successfully'))
  .catch((err) => console.log(err));

//routes
app.use('/api/items', itemRoutes);
app.use('/api/categories', categoryRoutes);

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
