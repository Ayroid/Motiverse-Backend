import express from "express";
import {
  READ_SHOPPING_CART,
  READ_SHOPPING_CART_ID,
  ADD_PRODUCT_TO_SHOPPING_CART,
  REMOVE_PRODUCT_FROM_SHOPPING_CART,
  UPDATE_SHOPPING_CART_ID,
} from "../controllers/shoppingCartController.js";

const shoppingCartRouter = express.Router();

shoppingCartRouter.route("/").get(READ_SHOPPING_CART);

shoppingCartRouter
  .route("/:id")
  .get(READ_SHOPPING_CART_ID)
  .put(UPDATE_SHOPPING_CART_ID);

shoppingCartRouter.route("/add/:id").post(ADD_PRODUCT_TO_SHOPPING_CART);

shoppingCartRouter.route("/remove/:id").put(REMOVE_PRODUCT_FROM_SHOPPING_CART);

export { shoppingCartRouter as SHOPPING_CART_ROUTER };
