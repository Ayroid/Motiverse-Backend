import mongoose from "mongoose";

// SCHEMA

const productSchema = new mongoose.Schema(
  {
    product_category_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "productCategories",
      required: true,
    },
    product_name: {
      type: String,
      required: true,
    },
    product_description: {
      type: String,
      required: true,
    },
    product_image: {
      type: String,
      required: true,
    },
    product_price_range: {
      type: String,
      required: true,
    },
    product_stock_quantity: {
      type: Number,
      required: true,
    },
    product_rating: {
      type: Number,
      required: true,
    },
    product_items: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "productItems",
      },
    ],
  },
  { timestamps: true }
);

// MODEL

const productsModel = mongoose.model("products", productSchema);

export { productsModel as PRODUCTSMODEL };
