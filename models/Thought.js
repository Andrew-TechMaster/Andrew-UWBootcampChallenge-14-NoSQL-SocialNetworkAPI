const { Schema, model } = require("mongoose");
const Reaction = require("./Reaction");
const { dateFormatter } = require("../utils/helpers");

/**
 * Schema to create Thought model
 */
const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 280,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: dateFormatter,
    },
    username: {
      type: String,
      required: true,
    },
    reactions: [Reaction],
  },
  {
    // Mongoose supports two Schema options to transform Objects after querying MongoDb: toJSON and toObject.
    toJSON: {
      // Here we are indicating that we want virtuals to be included with our response, overriding the default behavior
      virtuals: true,
      // To run getters when converting a document to JSON, set the toJSON.getters option to true in your schema
      getters: true,
    },
    id: false,
  }
);

/**
 * Create a virtual property `reactionCount`
 * that retrieves the length of the thought's reactions array field on query.
 */
thoughtSchema
  .virtual("reactionCount")
  // Getter
  .get(function () {
    return this.reactions.length;
  });

/**
 * Initialize our Thought model
 */
const Thought = model("thought", thoughtSchema);

module.exports = Thought;
