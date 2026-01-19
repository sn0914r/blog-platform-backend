const express = require("express");
const {
  getPostsController,
  createPostController,
  getPostController,
  updatePostController,
  deletePostController,
} = require("../controllers/posts.controller");
const { validateBody } = require("../middlewares/validate.middleware");
const { postSchema, postSchemaUPDATE } = require("../validations/post.schema");

const router = express.Router();

router.post("/posts", validateBody(postSchema), createPostController);

router.get("/posts", getPostsController);
router.get("/posts/:id", getPostController);

router.update(
  "/posts/:id",
  validateBody(postSchemaUPDATE),
  updatePostController,
);

router.delete("/posts/:id", deletePostController);

module.exports = router;
