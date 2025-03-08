import express from 'express';
import {
  getAllCategories,
  getCategory,
} from '../controllers/categoryController.js';

const router = express.Router();

router.get('/', getAllCategories);
router.get('/:category', getCategory);

export default router;
