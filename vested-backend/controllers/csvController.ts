import { Request, Response } from "express";
import fs from "fs";
import path from "path";
import csvParser from "csv-parser";

interface CsvRow {
  t: string;
  n: string;
  l: string;
  w: string;
  e: number;
  s: number;
  g: number;
}

export const getAllCsvRows = (req: Request, res: Response): void => {
  let csvFilePath: string = path.join(__dirname, "../data/data.csv");

  if (!fs.existsSync(csvFilePath)) {
    csvFilePath = path.join(__dirname, "../../data/data.csv");
  }

  if (!fs.existsSync(csvFilePath)) {
    res.status(404).json({ error: "CSV file not found." });
    return;
  }

  const readStream: fs.ReadStream = fs.createReadStream(csvFilePath);
  const results: CsvRow[] = [];

  const parser = csvParser();
  readStream.pipe(parser);

  parser.on("data", (data: any) => {
    const row: CsvRow = {
      t: data.ticker,
      n: data.name,
      l: data.logo,
      w: data.weburl,
      e: Math.min(10, parseFloat((data.environment_score / 60).toFixed(1))),
      s: Math.min(10, parseFloat((data.social_score / 40).toFixed(1))),
      g: Math.min(10, parseFloat((data.governance_score / 40).toFixed(1))),
    };
    results.push(row);
  });

  parser.on("end", () => {
    res.status(200).json(results);
  });

  parser.on("error", (err: Error | NodeJS.ErrnoException) => {
    console.error("Error parsing CSV file:", err);
    if (!res.headersSent) {
      res
        .status(500)
        .json({ error: "Internal server error while parsing the CSV file." });
    }
  });

  readStream.on("error", (err: Error | NodeJS.ErrnoException) => {
    console.error("Error reading CSV file:", err);
    if (!res.headersSent) {
      res
        .status(500)
        .json({ error: "Internal server error while reading the CSV file." });
    }
  });
};
