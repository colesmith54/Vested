import express, { Request, Response } from "express";
import cors from "cors";
import homeRoutes from "../routes/homeRoutes";
import csvRoutes from "../routes/csvRoutes";
import yahooRoutes from "../routes/yahooRoutes";

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(cors());

app.use("/api/home", homeRoutes);
app.use("/api/csv", csvRoutes);
app.use("/api/yahoo", yahooRoutes);

app.listen(PORT, () => {
  console.log("Server is running, app is listening on port " + PORT);
});

export default app;
