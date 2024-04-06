import express from "express";
import {
  CREATE_PRODUCT_ITEM_REVIEW,
  READ_PRODUCT_ITEM_REVIEW,
  READ_PRODUCT_ITEM_REVIEW_ID,
  UPDATE_PRODUCT_ITEM_REVIEW_ID,
  DELETE_PRODUCT_ITEM_REVIEW_ID,
} from "../controllers/productItemReviewController.js";

const productItemReviewRouter = express.Router();

productItemReviewRouter
  .route("/")
  .get(READ_PRODUCT_ITEM_REVIEW)
  .post(CREATE_PRODUCT_ITEM_REVIEW);

productItemReviewRouter
  .route("/:id")
  .get(READ_PRODUCT_ITEM_REVIEW_ID)
  .put(UPDATE_PRODUCT_ITEM_REVIEW_ID)
  .delete(DELETE_PRODUCT_ITEM_REVIEW_ID);

export { productItemReviewRouter as PRODUCT_ITEM_REVIEW_ROUTER };
