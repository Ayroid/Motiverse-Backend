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
  UPDATE_DB,
  UPDATE_DB_ID,
  DELETE_DB,
  DELETE_DB_ID,
} from "./databaseController.js";

// MODEL IMPORT
import { PRODUCTSMODEL } from "../models/productModel.js";
import { PRODUCTCATEGORYMODEL } from "../models/productCategoryModel.js";

// CONTROLLERS
const createProduct = async (req, res) => {
  try {
    const {
      product_category_id,
      product_name,
      product_description,
      product_price_range,
      product_stock_quantity,
      product_rating,
    } = req.body;
    const query = { product_name: product_name };

    let record = await READ_DB(PRODUCTSMODEL, query);
    if (record.length > 0) {
      return res.status(StatusCodes.CONFLICT).send("Product already exists");
    }

    const productImg = `${SERVER_URI}/images/product/${req.files["product_image"][0].filename}`;

    record = await CREATE_DB(PRODUCTSMODEL, {
      product_category_id,
      product_name,
      product_description,
      product_price_range,
      product_stock_quantity,
      product_rating,
      product_image: productImg,
    });

    if (record) {
      console.log("Product Created", { record });

      const productCategoryRecord = await READ_DB_ID(
        PRODUCTCATEGORYMODEL,
        product_category_id
      );

      if (!productCategoryRecord) {
        console.log("Product Category Not Found", { productCategoryRecord });
        await DELETE_DB(PRODUCTSMODEL, { _id: record._id });
        return res
          .status(StatusCodes.NOT_FOUND)
          .send("Product Category Not Found");
      }

      const products = productCategoryRecord.products;
      const productStockQuantity = productCategoryRecord.product_stock_quantity;

      products.push(record._id);

      const updatedProductCategoryRecord = await UPDATE_DB_ID(
        PRODUCTCATEGORYMODEL,
        product_category_id,
        {
          products: products,
          product_stock_quantity: productStockQuantity + product_stock_quantity,
        },
        fields
      );

      if (updatedProductCategoryRecord) {
        console.log("Product Category Updated", {
          updatedProductCategoryRecord,
        });
      } else {
        console.log("Product Category Not Updated", {
          updatedProductCategoryRecord,
        });
      }

      return res.status(StatusCodes.CREATED).send("Product Created");
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

const readProduct = async (req, res) => {
  try {
    const query = req.query.id ? { _id: req.query.id } : {};

    const record = await READ_DB(PRODUCTSMODEL, query, fields);

    if (record.length > 0) {
      console.log("Product Found", { record });
      return res.status(StatusCodes.OK).send(record);
    } else {
      console.log("Product Not Found", { record });
      return res.status(StatusCodes.NOT_FOUND).send("Product Not Found");
    }
  } catch (error) {
    console.log("Error Reading Product", { error });
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send("Internal Server Error");
  }
};

const updateProduct = async (req, res) => {
  try {
    const query = { _id: req.query.id };
    const data = req.body;
    const record = await UPDATE_DB(PRODUCTSMODEL, query, data, fields);
    if (record) {
      console.log("Product Updated", { record });
      return res.status(StatusCodes.OK).send(record);
    } else {
      console.log("Product Not Updated", { record });
      return res.status(StatusCodes.NOT_FOUND).send("Product Not Updated");
    }
  } catch (error) {
    console.log("Error Updating Product", { error });
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send("Internal Server Error");
  }
};

const deleteProduct = async (req, res) => {
  try {
    const query = { _id: req.query.id };
    const record = await DELETE_DB_ID(PRODUCTSMODEL, query);
    if (record) {
      console.log("Product Deleted", { record });

      const productCategoryRecord = await READ_DB_ID(
        PRODUCTCATEGORYMODEL,
        record.product_category_id
      );

      if (!productCategoryRecord) {
        console.log("Product Category Not Found", { productCategoryRecord });
        return res
          .status(StatusCodes.NOT_FOUND)
          .send("Product Category Not Found");
      }

      const products = productCategoryRecord.products;

      const updatedProducts = products.filter(
        (product) => product.toString() !== record._id.toString()
      );

      const productStockQuantity = productCategoryRecord.product_stock_quantity;

      const updatedProductCategoryRecord = await UPDATE_DB_ID(
        PRODUCTCATEGORYMODEL,
        record.product_category_id,
        {
          products: updatedProducts,
          product_stock_quantity:
            productStockQuantity - record.product_stock_quantity,
        },
        fields
      );

      if (updatedProductCategoryRecord) {
        console.log("Product Category Updated", {
          updatedProductCategoryRecord,
        });
      }

      return res.status(StatusCodes.OK).send("Product Deleted");
    } else {
      console.log("Product Not Deleted", { record });
      return res.status(StatusCodes.NOT_FOUND).send("Product Not Deleted");
    }
  } catch (error) {
    console.log("Error Deleting Product", { error });
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send("Internal Server Error");
  }
};

export {
  createProduct as CREATE_PRODUCT,
  readProduct as READ_PRODUCT,
  updateProduct as UPDATE_PRODUCT,
  deleteProduct as DELETE_PRODUCT,
};
