import dotenv from "dotenv";
dotenv.config();
import { StatusCodes } from "http-status-codes";
import { genSalt, hash, compare } from "bcrypt";
import { GENERATEACCESSTOKEN } from "../middlewares/authentication.js";
import { SENDMAIL } from "../utils/mailer.js";

// CONSTANTS
const SALT_ROUNDS = parseInt(process.env.SALT_ROUNDS, 10);
const fields = {
  __v: 0,
  password: 0,
  createdAt: 0,
  updatedAt: 0,
};

// DATABASE CONTROLLERS
import {
  CREATE_DB,
  READ_DB,
  UPDATE_DB,
  DELETE_DB,
} from "./databaseController.js";

// MODEL IMPORT
import { USERMODEL } from "../models/userModel.js";

// CONTROLLERS
const createUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const query = { email: email };

    const salt = await genSalt(SALT_ROUNDS);
    const hashedPassword = await hash(password, salt);

    const recordExists = await READ_DB(USERMODEL, query);
    if (recordExists.length > 0) {
      return res.status(StatusCodes.CONFLICT).send("User already exists");
    }

    const user = await CREATE_DB(USERMODEL, {
      username,
      email,
      password: hashedPassword,
    });

    if (user) {
      console.log("User Created", { user });
      SENDMAIL(username, email, "REGISTRATION");
      return res.status(StatusCodes.CREATED).send("User Created");
    } else {
      console.log("Error Creating User", { error });
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .send("Internal Server Error");
    }
  } catch (error) {
    console.log("Error Creating User", { error });
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send("Internal Server Error");
  }
};

const readUser = async (req, res) => {
  try {
    const query = req.query.email ? { email: req.query.email } : {};

    const user = await READ_DB(USERMODEL, query, fields);

    if (user.length > 0) {
      console.log("User Found", { user });
      return res.status(StatusCodes.OK).send(user);
    } else {
      console.log("User Not Found", { user });
      return res.status(StatusCodes.NOT_FOUND).send("User Not Found");
    }
  } catch (error) {
    console.log("Error Reading User", { error });
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send("Internal Server Error");
  }
};

const updateUser = async (req, res) => {
  try {
    const query = { email: req.query.email };
    const data = req.body;
    const user = await UPDATE_DB(USERMODEL, query, data, fields);
    if (user) {
      console.log("User Updated", { user });
      return res.status(StatusCodes.OK).send(user);
    } else {
      console.log("User Not Updated", { user });
      return res.status(StatusCodes.NOT_FOUND).send("User Not Updated");
    }
  } catch (error) {
    console.log("Error Updating User", { error });
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send("Internal Server Error");
  }
};

const deleteUser = async (req, res) => {
  try {
    const query = { email: req.query.email };
    const user = await DELETE_DB(USERMODEL, query);
    if (user) {
      console.log("User Deleted", { user });
      return res.status(StatusCodes.OK).send("User Deleted");
    } else {
      console.log("User Not Deleted", { user });
      return res.status(StatusCodes.NOT_FOUND).send("User Not Deleted");
    }
  } catch (error) {
    console.log("Error Deleting User", { error });
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send("Internal Server Error");
  }
};

const loginUser = async (req, res) => {
  try {
    const email = req.body.email;
    const query = { email };
    const user = await READ_DB(USERMODEL, query);
    if (user.length > 0) {
      const password = req.body.password;
      const hashedPassword = user[0].password;
      const isMatch = await compare(password, hashedPassword);
      if (isMatch) {
        const payload = {
          email: user[0].email,
          id: user[0]._id,
          is_admin: user[0].is_admin,
        };
        const accessToken = GENERATEACCESSTOKEN(payload);

        console.log("User Logged In", { user });
        SENDMAIL(user[0].username, user[0].email, "LOGIN");
        return res.status(StatusCodes.OK).send({ accessToken });
      } else {
        console.log("User Not Logged In", { user });
        return res.status(StatusCodes.UNAUTHORIZED).send("User Not Logged In");
      }
    } else {
      console.log("User Not Found", { user });
      return res.status(StatusCodes.NOT_FOUND).send("User Not Found");
    }
  } catch (error) {
    console.log("Error Logging In User", { error });
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send("Internal Server Error");
  }
};

export {
  createUser as CREATE_USER,
  readUser as READ_USER,
  updateUser as UPDATE_USER,
  deleteUser as DELETE_USER,
  loginUser as LOGIN_USER,
};
