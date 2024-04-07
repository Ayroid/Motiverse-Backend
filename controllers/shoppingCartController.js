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
  // CREATE_DB,
  READ_DB,
  READ_DB_ID,
  UPDATE_DB_ID,
  // DELETE_DB_ID,
} from "./databaseController.js";

// MODEL IMPORT
import { SHOPPINGCARTSMODEL } from "../models/shoppingCartModel.js";

// CONTROLLERS
const readShoppingCart = async (req, res) => {
  try {
    const query = req.query.id ? { _id: req.query.id } : {};

    const record = await READ_DB(SHOPPINGCARTSMODEL, query, fields);

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

const readShoppingCartById = async (req, res) => {
  try {
    const id = req.params.id;

    const record = await READ_DB_ID(SHOPPINGCARTSMODEL, id, fields);
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

const addProductToShoppingCart = async (req, res) => {
  try {
    const cartId = req.params.id;
    const { cart_item } = req.body;

    console.log(cart_item);

    const shoppingCart = await READ_DB_ID(SHOPPINGCARTSMODEL, cartId, fields);

    if (!shoppingCart) {
      console.log("Shopping Cart Not Found", { shoppingCart });
      return res.status(StatusCodes.NOT_FOUND).send("Shopping Cart Not Found");
    }

    let productItems = [];

    if (shoppingCart.cart_items === undefined) {
      productItems = cart_item;
    } else {
      productItems = [...shoppingCart.cart_items, cart_item];
    }

    const updatedCart = {
      cart_items: productItems,
      subtotal: shoppingCart.subtotal + cart_item.cart_item_price,
    };

    const updatedCartRecord = await UPDATE_DB_ID(
      SHOPPINGCARTSMODEL,
      cartId,
      { cart_items: updatedCart },
      fields
    );

    if (updatedCartRecord) {
      console.log("Product Added to Shopping Cart", { updatedCartRecord });
      return res.status(StatusCodes.OK).send(updatedCartRecord);
    } else {
      console.log("Error Adding Product to Shopping Cart", {
        updatedCartRecord,
      });
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .send("Internal Server Error");
    }
  } catch (error) {
    console.log("Error Adding Product to Shopping Cart", { error });
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send("Internal Server Error");
  }
};

const removeProductFromShoppingCart = async (req, res) => {
  try {
    const cartId = req.params.id;
    const { cart_item_id } = req.body;

    const shoppingCart = await READ_DB_ID(SHOPPINGCARTSMODEL, cartId, fields);

    if (!shoppingCart) {
      console.log("Shopping Cart Not Found", { shoppingCart });
      return res.status(StatusCodes.NOT_FOUND).send("Shopping Cart Not Found");
    }

    const cartItemExists = shoppingCart.product_items.find(
      (item) => item.cart_item_id === cart_item_id
    );

    if (!cartItemExists) {
      console.log("Product Not in Shopping Cart", { cartItemExists });
      return res.status(StatusCodes.OK).send("Product Not in Shopping Cart");
    }

    const updatedCart = {
      product_items: shoppingCart.product_items.filter(
        (item) => item.cart_item_id !== cart_item_id
      ),
      subtotal: shoppingCart.subtotal - cartItemExists.cart_item_price,
    };

    const updatedCartRecord = await UPDATE_DB_ID(
      SHOPPINGCARTSMODEL,
      cartId,
      { cart_items: updatedCart },
      fields
    );

    if (updatedCartRecord) {
      console.log("Product Removed from Shopping Cart", { updatedCartRecord });
      return res.status(StatusCodes.OK).send(updatedCartRecord);
    } else {
      console.log("Error Removing Product from Shopping Cart", {
        updatedCartRecord,
      });
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .send("Internal Server Error");
    }
  } catch (error) {
    console.log("Error Removing Product from Shopping Cart", { error });
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send("Internal Server Error");
  }
};

const updateShoppingCartById = async (req, res) => {
  try {
    const id = req.params.id;
    const { shoppingCart } = req.body;

    const updatedRecord = await UPDATE_DB_ID(
      SHOPPINGCARTSMODEL,
      id,
      shoppingCart,
      fields
    );

    if (updatedRecord) {
      console.log("Product Item Updated", { updatedRecord });
      return res.status(StatusCodes.OK).send(updatedRecord);
    } else {
      console.log("Product Item Not Found", { updatedRecord });
      return res.status(StatusCodes.NOT_FOUND).send("Product Item Not Found");
    }
  } catch (error) {
    console.log("Error Updating Product Item", { error });
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send("Internal Server Error");
  }
};

export {
  readShoppingCart as READ_SHOPPING_CART,
  readShoppingCartById as READ_SHOPPING_CART_ID,
  addProductToShoppingCart as ADD_PRODUCT_TO_SHOPPING_CART,
  removeProductFromShoppingCart as REMOVE_PRODUCT_FROM_SHOPPING_CART,
  updateShoppingCartById as UPDATE_SHOPPING_CART_ID,
};
