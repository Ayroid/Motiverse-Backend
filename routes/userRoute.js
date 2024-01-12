import express from "express";
import {
  CREATE_USER,
  READ_USER,
  UPDATE_USER,
  DELETE_USER,
} from "../controllers/userController.js";

const userRouter = express.Router();

userRouter
  .route("/")
  .get(READ_USER)
  .post(CREATE_USER)
  .put(UPDATE_USER)
  .delete(DELETE_USER);

userRouter.route("/login").post((req, res) => {
  res.send("Login ✅");
});

userRouter.route("/register").post(CREATE_USER);

export { userRouter as USER_ROUTER };
