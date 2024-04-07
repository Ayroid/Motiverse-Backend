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
import { USERMODEL } from "../models/userModel.js";
import { PRODUCTITEMSMODEL } from "../models/productItemModel.js";
import { USERORDERMODEL } from "../models/userOrderModel.js";

// CONTROLLERS
const createUserOrder = async (req, res) => {
  try {
    const {
      user_id,
      order_items,
      order_total,
      order_status,
      order_date,
      order_delivery_date,
      order_payment_method,
    } = req.body;

    const query = { user_id: user_id, order_items: order_items };

    let record = await READ_DB(USERORDERMODEL, query);
    if (record.length > 0) {
      return res.status(StatusCodes.CONFLICT).send("User Order already exists");
    }

    // CHECK IF ALL PRODUCT ITEM IDS EXIST

    for (const orderItem of order_items) {
      const productItemRecord = await READ_DB_ID(
        PRODUCTITEMSMODEL,
        orderItem.product_item_id
      );

      if (!productItemRecord) {
        console.log("Product Item Not Found", { productItemRecord });
        return res.status(StatusCodes.NOT_FOUND).send("Product Item Not Found");
      }
    }

    record = await CREATE_DB(USERORDERMODEL, {
      user_id,
      order_items,
      order_total,
      order_status,
      order_date,
      order_delivery_date,
      order_payment_method,
    });

    if (record) {
      console.log("User Order Created", { record });

      const userRecord = await READ_DB_ID(USERMODEL, user_id);

      if (!userRecord) {
        console.log("User Order Not Found", { userRecord });
        await DELETE_DB_ID(USERORDERMODEL, { _id: record._id });
        return res.status(StatusCodes.NOT_FOUND).send("User Order Not Found");
      }

      for (const orderItem of order_items) {
        const productItemRecord = await READ_DB_ID(
          PRODUCTITEMSMODEL,
          orderItem.product_item_id
        );

        if (!productItemRecord) {
          console.log("Product Item Not Found", { productItemRecord });
          await DELETE_DB_ID(USERORDERMODEL, { _id: record._id });
          return res
            .status(StatusCodes.NOT_FOUND)
            .send("Product Item Not Found");
        }

        const productStockQuantity =
          productItemRecord.product_item_stock_quantity;

        const updatedProductItemRecord = await UPDATE_DB_ID(
          PRODUCTITEMSMODEL,
          orderItem.product_item_id,
          {
            product_item_stock_quantity:
              parseInt(productStockQuantity, 10) -
              parseInt(orderItem.quantity, 10),
          },
          fields
        );

        if (updatedProductItemRecord) {
          console.log("Product Item Updated", {
            updatedProductItemRecord,
          });
        } else {
          console.log("Product Item Not Updated", {
            updatedProductItemRecord,
          });
        }
      }

      const userOrders = userRecord.orders;
      let userShoppingCart = userRecord.shopping_cart;

      userOrders.push(record._id);

      console.log("USER", { userRecord });

      if (userShoppingCart.length !== 0) {
        userShoppingCart = userShoppingCart.filter(
          (product) =>
            !order_items.some(
              (orderItem) =>
                orderItem.product_item_id.toString() ===
                product.product_item_id.toString()
            )
        );
      }

      const updatedProductCategoryRecord = await UPDATE_DB_ID(
        USERMODEL,
        userRecord,
        {
          orders: userOrders,
          shopping_cart: userShoppingCart,
        },
        fields
      );

      if (updatedProductCategoryRecord) {
        console.log("User Order Updated", {
          updatedProductCategoryRecord,
        });
      } else {
        console.log("User Order Not Updated", {
          updatedProductCategoryRecord,
        });
      }

      return res.status(StatusCodes.CREATED).send("User Order Created");
    } else {
      console.log("Error Creating User Order", { error });
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .send("Internal Server Error");
    }
  } catch (error) {
    console.log("Error Creating User Order", { error });
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send("Internal Server Error");
  }
};

const readUserOrder = async (req, res) => {
  try {
    const query = req.query.id ? { _id: req.query.id } : {};

    const record = await READ_DB(USERORDERMODEL, query, fields);

    if (record.length > 0) {
      console.log("User Order Found", { record });
      return res.status(StatusCodes.OK).send(record);
    } else {
      console.log("User Order Not Found", { record });
      return res.status(StatusCodes.NOT_FOUND).send("User Order Not Found");
    }
  } catch (error) {
    console.log("Error Reading User Order", { error });
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send("Internal Server Error");
  }
};

const readUserOrderById = async (req, res) => {
  try {
    const id = req.params.id;

    const record = await READ_DB_ID(USERORDERMODEL, id, fields);
    if (record) {
      console.log("User Order Found", { record });
      return res.status(StatusCodes.OK).send(record);
    } else {
      console.log("User Order Not Found", { record });
      return res.status(StatusCodes.NOT_FOUND).send("User Order Not Found");
    }
  } catch (error) {
    console.log("Error Reading User Order", { error });
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send("Internal Server Error");
  }
};

const updateUserOrderById = async (req, res) => {
  try {
    const id = req.params.id;
    const data = req.body;
    const record = await UPDATE_DB_ID(USERORDERMODEL, id, data, fields);
    if (record) {
      console.log("User Order Updated", { record });
      return res.status(StatusCodes.OK).send(record);
    } else {
      console.log("User Order Not Updated", { record });
      return res.status(StatusCodes.NOT_FOUND).send("User Order Not Updated");
    }
  } catch (error) {
    console.log("Error Updating User Order", { error });
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send("Internal Server Error");
  }
};

const deleteUserOrderById = async (req, res) => {
  try {
    const id = req.params.id;
    const record = await DELETE_DB_ID(USERORDERMODEL, id);
    if (record) {
      console.log("User Order Deleted", { record });

      const userRecord = await READ_DB_ID(USERMODEL, record.user_id);

      if (!userRecord) {
        console.log("User Order Not Found", { userRecord });
        return res.status(StatusCodes.NOT_FOUND).send("User Order Not Found");
      }

      const orders = userRecord.orders;

      const updatedOrders = orders.filter(
        (order) => order.toString() !== record._id.toString()
      );

      const updatedUserRecord = await UPDATE_DB_ID(
        USERMODEL,
        record.product_category_id,
        {
          orders: updatedOrders,
        },
        fields
      );

      if (updatedUserRecord) {
        console.log("User Order Updated", {
          updatedUserRecord,
        });
      }

      return res.status(StatusCodes.OK).send("User Order Deleted");
    } else {
      console.log("User Order Not Deleted", { record });
      return res.status(StatusCodes.NOT_FOUND).send("User Order Not Deleted");
    }
  } catch (error) {
    console.log("Error Deleting User Order", { error });
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send("Internal Server Error");
  }
};

export {
  createUserOrder as CREATE_USER_ORDER,
  readUserOrder as READ_USER_ORDER,
  readUserOrderById as READ_USER_ORDER_ID,
  updateUserOrderById as UPDATE_USER_ORDER_ID,
  deleteUserOrderById as DELETE_USER_ORDER_ID,
};
