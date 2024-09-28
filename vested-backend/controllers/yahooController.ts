import { Request, Response } from "express";
import yahooFinance from "yahoo-finance2";

interface StockDataPoint {
  date: string;
  price: number;
}

export const getStockPrices = async (
  req: Request,
  res: Response
): Promise<void> => {
  const ticker: string = req.params.ticker;

  if (!ticker || ticker.trim() === "") {
    res
      .status(400)
      .json({ error: "Invalid ticker. It must be a non-empty string." });
    return;
  }

  try {
    const endDate: Date = new Date();
    const startDate: Date = new Date();
    startDate.setFullYear(endDate.getFullYear() - 1);

    const queryOptions = {
      period1: startDate,
      period2: endDate,
      interval: "1d" as const,
    };
    const result: any[] = await yahooFinance.historical(ticker, queryOptions);

    if (!result || result.length === 0) {
      res
        .status(404)
        .json({ error: `No historical data found for ticker "${ticker}".` });
      return;
    }

    const stockPrices: StockDataPoint[] = result.map((quote: any) => ({
      date: quote.date.toISOString().split("T")[0],
      price: quote.close.toFixed(2),
    }));

    res.status(200).json(stockPrices);
  } catch (error) {
    console.error("Unexpected Error:", error);
    res
      .status(500)
      .json({ error: "Internal server error while fetching stock data." });
  }
};
