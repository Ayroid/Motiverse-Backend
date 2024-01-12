import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import Database from "./config/database.js";
import { USER_ROUTER } from "./routes/userRoute.js";
import { PRODUCT_ROUTER } from "./routes/productRoute.js";

// DOTENV CONFIG

dotenv.config();

// CONSTANTS

const PORT = process.env.PORT;
const MONGODB_URI = process.env.DEV_MONGODB_URI;

// DATABASE

const db = new Database(MONGODB_URI);

db.connect();

// APP

const app = express();

// MIDDLEWARES

app.use(cors());
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// TEST ROUTE

app.use("/api/test", (req, res) => {
  res.send("Server ✅");
});

// ROUTES

app.use("/api/user", USER_ROUTER);
app.use("/api/product", PRODUCT_ROUTER);

// DATABASE DISCONNECT

process.on("SIGINT", async () => {
  try {
    await db.disconnect();
    console.log("Database Disconnected ✅");
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
});

// SERVER LISTEN

app.listen(PORT, () => {
  console.log(`Server: ${PORT} ✅`);
});
