const express = require("express");

const {
  getPostController,
  getPostsController,
} = require("../controllers/posts.controller");

const router = express.Router();

router.get("/posts", getPostsController);
router.get("/posts/:id", getPostController);

module.exports = router;
