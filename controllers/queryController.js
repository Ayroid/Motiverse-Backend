import dotenv from "dotenv";
dotenv.config();
import { StatusCodes } from "http-status-codes";

// CONSTANTS
const SERVER_URI = process.env.SERVER_URI;
const fields = {
  __v: 0,
  createdAt: 0,
  updatedAt: 0,
};

// DATABASE CONTROLLERS
import {
  CREATE_DB,
  READ_DB,
  READ_DB_ID,
  UPDATE_DB_ID,
  DELETE_DB_ID,
} from "./databaseController.js";

// MODEL IMPORT
import { GENERALQUERIESMODEL } from "../models/generalQueriesModel.js";
import { PRODUCTQUERIESMODEL } from "../models/productQueriesModel.js";

// CONTROLLERS
const createGeneralQueries = async (req, res) => {
  try {
    const {
      user_id,
      query_title,
      query_description,
      query_status,
      query_initiation_date,
      query_completion_date,
    } = req.body;
    const query = { user_id: user_id, query_title: query_title };

    let record = await READ_DB(GENERALQUERIESMODEL, query);
    if (record.length > 0) {
      return res
        .status(StatusCodes.CONFLICT)
        .send("General Query already exists");
    }

    record = await CREATE_DB(GENERALQUERIESMODEL, {
      user_id,
      query_title,
      query_description,
      query_status,
      query_initiation_date,
      query_completion_date,
    });

    if (record) {
      console.log("General Query Created", { record });
      return res.status(StatusCodes.CREATED).send("General Query Created");
    } else {
      console.log("Error Creating General Query", { error });
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .send("Internal Server Error");
    }
  } catch (error) {
    console.log("Error Creating General Query", { error });
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send("Internal Server Error");
  }
};

const readGeneralQueries = async (req, res) => {
  try {
    const query = req.query.id ? { _id: req.query.id } : {};

    const record = await READ_DB(GENERALQUERIESMODEL, query, fields);

    if (record.length > 0) {
      console.log("General Query Found", { record });
      return res.status(StatusCodes.OK).send(record);
    } else {
      console.log("General Query Not Found", { record });
      return res.status(StatusCodes.NOT_FOUND).send("General Query Not Found");
    }
  } catch (error) {
    console.log("Error Reading General Query", { error });
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send("Internal Server Error");
  }
};

const readGeneralQueriesById = async (req, res) => {
  try {
    const id = req.params.id;

    const record = await READ_DB_ID(GENERALQUERIESMODEL, id, fields);
    if (record) {
      console.log("General Query Found", { record });
      return res.status(StatusCodes.OK).send(record);
    } else {
      console.log("General Query Not Found", { record });
      return res.status(StatusCodes.NOT_FOUND).send("General Query Not Found");
    }
  } catch (error) {
    console.log("Error Reading General Query", { error });
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send("Internal Server Error");
  }
};

const updateGeneralQueriesById = async (req, res) => {
  try {
    const id = req.params.id;
    const data = req.body;
    const record = await UPDATE_DB_ID(GENERALQUERIESMODEL, id, data, fields);
    if (record) {
      console.log("General Query Updated", { record });
      return res.status(StatusCodes.OK).send(record);
    } else {
      console.log("General Query Not Updated", { record });
      return res
        .status(StatusCodes.NOT_FOUND)
        .send("General Query Not Updated");
    }
  } catch (error) {
    console.log("Error Updating General Query", { error });
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send("Internal Server Error");
  }
};

const deleteGeneralQueriesById = async (req, res) => {
  try {
    const id = req.params.id;
    const record = await DELETE_DB_ID(GENERALQUERIESMODEL, id);
    if (record) {
      console.log("General Query Deleted", { record });
      return res.status(StatusCodes.OK).send("General Query Deleted");
    } else {
      console.log("General Query Not Deleted", { record });
      return res
        .status(StatusCodes.NOT_FOUND)
        .send("General Query Not Deleted");
    }
  } catch (error) {
    console.log("Error Deleting General Query", { error });
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send("Internal Server Error");
  }
};

