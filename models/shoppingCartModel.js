import mongoose from "mongoose";

// SCHEMA

const cartItemSchema = new mongoose.Schema({
  cart_item_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "productItems",
    required: true,
  },
  cart_item_quantity: {
    type: Number,
    required: true,
    default: 1,
  },
  cart_item_price: {
    type: Number,
    required: true,
  },
});

const shoppingCartSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    product_items: [cartItemSchema],
    subtotal: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

// MODEL

const userModel = mongoose.model("shoppingCarts", shoppingCartSchema);

export { userModel as USERMODEL };
