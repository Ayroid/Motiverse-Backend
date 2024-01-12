import express from "express";

const productRouter = express.Router();

productRouter.get("/", (req, res) => {
  res.send("Products ✅");
});

export { productRouter as PRODUCT_ROUTER };