const createProductQueries = async (req, res) => {
  try {
    const {
      user_id,
      product_item_id,
      query_title,
      query_description,
      query_status,
      query_initiation_date,
      query_completion_date,
    } = req.body;
    const query = { user_id: user_id, query_title: query_title };

    let record = await READ_DB(PRODUCTQUERIESMODEL, query);
    if (record.length > 0) {
      return res
        .status(StatusCodes.CONFLICT)
        .send("Product Query already exists");
    }

    const productImg = `${SERVER_URI}/images/product/${req.files["product_query_image"].filename}`;

    record = await CREATE_DB(PRODUCTQUERIESMODEL, {
      user_id,
      product_item_id,
      query_title,
      query_description,
      query_status,
      query_initiation_date,
      query_completion_date,
      product_query_images: productImg,
    });

    if (record) {
      console.log("Product Query Created", { record });
      return res.status(StatusCodes.CREATED).send("Product Query Created");
    } else {
      console.log("Error Creating Product Query", { error });
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .send("Internal Server Error");
    }
  } catch (error) {
    console.log("Error Creating Product Query", { error });
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send("Internal Server Error");
  }
};

const readProductQueries = async (req, res) => {
  try {
    const query = req.query.id ? { _id: req.query.id } : {};

    const record = await READ_DB(PRODUCTQUERIESMODEL, query, fields);

    if (record.length > 0) {
      console.log("Product Query Found", { record });
      return res.status(StatusCodes.OK).send(record);
    } else {
      console.log("Product Query Not Found", { record });
      return res.status(StatusCodes.NOT_FOUND).send("Product Query Not Found");
    }
  } catch (error) {
    console.log("Error Reading Product Query", { error });
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send("Internal Server Error");
  }
};

const readProductQueriesById = async (req, res) => {
  try {
    const id = req.params.id;

    const record = await READ_DB_ID(PRODUCTQUERIESMODEL, id, fields);
    if (record) {
      console.log("Product Query Found", { record });
      return res.status(StatusCodes.OK).send(record);
    } else {
      console.log("Product Query Not Found", { record });
      return res.status(StatusCodes.NOT_FOUND).send("Product Query Not Found");
    }
  } catch (error) {
    console.log("Error Reading Product Query", { error });
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send("Internal Server Error");
  }
};

const updateProductQueriesById = async (req, res) => {
  try {
    const id = req.params.id;
    const data = req.body;
    const record = await UPDATE_DB_ID(PRODUCTQUERIESMODEL, id, data, fields);
    if (record) {
      console.log("Product Query Updated", { record });
      return res.status(StatusCodes.OK).send(record);
    } else {
      console.log("Product Query Not Updated", { record });
      return res
        .status(StatusCodes.NOT_FOUND)
        .send("Product Query Not Updated");
    }
  } catch (error) {
    console.log("Error Updating Product Query", { error });
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send("Internal Server Error");
  }
};

const deleteProductQueriesById = async (req, res) => {
  try {
    const id = req.params.id;
    const record = await DELETE_DB_ID(PRODUCTQUERIESMODEL, id);
    if (record) {
      console.log("Product Query Deleted", { record });
      return res.status(StatusCodes.OK).send("Product Query Deleted");
    } else {
      console.log("Product Query Not Deleted", { record });
      return res
        .status(StatusCodes.NOT_FOUND)
        .send("Product Query Not Deleted");
    }
  } catch (error) {
    console.log("Error Deleting Product Query", { error });
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send("Internal Server Error");
  }
};

export {
  createGeneralQueries as CREATE_GENERAL_QUERIES,
  readGeneralQueries as READ_GENERAL_QUERIES,
  readGeneralQueriesById as READ_GENERAL_QUERIES_ID,
  updateGeneralQueriesById as UPDATE_GENERAL_QUERIES_ID,
  deleteGeneralQueriesById as DELETE_GENERAL_QUERIES_ID,
  createProductQueries as CREATE_PRODUCT_QUERIES,
  readProductQueries as READ_PRODUCT_QUERIES,
  readProductQueriesById as READ_PRODUCT_QUERIES_ID,
  updateProductQueriesById as UPDATE_PRODUCT_QUERIES_ID,
  deleteProductQueriesById as DELETE_PRODUCT_QUERIES_ID,
};
