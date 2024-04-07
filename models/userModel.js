import mongoose from "mongoose";

// SCHEMA

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    payment_methods: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "userPaymentMethods",
      },
    ],
    shopping_cart: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "shoppingCarts",
      default: null,
    },
    orders: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "orders",
      },
    ],
    is_admin: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

// MODEL

const userModel = mongoose.model("users", userSchema);

export { userModel as USERMODEL };
