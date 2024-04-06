import dotenv from "dotenv";
dotenv.config();
import { StatusCodes } from "http-status-codes";

// CONSTANTS
const fields = {
  __v: 0,
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
import { PRODUCTCATEGORYMODEL } from "../models/productCategoryModel.js";

// CONTROLLERS
const createProductCategory = async (req, res) => {
  try {
    const { category_name, category_description, parent_category } = req.body;
    const query = { category_name: category_name };

    let record = await READ_DB(PRODUCTCATEGORYMODEL, query);
    if (record.length > 0) {
      return res
        .status(StatusCodes.CONFLICT)
        .send("Product Category already exists");
    }

    record = await CREATE_DB(PRODUCTCATEGORYMODEL, {
      category_name,
      category_description,
      parent_category,
    });

    if (record) {
      console.log("Product Category Created", { record });
      return res.status(StatusCodes.CREATED).send("Product Category Created");
    } else {
      console.log("Error Creating Product Category", { record });
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .send("Internal Server Error");
    }
  } catch (error) {
    console.log("Error Creating Product Category", { error });
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send("Internal Server Error");
  }
};

const readProductCategory = async (req, res) => {
  try {
    const query = req.query.id ? { _id: req.query.id } : {};

    const record = await READ_DB(PRODUCTCATEGORYMODEL, query, fields);

    if (record.length > 0) {
      console.log("Product Category Found", { record });
      return res.status(StatusCodes.OK).send(record);
    } else {
      console.log("Product Category Not Found", { record });
      return res
        .status(StatusCodes.NOT_FOUND)
        .send("Product Category Not Found");
    }
  } catch (error) {
    console.log("Error Reading Product Category", { error });
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send("Internal Server Error");
  }
};

const updateProductCategory = async (req, res) => {
  try {
    const query = { _id: req.query.id };
    const data = req.body;
    const record = await UPDATE_DB(PRODUCTCATEGORYMODEL, query, data, fields);
    if (record) {
      console.log("Product Category Updated", { record });
      return res.status(StatusCodes.OK).send(record);
    } else {
      console.log("Product Category Not Updated", { record });
      return res
        .status(StatusCodes.NOT_FOUND)
        .send("Product Category Not Updated");
    }
  } catch (error) {
    console.log("Error Updating Product Category", { error });
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send("Internal Server Error");
  }
};

const deleteProductCategory = async (req, res) => {
  try {
    const query = { _id: req.query.id };
    const record = await DELETE_DB(PRODUCTCATEGORYMODEL, query);
    if (record) {
      console.log("Product Category Deleted", { record });
      return res.status(StatusCodes.OK).send("Product Category Deleted");
    } else {
      console.log("Product Category Not Deleted", { record });
      return res
        .status(StatusCodes.NOT_FOUND)
        .send("Product Category Not Deleted");
    }
  } catch (error) {
    console.log("Error Deleting Product Category", { error });
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send("Internal Server Error");
  }
};

export {
  createProductCategory as CREATE_PRODUCT_CATEGORY,
  readProductCategory as READ_PRODUCT_CATEGORY,
  updateProductCategory as UPDATE_PRODUCT_CATEGORY,
  deleteProductCategory as DELETE_PRODUCT_CATEGORY,
};
