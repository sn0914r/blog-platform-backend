const getPostsController = (req, res) => {
  // TODO: implement
  /**
   * filter: {status: published} for public
   * filter: {authorId} for private
   */
  res.send("Posts");
};

const getPostController = (req, res) => {
  // TODO: implement
  res.send("Post");
};

const createPostController = (req, res) => {
  // TODO: implement
  res.send("Create Post");
};

const updatePostController = (req, res) => {
  // TODO: implement
  res.send("Update Post");
};

const deletePostController = (req, res) => {
  // TODO: implement
  res.send("Delete Post");
};

module.exports = {
  getPostsController,
  getPostController,
  createPostController,
  updatePostController,
  deletePostController,
};
