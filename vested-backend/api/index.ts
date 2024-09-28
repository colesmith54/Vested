import express, { Request, Response } from "express";
import cors from "cors";
import { getAllCsvRows } from "../controllers/csvController";
import { getStockPrices } from "../controllers/yahooController";

const app = express();

app.use(express.json());
app.use(cors());

app.get("/api/csv", getAllCsvRows);
app.get("/api/yahoo/:ticker", getStockPrices);

app.get("/api", (req: Request, res: Response) => {
  res.status(200).send("API is working");
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

export default app;
