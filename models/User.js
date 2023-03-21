const { Schema, model } = require("mongoose");

/**
 * Schema to create a User model
 */
const userSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please fill a valid email address",
      ],
    },
    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: "Thought",
      },
    ],
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  {
    toJSON: {
      // Here we are indicating that we want virtuals to be included with our response, overriding the default behavior
      virtuals: true,
    },
    // If you don't want an id getter added to your schema, you may disable it by passing this option at schema construction time.
    id: false,
  }
);

/**
 * Create a virtual property `friendCount`
 * that retrieves the length of the user's `friends` array field on query.
 */
userSchema
  .virtual("friendCount")
  // Getter
  .get(() => this.friends.length);

/**
 * Initialize our User model
 */
const User = model("user", userSchema);

module.exports = User;
