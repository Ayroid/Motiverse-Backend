import express from "express";
import { UPLOAD } from "../middlewares/multer.js";
import {
  CREATE_GENERAL_QUERIES,
  CREATE_PRODUCT_QUERIES,
  READ_GENERAL_QUERIES,
  READ_GENERAL_QUERIES_ID,
  READ_PRODUCT_QUERIES,
  READ_PRODUCT_QUERIES_ID,
  UPDATE_GENERAL_QUERIES_ID,
  UPDATE_PRODUCT_QUERIES_ID,
  DELETE_GENERAL_QUERIES_ID,
  DELETE_PRODUCT_QUERIES_ID,
} from "../controllers/queryController.js";

const queryRouter = express.Router();

queryRouter
  .route("/general")
  .get(READ_GENERAL_QUERIES)
  .post(CREATE_GENERAL_QUERIES);

queryRouter
  .route("/general/:id")
  .get(READ_GENERAL_QUERIES_ID)
  .put(UPDATE_GENERAL_QUERIES_ID)
  .delete(DELETE_GENERAL_QUERIES_ID);

queryRouter
  .route("/product")
  .get(READ_PRODUCT_QUERIES)
  .post(
    UPLOAD.fields([{ name: "product_query_image", maxCount: 1 }]),
    CREATE_PRODUCT_QUERIES
  );

queryRouter
  .route("/product/:id")
  .get(READ_PRODUCT_QUERIES_ID)
  .put(UPDATE_PRODUCT_QUERIES_ID)
  .delete(DELETE_PRODUCT_QUERIES_ID);

export { queryRouter as QUERY_ROUTER };
