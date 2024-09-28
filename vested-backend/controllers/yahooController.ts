import { Request, Response } from "express";
import yahooFinance from "yahoo-finance2";

interface StockPrice {
  date: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
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
    startDate.setMonth(endDate.getMonth() - 3);

    const queryOptions = {
      period1: startDate,
      period2: endDate,
      interval: "1d" as const,
    };
    const result: any[] = await yahooFinance.historical(ticker, queryOptions); // Note underlying API is depreciated

    if (!result || result.length === 0) {
      res
        .status(404)
        .json({ error: `No historical data found for ticker "${ticker}".` });
      return;
    }

    const stockPrices: StockPrice[] = result.map((quote: any) => ({
      date: quote.date.toISOString().split("T")[0],
      open: quote.open,
      high: quote.high,
      low: quote.low,
      close: quote.close,
      volume: quote.volume,
    }));

    // res.status(200).json({ ticker, stockPrices }); No need to
    res.status(200).json(stockPrices);
  } catch (error) {
    console.error("Unexpected Error:", error);
    res
      .status(500)
      .json({ error: "Internal server error while fetching stock data." });
  }
};