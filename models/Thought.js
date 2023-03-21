const { Schema, model } = require("mongoose");

/**
 * Helper func to format the date
 *
 * @param {Date} d The date to be formatted.
 * @return {string} datestring, Month/Day/Year - H:M.
 */
function dateFormatter(d) {
  var datestring = `${
    d.getMonth() + 1
  }/${d.getDate()}/${d.getFullYear()} - ${d.getHours()}:${d.getMinutes()}`;

  return datestring;
}

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
    },
    username: {
      type: String,
      required: true,
      get: dateFormatter,
    },
    reactions: [reactionSchema],
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
  .get(() => this.reactions.length);

/**
 * Initialize our Thought model
 */
const Thought = model("thought", thoughtSchema);

module.exports = Thought;
