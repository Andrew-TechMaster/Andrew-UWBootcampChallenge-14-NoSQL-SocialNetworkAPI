const { User, Thought } = require("../models");

module.exports = {
  /**
   * Get all users
   */
  getUsers(req, res) {
    User.find({})
      .then((users) => res.json(users))
      .catch((err) => res.status(500).json(err));
  },
  /**
   * Get a single user by id
   */
  getSingleUser(req, res) {
    User.findOne({ _id: req.params.userId })
      .select("-__v")
      .then((user) =>
        !user
          ? res.status(404).json({ message: "No user with that ID" })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },
  /**
   * Create a new user
   */
  createUser(req, res) {
    User.create(req.body)
      .then((user) => res.json(user))
      .catch((err) => res.status(500).json(err));
  },
  /**
   * Update a new user by id
   */
  updateUser(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.courseId },
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .then((user) =>
        !user
          ? res.status(404).json({ message: "No user with this id!" })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },
  /**
   * Delete a user and associated thoughts
   */
  deleteUser(req, res) {
    User.findOneAndDelete({ _id: req.params.userId })
      .then((user) =>
        !user
          ? res.status(404).json({ message: "No user with that ID" })
          : Thought.deleteMany({ _id: { $in: user.thoughts } })
      )
      .then(() =>
        res.json({ message: "User and associated thoughts deleted!" })
      )
      .catch((err) => res.status(500).json(err));
  },
  /**
   * Add a friend to a user.
   */
  addFriend(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $addToSet: { friends: req.params.friendId } },
      { runValidators: true, new: true }
    )
      .then((user) =>
        !user
          ? res.status(404).json({ message: "No user with this id!" })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },
  /**
   * Remove user friend. This method finds the user based on ID.
   * It then updates the friends array associated with the user by removing it's friendId from the friends array.
   */
  removeFriend(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.applicationId },
      { $pull: { friends: { tagId: req.params.friendId } } },
      { runValidators: true, new: true }
    )
      .then((application) =>
        !application
          ? res.status(404).json({ message: "No User with this id!" })
          : res.json(application)
      )
      .catch((err) => res.status(500).json(err));
  },
};
