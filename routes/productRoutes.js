import express from "express";
import { UPLOAD } from "../middlewares/multer.js";
import {
  CREATE_PRODUCT,
  READ_PRODUCT,
  READ_PRODUCT_ID,
  UPDATE_PRODUCT_ID,
  DELETE_PRODUCT_ID,
} from "../controllers/productController.js";

const productRouter = express.Router();

productRouter
  .route("/")
  .get(READ_PRODUCT)
  .post(
    UPLOAD.fields([{ name: "product_image", maxCount: 1 }]),
    CREATE_PRODUCT
  );

productRouter
  .route("/:id")
  .get(READ_PRODUCT_ID)
  .put(UPDATE_PRODUCT_ID)
  .delete(DELETE_PRODUCT_ID);

export { productRouter as PRODUCT_ROUTER };
