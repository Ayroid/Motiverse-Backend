import dotenv from "dotenv";
dotenv.config();
import { StatusCodes } from "http-status-codes";
import { genSalt, hash } from "bcrypt";

// CONSTANTS
const SALT_ROUNDS = parseInt(process.env.SALT_ROUNDS);
const fields = {
  _id: 0,
  __v: 0,
  password: 0,
  created_on: 0,
  updated_on: 0,
};

// MESSAGES
const MESSAGES = {
  USER_ALREADY_EXISTS: "User Already Exists ❌ ",
  USER_CREATED: "User Created ✅ ",
  USER_FOUND: "User Found ✅ ",
  USER_NOT_FOUND: "User Not Found ❌ ",
  USER_UPDATED: "User Updated ✅ ",
  USER_DELETED: "User Deleted ✅ ",
  ERROR_CREATING_USER: "Error Creating User ❌ ",
  ERROR_READING_USER: "Error Reading User ❌ ",
  ERROR_UPDATING_USER: "Error Updating User ❌ ",
  ERROR_DELETING_USER: "Error Deleting User ❌ ",
  INTERNAL_SERVER_ERROR: "Internal Server Error ❌ ",
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
    const query = { email: email };

    const salt = await genSalt(SALT_ROUNDS);
    const hashedPassword = await hash(password, salt);

    const userExists = await READ_USER_DB(query);
    if (userExists.length > 0) {
      return res
        .status(StatusCodes.CONFLICT)
        .send(MESSAGES.USER_ALREADY_EXISTS);
    }

    const user = await CREATE_USER_DB({
      name,
      email,
      password: hashedPassword,
    });

    if (user) {
      console.log(MESSAGES.USER_CREATED, { user: user });
      return res.status(StatusCodes.CREATED).send(MESSAGES.USER_CREATED);
    } else {
      console.log(MESSAGES.ERROR_CREATING_USER, { error: error });
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .send(MESSAGES.INTERNAL_SERVER_ERROR);
    }
  } catch (error) {
    console.log(MESSAGES.ERROR_CREATING_USER, { error: error });
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send(MESSAGES.INTERNAL_SERVER_ERROR);
  }
};

const readUser = async (req, res) => {
  try {
    const query = !req.query.email ? {} : { email: req.query.email };

    const user = await READ_USER_DB(query, fields);

    if (user.length > 0) {
      console.log(MESSAGES.USER_FOUND, { user: user });
      return res.status(StatusCodes.OK).send(user);
    } else {
      console.log(MESSAGES.USER_NOT_FOUND, { user: user });
      return res.status(StatusCodes.NOT_FOUND).send(MESSAGES.USER_NOT_FOUND);
    }
  } catch (error) {
    console.log(MESSAGES.ERROR_READING_USER, { error: error });
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send(MESSAGES.INTERNAL_SERVER_ERROR);
  }
};

const updateUser = async (req, res) => {
  try {
    const query = { email: req.query.email };
    const data = req.body;
    const user = await UPDATE_USER_DB(query, data, fields);
    if (user) {
      console.log(MESSAGES.USER_UPDATED, { user: user });
      return res.status(StatusCodes.OK).send(user);
    } else {
      console.log(MESSAGES.USER_NOT_FOUND, { user: user });
      return res.status(StatusCodes.NOT_FOUND).send(MESSAGES.USER_NOT_FOUND);
    }
  } catch (error) {
    console.log(MESSAGES.ERROR_UPDATING_USER, { error: error });
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send(MESSAGES.INTERNAL_SERVER_ERROR);
  }
};

const deleteUser = async (req, res) => {
  try {
    const query = { email: req.query.email };
    const user = await DELETE_USER_DB(query);
    if (user) {
      console.log(MESSAGES.USER_DELETED, { user: user });
      return res.status(StatusCodes.OK).send(MESSAGES.USER_DELETED);
    } else {
      console.log(MESSAGES.USER_NOT_FOUND, { user: user });
      return res.status(StatusCodes.NOT_FOUND).send(MESSAGES.USER_NOT_FOUND);
    }
  } catch (error) {
    console.log(MESSAGES.ERROR_DELETING_USER, { error: error });
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send(MESSAGES.INTERNAL_SERVER_ERROR);
  }
};

export {
  createUser as CREATE_USER,
  readUser as READ_USER,
  updateUser as UPDATE_USER,
  deleteUser as DELETE_USER,
};
