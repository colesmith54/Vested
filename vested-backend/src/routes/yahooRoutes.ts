import { Router } from 'express';
import { getStockPrices } from '../controllers/yahooController';

const router = Router();

// Returns array of objects formatted as {"date":,"open":215.7,"high":216.,"low":2108,"close":210.875,"volume":0}
router.get('/:ticker', getStockPrices);

export default router;
