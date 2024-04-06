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
    parent_category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "productCategories",
      default: null,
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

const productCategoryModel = mongoose.model(
  "productCategories",
  productCategorySchema
);

export { productCategoryModel as PRODUCTCATEGORYMODEL };
