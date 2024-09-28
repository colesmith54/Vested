import express, { Request, Response } from "express";
import homeRoutes from './routes/homeRoutes';

const app = express();
const port: number = 3000;

app.use(express.json()); // Middleware to parse JSON

app.get("/", (req: Request, res: Response) => {
  res.send("Hello, TypeScript + Node.js + Express!");
});

app.use('/api/home', homeRoutes);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

export default app;
