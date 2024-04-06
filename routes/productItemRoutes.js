import express from "express";
import { UPLOAD } from "../middlewares/multer.js";
import {
  CREATE_PRODUCT_ITEM,
  READ_PRODUCT_ITEM,
  READ_PRODUCT_ITEM_ID,
  UPDATE_PRODUCT_ITEM_ID,
  DELETE_PRODUCT_ITEM_ID,
} from "../controllers/productItemController.js";

const productItemRouter = express.Router();

productItemRouter
  .route("/")
  .get(READ_PRODUCT_ITEM)
  .post(
    UPLOAD.fields([{ name: "product_item_image", maxCount: 1 }]),
    CREATE_PRODUCT_ITEM
  );

productItemRouter
  .route("/:id")
  .get(READ_PRODUCT_ITEM_ID)
  .put(UPDATE_PRODUCT_ITEM_ID)
  .delete(DELETE_PRODUCT_ITEM_ID);

export { productItemRouter as PRODUCT_ITEM_ROUTER };
