import express, { Request, Response } from "express";
import cors from "cors";

import { getCsvRowByTicker } from "../src/controllers/csvController";
import { getStockPrices } from "../src/controllers/yahooController";

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(cors());

app.get("/api/csv/:ticker", getCsvRowByTicker);
app.get("/api/yahoo/:ticker", getStockPrices);

app.listen(PORT, () => console.log("Server ready on port 3000."));

export default app;
