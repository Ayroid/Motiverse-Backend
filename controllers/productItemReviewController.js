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
import { PRODUCTITEMSREVIEWMODEL } from "../models/productItemReviewModel.js";
import { PRODUCTITEMSMODEL } from "../models/productItemModel.js";

// CONTROLLERS
const createProductItemReview = async (req, res) => {
  try {
    console.log("Product Item Review Request", { body: req.body });

    const {
      user_id,
      product_item_id,
      product_item_rating,
      product_item_review,
    } = req.body;
    const query = { user_id: user_id, product_item_id: product_item_id };

    let record = await READ_DB(PRODUCTITEMSREVIEWMODEL, query);
    if (record.length > 0) {
      return res
        .status(StatusCodes.CONFLICT)
        .send("Product Item Review already exists");
    }

    record = await CREATE_DB(PRODUCTITEMSREVIEWMODEL, {
      user_id: user_id,
      product_item_id: product_item_id,
      product_item_rating: product_item_rating,
      product_item_review: product_item_review,
    });

    if (record) {
      console.log("Product Item Review Created", { record });

      const productItemRecord = await READ_DB_ID(
        PRODUCTITEMSMODEL,
        product_item_id
      );

      if (!productItemRecord) {
        console.log("Product Item Review Not Found", { productItemRecord });
        await DELETE_DB_ID(PRODUCTITEMSREVIEWMODEL, record._id);
        return res
          .status(StatusCodes.NOT_FOUND)
          .send("Product Item Review Not Found");
      }

      const reviews = productItemRecord.product_item_reviews;
      const updatedRating =
        (productItemRecord.product_item_rating * reviews.length +
          product_item_rating) /
        (reviews.length + 1);

      reviews.push(record._id);

      const updatedProductRecord = await UPDATE_DB_ID(
        PRODUCTITEMSMODEL,
        product_item_id,
        {
          product_item_reviews: reviews,
          product_item_rating: updatedRating,
        },
        fields
      );

      if (updatedProductRecord) {
        console.log("Product Item Review Updated", {
          updatedProductRecord,
        });
      } else {
        console.log("Product Item Review Not Updated", {
          updatedProductRecord,
        });
      }

      return res
        .status(StatusCodes.CREATED)
        .send("Product Item Review Created");
    } else {
      console.log("Error Creating Product", { record });
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

const readProductItemReview = async (req, res) => {
  try {
    console.log("Product Item Review Request", { query: req.query });

    const query = req.query.id ? { _id: req.query.id } : {};

    const record = await READ_DB(PRODUCTITEMSREVIEWMODEL, query, fields);

    if (record.length > 0) {
      console.log("Product Item Review Found", { record });
      return res.status(StatusCodes.OK).send(record);
    } else {
      console.log("Product Item Review Not Found", { record });
      return res
        .status(StatusCodes.NOT_FOUND)
        .send("Product Item Review Not Found");
    }
  } catch (error) {
    console.log("Error Reading Product", { error });
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send("Internal Server Error");
  }
};

const readProductItemReviewById = async (req, res) => {
  try {
    const id = req.params.id;

    const record = await READ_DB_ID(PRODUCTITEMSREVIEWMODEL, id, fields);
    if (record) {
      console.log("Product Item Review Found", { record });
      return res.status(StatusCodes.OK).send(record);
    } else {
      console.log("Product Item Review Not Found", { record });
      return res
        .status(StatusCodes.NOT_FOUND)
        .send("Product Item Review Not Found");
    }
  } catch (error) {
    console.log("Error Reading Product", { error });
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send("Internal Server Error");
  }
};

const updateProductItemReviewById = async (req, res) => {
  try {
    const id = req.params.id;
    const data = req.body;
    const record = await UPDATE_DB_ID(
      PRODUCTITEMSREVIEWMODEL,
      id,
      data,
      fields
    );
    if (record) {
      console.log("Product Item Review Updated", { record });
      return res.status(StatusCodes.OK).send(record);
    } else {
      console.log("Product Item Review Not Updated", { record });
      return res
        .status(StatusCodes.NOT_FOUND)
        .send("Product Item Review Not Updated");
    }
  } catch (error) {
    console.log("Error Updating Product", { error });
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send("Internal Server Error");
  }
};

const deleteProductItemReviewById = async (req, res) => {
  try {
    const id = req.params.id;
    const record = await DELETE_DB_ID(PRODUCTITEMSREVIEWMODEL, id);
    if (record) {
      console.log("Product Item Review Deleted", { record });

      const productRecord = await READ_DB_ID(
        PRODUCTITEMSMODEL,
        record.product_item_id
      );

      if (!productRecord) {
        console.log("Product Item Review Not Found", { productRecord });
        return res
          .status(StatusCodes.NOT_FOUND)
          .send("Product Item Review Not Found");
      }

      const products = productRecord.product_item_reviews;

      const updatedReviews = products.filter(
        (product) => product.toString() !== record._id.toString()
      );

      const updatedRating =
        (productRecord.product_item_rating * products.length -
          record.product_item_rating) /
        (products.length - 1);

      const updatedProductRecord = await UPDATE_DB_ID(
        PRODUCTITEMSMODEL,
        record.product_item_id,
        {
          product_item_reviews: updatedReviews,
          product_item_rating: updatedRating,
        },
        fields
      );

      if (updatedProductRecord) {
        console.log("Product Item Review Updated", {
          updatedProductRecord,
        });
      }

      return res.status(StatusCodes.OK).send("Product Item Review Deleted");
    } else {
      console.log("Product Item Review Not Deleted", { record });
      return res
        .status(StatusCodes.NOT_FOUND)
        .send("Product Item Review Not Deleted");
    }
  } catch (error) {
    console.log("Error Deleting Product", { error });
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send("Internal Server Error");
  }
};

export {
  createProductItemReview as CREATE_PRODUCT_ITEM_REVIEW,
  readProductItemReview as READ_PRODUCT_ITEM_REVIEW,
  readProductItemReviewById as READ_PRODUCT_ITEM_REVIEW_ID,
  updateProductItemReviewById as UPDATE_PRODUCT_ITEM_REVIEW_ID,
  deleteProductItemReviewById as DELETE_PRODUCT_ITEM_REVIEW_ID,
};
