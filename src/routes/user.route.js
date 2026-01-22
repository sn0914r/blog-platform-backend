const express = require("express");
const {
  getPostsController,
  createPostController,
  getPostController,
  updatePostController,
  deletePostController,
} = require("../controllers/posts.controller");
const {
  validateBody,
  validateFiles,
} = require("../middlewares/validate.middleware");
const verifyAuth = require("../middlewares/auth.middleware");
const { postSchema, postSchemaUPDATE } = require("../validations/post.schema");
const parseMultipartJson = require("../middlewares/parseMultiPart.middleware");
const upload = require("../middlewares/multer.middleware");

const router = express.Router();

router.post(
  "/posts",
  verifyAuth,
  upload,
  validateFiles,
  parseMultipartJson,
  validateBody(postSchema),
  createPostController,
);

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
