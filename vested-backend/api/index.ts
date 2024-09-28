import express, { Request, Response } from "express";
import cors from "cors";
import { getCsvRowByTicker } from "../src/controllers/csvController";
import { getStockPrices } from "../src/controllers/yahooController";

const app = express();

app.use(express.json());
app.use(cors());

app.get("/api/csv/:ticker", getCsvRowByTicker);
app.get("/api/yahoo/:ticker", getStockPrices);

app.get("/api", (req: Request, res: Response) => {
  res.status(200).send("API is working");
});

export default app;
