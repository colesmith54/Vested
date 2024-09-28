// src/controllers/csvController.ts

import { Request, Response } from "express";
import fs from "fs";
import path from "path";
import csvParser from "csv-parser";

interface CsvRow {
  ticker: string;
  name: string;
  currency: string;
  exchange: string;
  industry: string;
  logo: string;
  weburl: string;
  environment_grade: string;
  environment_level: string;
  social_grade: string;
  social_level: string;
  governance_grade: string;
  governance_level: string;
  environment_score: string;
  social_score: number;
  governance_score: number;
  total_score: number;
  last_processing_date: string;
  total_grade: number;
  total_level: string;
  cik: number;
}

export const getCsvRowByTicker = (req: Request, res: Response): void => {
  const ticker: string = req.params.ticker;

  if (!ticker || ticker.trim() === "") {
    res
      .status(400)
      .json({ error: "Invalid ticker. It must be a non-empty string." });
    return;
  }

  const csvFilePath: string = path.join(__dirname, "../../data/data.csv");
  const readStream: fs.ReadStream = fs.createReadStream(csvFilePath);
  let found: boolean = false;

  const parser = csvParser();
  readStream.pipe(parser);

  parser.on("data", (data: CsvRow) => {
    if (data.ticker === ticker) {
      found = true;
      res.status(200).json(data);
      parser.destroy();
    }
  });

  parser.on("end", () => {
    if (!found) {
      res.status(404).json({ error: `Ticker "${ticker}" not found.` });
    }
  });

  parser.on("error", (err: Error | NodeJS.ErrnoException) => {
    console.error("Error reading CSV file:", err);
    if (!res.headersSent) {
      res
        .status(500)
        .json({ error: "Internal server error while reading the CSV file." });
    }
  });
};
