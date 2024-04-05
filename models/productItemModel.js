import mongoose from "mongoose";

// SCHEMA

const productItemSchema = new mongoose.Schema(
  {
    product_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "productCategories",
      required: true,
    },
    product_item_name: {
      type: String,
      required: true,
    },
    product_item_description: {
      type: String,
      required: true,
    },
    product_item_image: {
      type: String,
      required: true,
    },
    product_item_price: {
      type: String,
      required: true,
    },
    product_item_stock_quantity: {
      type: Number,
      required: true,
    },
    product_item_rating: {
      type: Number,
      required: true,
    },
    product_item_reviews: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "productReviews",
      },
    ],
  },
  { timestamps: true }
);

// MODEL

const productItemsModel = mongoose.model("productItems", productItemSchema);

export { productItemsModel as PRODUCTITEMSMODEL };
