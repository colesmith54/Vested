import { Request, Response } from "express";
import axios from "axios";
require("dotenv").config();

const NEWS_API_URL = "https://newsapi.org/v2/everything";
const API_KEY = process.env.VITE_NEWS;

export const getNews = async (req: Request, res: Response) => {
  try {
    const response = await axios.get(NEWS_API_URL, {
      params: {
        q: `"${req.params.name}" Finance`,
        apiKey: API_KEY,
        language: "en",
        sortBy: "relevancy",
        pageSize: 20,
        page: 1,
      },
    });

    res.status(200).json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch news" });
  }
};
