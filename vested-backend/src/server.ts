import express, { Request, Response } from "express";
import homeRoutes from './routes/homeRoutes';
import csvRoutes from './routes/csvRoutes';
import yahooRoutes from './routes/yahooRoutes';

const app = express();
const port: number = 3000;

app.use(express.json()); // Middleware to parse JSON

app.get("/", (req: Request, res: Response) => {
  res.send("Hello Vendure");
});

app.use('/api/home', homeRoutes);
app.use('/api/csv', csvRoutes);
app.use('/api/yahoo', yahooRoutes);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

export default app;
