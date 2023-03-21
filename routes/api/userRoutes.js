const router = require("express").Router();
const {
  getUsers,
  getSingleUser,
  createUser,
  updateUser,
  deleteUser,
  addFriend,
  removeFriend,
} = require("../../controllers/userController.js");

/**
 * [GET] /api/users
 * [POST] /api/users (with req.body)
 */
router.route("/").get(getUsers).post(createUser);

/**
 * [GET] /api/users/:userId
 * [PUT] /api/users/:userId (with req.body)
 * [DELETE] /api/users/:userId
 */
router.route("/:userId").get(getSingleUser).put(updateUser).delete(deleteUser);

/**
 * [POST] /api/users/:userId/friends/:friendId
 */
router.route(":userId/friends/:friendId").post(addFriend).delete(removeFriend);

module.exports = router;
