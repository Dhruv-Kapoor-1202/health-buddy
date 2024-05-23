import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import connectDB from "./config/mongo.js";
import authRoutes from "./routes/auth.routes.js";
import morgan from "morgan";

const app = express();
const PORT = 3000;

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(morgan("dev"));
app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/", authRoutes);

connectDB();

app.listen(PORT, () => {
  console.log(`Hi Mom And Dad!!!\nLink : http://localhost:${PORT}`);
});
