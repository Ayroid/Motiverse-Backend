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
import { PRODUCTITEMSMODEL } from "../models/productItemModel.js";
import { PRODUCTSMODEL } from "../models/productModel.js";

// CONTROLLERS
const createProductItem = async (req, res) => {
  try {
    const {
      product_id,
      product_item_name,
      product_item_description,
      product_item_price,
      product_item_stock_quantity,
      product_item_rating,
    } = req.body;
    const query = { product_item_name: product_item_name };

    let record = await READ_DB(PRODUCTITEMSMODEL, query);
    if (record.length > 0) {
      return res
        .status(StatusCodes.CONFLICT)
        .send("Product Item already exists");
    }

    const productImg = `${SERVER_URI}/images/product/${req.files["product_item_image"].filename}`;

    record = await CREATE_DB(PRODUCTITEMSMODEL, {
      product_id,
      product_item_name,
      product_item_description,
      product_item_price,
      product_item_stock_quantity,
      product_item_rating,
      product_item_image: productImg,
    });

    if (record) {
      console.log("Product Item Created", { record });

      const productRecord = await READ_DB_ID(PRODUCTSMODEL, product_id);

      if (!productRecord) {
        console.log("Product Item Not Found", { productRecord });
        await DELETE_DB_ID(PRODUCTITEMSMODEL, record._id);
        return res.status(StatusCodes.NOT_FOUND).send("Product Item Not Found");
      }

      const products = productRecord.product_items;

      const productStockQuantity = productRecord.product_stock_quantity;

      products.push(record._id);

      const updatedProductRecord = await UPDATE_DB_ID(
        PRODUCTSMODEL,
        product_id,
        {
          product_items: products,
          product_stock_quantity:
            parseInt(productStockQuantity, 10) +
            parseInt(product_item_stock_quantity, 10),
        },
        fields
      );

      if (updatedProductRecord) {
        console.log("Product Item Updated", {
          updatedProductRecord,
        });
      } else {
        console.log("Product Item Not Updated", {
          updatedProductRecord,
        });
      }

      return res.status(StatusCodes.CREATED).send("Product Item Created");
    } else {
      console.log("Error Creating Product", { error });
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .send("Internal Server Error");
    }
  } catch (error) {
    console.log("Error Creating Product", { error });
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send("Internal Server Error");
  }
};

const readProductItem = async (req, res) => {
  try {
    const query = req.query.id ? { _id: req.query.id } : {};

    const record = await READ_DB(PRODUCTITEMSMODEL, query, fields);

    if (record.length > 0) {
      console.log("Product Item Found", { record });
      return res.status(StatusCodes.OK).send(record);
    } else {
      console.log("Product Item Not Found", { record });
      return res.status(StatusCodes.NOT_FOUND).send("Product Item Not Found");
    }
  } catch (error) {
    console.log("Error Reading Product", { error });
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send("Internal Server Error");
  }
};

const readProductItemById = async (req, res) => {
  try {
    const id = req.params.id;

    const record = await READ_DB_ID(PRODUCTITEMSMODEL, id, fields);
    if (record) {
      console.log("Product Item Found", { record });
      return res.status(StatusCodes.OK).send(record);
    } else {
      console.log("Product Item Not Found", { record });
      return res.status(StatusCodes.NOT_FOUND).send("Product Item Not Found");
    }
  } catch (error) {
    console.log("Error Reading Product", { error });
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send("Internal Server Error");
  }
};

const updateProductItemById = async (req, res) => {
  try {
    const id = req.params.id;
    const data = req.body;
    const record = await UPDATE_DB_ID(PRODUCTITEMSMODEL, id, data, fields);
    if (record) {
      console.log("Product Item Updated", { record });
      return res.status(StatusCodes.OK).send(record);
    } else {
      console.log("Product Item Not Updated", { record });
      return res.status(StatusCodes.NOT_FOUND).send("Product Item Not Updated");
    }
  } catch (error) {
    console.log("Error Updating Product", { error });
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send("Internal Server Error");
  }
};

const deleteProductItemById = async (req, res) => {
  try {
    const id = req.params.id;
    const record = await DELETE_DB_ID(PRODUCTITEMSMODEL, id);
    if (record) {
      console.log("Product Item Deleted", { record });

      const productRecord = await READ_DB_ID(PRODUCTSMODEL, record.product_id);

      if (!productRecord) {
        console.log("Product Item Not Found", { productRecord });
        return res.status(StatusCodes.NOT_FOUND).send("Product Item Not Found");
      }

      const products = productRecord.product_items;

      const updatedProducts = products.filter(
        (product) => product.toString() !== record._id.toString()
      );

      const productStockQuantity = productRecord.product_stock_quantity;

      const updatedProductRecord = await UPDATE_DB_ID(
        PRODUCTSMODEL,
        record.product_id,
        {
          product_items: updatedProducts,
          product_stock_quantity:
            parseInt(productStockQuantity, 10) -
            parseInt(record.product_item_stock_quantity, 10),
        },
        fields
      );

      if (updatedProductRecord) {
        console.log("Product Item Updated", {
          updatedProductRecord,
        });
      }

      return res.status(StatusCodes.OK).send("Product Item Deleted");
    } else {
      console.log("Product Item Not Deleted", { record });
      return res.status(StatusCodes.NOT_FOUND).send("Product Item Not Deleted");
    }
  } catch (error) {
    console.log("Error Deleting Product", { error });
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send("Internal Server Error");
  }
};

export {
  createProductItem as CREATE_PRODUCT_ITEM,
  readProductItem as READ_PRODUCT_ITEM,
  readProductItemById as READ_PRODUCT_ITEM_ID,
  updateProductItemById as UPDATE_PRODUCT_ITEM_ID,
  deleteProductItemById as DELETE_PRODUCT_ITEM_ID,
};
