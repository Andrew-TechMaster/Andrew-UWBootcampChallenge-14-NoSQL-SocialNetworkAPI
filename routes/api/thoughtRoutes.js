const router = require("express").Router();
const {
  getThoughts,
  getSingleThought,
  createThought,
  updateThought,
  deleteThought,
  addReaction,
  removeReaction,
} = require("../../controllers/thoughtController");

/**
 * [GET] /api/thoughts
 * [POST] /api/thoughts (with req.body)
 */
router.route("/").get(getThoughts).post(createThought);

/**
 * [GET] /api/thoughts/:userId
 * [PUT] /api/thoughts/:userId (with req.body)
 * [DELETE] /api/thoughts/:userId
 */
router
  .route("/:userId")
  .get(getSingleThought)
  .put(updateThought)
  .delete(deleteThought);

/**
 * [POST] /api/thoughts/:thoughtId/reactions
 * [DELETE] /api/thoughts/:thoughtId/reactions
 */
router.route("/:thoughtId/reactions").post(addReaction).delete(removeReaction);

module.exports = router;
