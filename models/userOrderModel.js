import mongoose from "mongoose";

// SCHEMA

const userOrderSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    order_items: [
      {
        product_item_id: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "productItems",
        },
        quantity: {
          type: Number,
          required: true,
        },
      },
    ],
    order_total: {
      type: Number,
      required: true,
    },
    order_status: {
      type: String,
      default: "ordered",
    },
    order_date: {
      type: Date,
      default: Date.now,
    },
    order_delivery_date: {
      type: Date,
      default: Date.now,
    },
    order_payment_method: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "userPaymentMethods",
      default: null,
    },
  },
  { timestamps: true }
);

// MODEL

const userOrdersModel = mongoose.model("userOrders", userOrderSchema);

export { userOrdersModel as USERORDERMODEL };
