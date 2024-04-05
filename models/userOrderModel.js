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
        type: mongoose.Schema.Types.ObjectId,
        ref: "productItems",
      },
    ],
    order_total: {
      type: Number,
      required: true,
    },
    order_status: {
      type: String,
      required: true,
      default: "pending",
    },
    order_date: {
      type: Date,
      required: true,
    },
    order_delivery_date: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true }
);

// MODEL

const userOrdersModel = mongoose.model("userOrders", userOrderSchema);

export { userOrdersModel as USERORDERMODEL };
