import express from "express";
import {
  CREATE_USER_ORDER,
  READ_USER_ORDER,
  READ_USER_ORDER_ID,
  UPDATE_USER_ORDER_ID,
  DELETE_USER_ORDER_ID,
} from "../controllers/userOrderController.js";

const userOrderRouter = express.Router();

userOrderRouter.route("/").get(READ_USER_ORDER).post(CREATE_USER_ORDER);

userOrderRouter
  .route("/:id")
  .get(READ_USER_ORDER_ID)
  .put(UPDATE_USER_ORDER_ID)
  .delete(DELETE_USER_ORDER_ID);

export { userOrderRouter as USER_ORDER_ROUTER };
