const router = require("express").Router();
const { getUsers } = require("../../controllers/userController.js");

/**
 * [GET] /api/users
 *
 */
router.route("/").get(getUsers);

module.exports = router;
