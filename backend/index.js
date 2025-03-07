import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

async function main() {
  await mongoose.connect(process.env.MONGO_URL);

  app.get('/', (req, res) => {
    res.send('Veggify Recipe App Server is running!');
  });
}

main()
  .then(() => console.log('mongodb connected successfully'))
  .catch((err) => console.log(err));

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
