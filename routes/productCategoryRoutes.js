import express from "express";
import {
  CREATE_PRODUCT_CATEGORY,
  READ_PRODUCT_CATEGORY,
  UPDATE_PRODUCT_CATEGORY,
  DELETE_PRODUCT_CATEGORY,
} from "../controllers/productCategoryController.js";

const productCategoryRouter = express.Router();

productCategoryRouter
  .route("/")
  .get(READ_PRODUCT_CATEGORY)
  .post(CREATE_PRODUCT_CATEGORY)
  .put(UPDATE_PRODUCT_CATEGORY)
  .delete(DELETE_PRODUCT_CATEGORY);

export { productCategoryRouter as PRODUCT_CATEGORY_ROUTER };
