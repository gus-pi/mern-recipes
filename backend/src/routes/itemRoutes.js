import express from 'express';
import {
  getAllItems,
  getSearchedItems,
  getSingleItem,
} from '../controllers/itemController.js';

const router = express.Router();

router.get('/', getAllItems);
router.get('/search', getSearchedItems);
router.get('/:id', getSingleItem);

export default router;
