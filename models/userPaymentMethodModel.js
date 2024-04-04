import mongoose from "mongoose";

// SCHEMA

const userPaymentMethodSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    payment_method_type: {
      type: String,
      required: true,
    },
    payment_method_name: {
      type: String,
      required: true,
    },
    payment_method_account_number: {
      type: String,
      required: true,
    },
    payment_method_expiry_date: {
      type: Date,
      required: true,
    },
    is_default: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

// MODEL

const userModel = mongoose.model("productQueries", userPaymentMethodSchema);

export { userModel as USERMODEL };
