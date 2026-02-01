const router = require("express").Router();

const { postSchema, postSchemaUPDATE } = require("../validations/post.schema");

const verifyAuth = require("../middlewares/auth.middleware");
const upload = require("../middlewares/multer.middleware");
const parseMultipartJson = require("../middlewares/parseMultiPart.middleware");
const { validateBody } = require("../middlewares/validate.middleware");

const {
  createPostController,
  updatePostController,
  deletePostController,
  getPostsController,
  getPostController,
} = require("../controllers/posts.controller");

// Public
router.get("/posts", getPostsController);
router.get("/posts/:id", getPostController);

// Private
router.get("/user/posts", verifyAuth, getPostsController);
router.get("/user/posts/:id", verifyAuth, getPostController);
router.post(
  "/user/posts",
  verifyAuth,
  upload,
  parseMultipartJson,
  validateBody(postSchema),
  createPostController,
);
router.patch(
  "/user/posts/:id",
  verifyAuth,
  validateBody(postSchemaUPDATE),
  updatePostController,
);
router.delete("/user/posts/:id", verifyAuth, deletePostController);

module.exports = router;
