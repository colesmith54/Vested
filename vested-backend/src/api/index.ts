import express, { Request, Response } from "express";
import cors from "cors";

import { getCsvRowByTicker } from "../controllers/csvController";
import { getStockPrices } from "../controllers/yahooController";

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(cors());

app.get("/api/csv/:ticker", getCsvRowByTicker);
app.get("/api/yahoo/:ticker", getStockPrices);

app.listen(3000, () => console.log("Server ready on port 3000."));

export default app;
