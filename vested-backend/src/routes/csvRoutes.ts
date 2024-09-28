import { Router } from 'express';
import { getCsvRowByTicker } from '../controllers/csvController';

const router = Router();

// Returns object formatted as {"ticker":"aapl","name":"Apple Inc","currency":"USD","exchange":"NASDAQ NMS - GLOBAL MARKET","industry":"Technology","logo":"https://static.finnhub.io/logo/87cb30d8-80df-11ea-8951-00000000092a.png","weburl":"https://www.apple.com/","environment_grade":"BB","environment_level":"Medium","social_grade":"B","social_level":"Medium","governance_grade":"B","governance_level":"Medium","environment_score":"355","social_score":"281","governance_score":"255","total_score":"891","last_processing_date":"16-04-2022","total_grade":"BB","total_level":"Medium","cik":"320193"}
router.get('/:ticker', getCsvRowByTicker);

export default router;
