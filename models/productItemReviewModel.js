import mongoose from "mongoose";

// SCHEMA

const productItemReviewSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    product_item_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "productItems",
      required: true,
    },
    product_item_rating: {
      type: Number,
      required: true,
    },
    product_item_review: {
      type: String,
      required: true,
    },
    product_item_review_images: [
      {
        type: String,
        required: true,
      },
    ],
  },
  { timestamps: true }
);

// MODEL

const productItemReviewsModel = mongoose.model(
  "productItemReviews",
  productItemReviewSchema
);

export { productItemReviewsModel as PRODUCTITEMSREVIEWMODEL };
