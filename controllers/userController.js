import dotenv from "dotenv";
dotenv.config();
import { StatusCodes } from "http-status-codes";
import { genSalt, hash, compare } from "bcrypt";

// CONSTANTS
const SALT_ROUNDS = parseInt(process.env.SALT_ROUNDS, 10);
const fields = {
  _id: 0,
  __v: 0,
  password: 0,
  created_on: 0,
  updated_on: 0,
};

// DATABASE CONTROLLERS

import {
  CREATE_USER_DB,
  READ_USER_DB,
  UPDATE_USER_DB,
  DELETE_USER_DB,
} from "./database/userDatabase.js";

// CONTROLLERS

const createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const query = { email };

    const salt = await genSalt(SALT_ROUNDS);
    const hashedPassword = await hash(password, salt);

    const userExists = await READ_USER_DB(query);
    if (userExists.length > 0) {
      return res.status(StatusCodes.CONFLICT).send("User already exists");
    }

    const user = await CREATE_USER_DB({
      name,
      email,
      password: hashedPassword,
    });

    if (user) {
      console.log("User Created", { user });
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
    const query = !req.query.email ? {} : { email: req.query.email };

    const user = await READ_USER_DB(query, fields);

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
    const user = await UPDATE_USER_DB(query, data, fields);
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
    const user = await DELETE_USER_DB(query);
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
    const user = await READ_USER_DB(query);
    if (user.length > 0) {
      const password = req.body.password;
      const hashedPassword = user[0].password;
      const isMatch = await compare(password, hashedPassword);
      if (isMatch) {
        console.log("User Logged In", { user });
        return res.status(StatusCodes.OK).send("User Logged In");
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
