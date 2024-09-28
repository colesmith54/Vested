import { Router } from 'express';
import { getHomeData } from '../controllers/homeController';

const router = Router();

// Home route
router.get('/', getHomeData);

export default router;
