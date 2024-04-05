import mongoose from "mongoose";

// SCHEMA

const generalQueriesSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    query_title: {
      type: String,
      required: true,
    },
    query_description: {
      type: String,
      required: true,
    },
    query_status: {
      type: String,
      required: true,
      default: "pending",
    },
    query_initiation_date: {
      type: Date,
      required: true,
    },
    query_completion_date: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true }
);

// MODEL

const generalQueriesModel = mongoose.model(
  "generalQueries",
  generalQueriesSchema
);

export { generalQueriesModel as GENERALQUERIESMODEL };
