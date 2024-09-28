import { Router } from 'express';
import { getCsvRowByTicker } from '../controllers/csvController';

const router = Router();

// Home route
router.get('/:ticker', getCsvRowByTicker);

export default router;
