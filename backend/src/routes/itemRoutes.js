import express from 'express';
import {
  getAllItems,
  getSearchedItems,
} from '../controllers/itemController.js';

const router = express.Router();

router.get('/', getAllItems);
router.get('/search', getSearchedItems);

export default router;
