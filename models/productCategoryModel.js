import mongoose from "mongoose";

// SCHEMA

const productCategorySchema = new mongoose.Schema(
  {
    category_name: {
      type: String,
      required: true,
    },
    category_description: {
      type: String,
      required: true,
    },
    products: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "products",
      },
    ],
  },
  { timestamps: true }
);

// MODEL

const userModel = mongoose.model("productCategories", productCategorySchema);

export { userModel as USERMODEL };
