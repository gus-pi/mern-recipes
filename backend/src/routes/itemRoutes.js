import express from 'express';
import { getAllItems } from '../controllers/itemController.js';

const router = express.Router();

router.get('/', getAllItems);

export default router;
