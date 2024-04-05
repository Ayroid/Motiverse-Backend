import express from "express";
import { UPLOAD } from "../middlewares/multer.js";
import {
  CREATE_PRODUCT,
  READ_PRODUCT,
  UPDATE_PRODUCT,
  DELETE_PRODUCT,
} from "../controllers/productController.js";

const productRouter = express.Router();

productRouter
  .route("/")
  .get(READ_PRODUCT)
  .post(UPLOAD.fields([{ name: "product_image", maxCount: 1 }]), CREATE_PRODUCT)
  .put(UPDATE_PRODUCT)
  .delete(DELETE_PRODUCT);

export { productRouter as PRODUCT_ROUTER };
