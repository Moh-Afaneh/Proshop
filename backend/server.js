import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import path from "path";
import { connectDB } from "./config/db.js";
import productRouter from "./routes/productRouter.js";
import userRouter from "./routes/userRouter.js";
import orderRouter from "./routes/orderRouter.js";
import uploadRouter from "./routes/uploadRouter.js";
import colors from "colors";
import { ErrorHandler, notFound } from "./middleware/HandleErrorMiddleWare.js";
dotenv.config();
connectDB();
const app = express();
app.use(express.json());
if (process.env.NODE_ENV === "development") {
  app.use(morgan());
}
const port = process.env.PORT || 5000;
app.listen(
  port,
  console.log(
    `Server running on ${process.env.NODE_ENV} Started on Port ${port}`.yellow
      .bold
  )
);

app.use("/api/products", productRouter);
app.use("/api/users", userRouter);
app.use("/api/order", orderRouter);
app.use("/api/uploads", uploadRouter);
app.get("/api/config/paypal", (req, res) => {
  res.send(process.env.PAYPAL_CLIENT_ID);
});
const __dirname = path.resolve();
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/build")));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"));
  });
} else {
  app.get("/", (req, res) => {
    res.send("Api is running");
  });
}

app.use(notFound);
app.use(ErrorHandler);
