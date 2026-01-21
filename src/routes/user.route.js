const express = require("express");
const {
  getPostsController,
  createPostController,
  getPostController,
  updatePostController,
  deletePostController,
} = require("../controllers/posts.controller");
const validateBody = require("../middlewares/validate.middleware");
const verifyAuth = require("../middlewares/auth.middleware");
const { postSchema, postSchemaUPDATE } = require("../validations/post.schema");

const router = express.Router();

router.post("/posts", verifyAuth,validateBody(postSchema), createPostController);

router.get("/posts", verifyAuth, getPostsController);
router.get("/posts/:id", verifyAuth, getPostController);

router.patch(
  "/posts/:id",
  verifyAuth,
  validateBody(postSchemaUPDATE),
  updatePostController,
);

router.delete("/posts/:id", verifyAuth, deletePostController);

module.exports = router;
