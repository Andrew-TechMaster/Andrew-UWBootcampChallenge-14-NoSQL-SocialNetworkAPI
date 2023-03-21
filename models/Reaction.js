const { Schema, Types } = require("mongoose");
const { dateFormatter } = require("../utils/helpers");

/**
 * Schema to create Reaction model
 * This will not be a model, but rather will be used as the reaction field's subdocument schema in the Thought model.
 */
const reactionSchema = new Schema(
  {
    reactionId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId(),
    },
    reactionBody: {
      type: String,
      required: true,
      maxlength: 280,
    },
    username: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: dateFormatter,
    },
  },
  {
    toJSON: {
      // To run getters when converting a document to JSON, set the toJSON.getters option to true in your schema
      getters: true,
    },
    id: false,
  }
);

module.exports = reactionSchema;
