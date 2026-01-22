const {
  createPost,
  getPosts,
  getPost,
  updatePost,
  deletePost,
} = require("../services/posts.service");

/**
 * Get all posts
 */
const getPostsController = async (req, res) => {
  const uid = req?.user?.uid;
  const posts = await getPosts(uid);

  res.status(200).json(posts);
  /**
   * filter: {status: published} for public
   * filter: {authorId} for private
   */
};

/**
 * Get a specific post
 */
const getPostController = async (req, res) => {
  const uid = req?.user?.uid;
  const id = req.params.id;

  const post = await getPost(uid, id);

  res.status(200).json(post);
};

/**
 * Create a new post
 */
const createPostController = async (req, res) => {
  const { title, content, tags, status } = req.body;
  const { uid } = req.user;

  const post = await createPost({
    title,
    content,
    tags,
    status,
    authorId: uid,
  });

  res.status(201).send(post);
};

/**
 * Update a post
 */

const updatePostController = async (req, res) => {
  const { id } = req.params;
  const { uid } = req.user;
  const updates = req.body;

  const post = await updatePost({ id, uid, updates });

  res.status(200).send(post);
};

const deletePostController = async (req, res) => {
  const { id } = req.params;
  const { uid } = req.user;

  const post = await deletePost({ id, uid });
  res.status(200).json({ post, message: "deleted" });
};

module.exports = {
  getPostsController,
  getPostController,
  createPostController,
  updatePostController,
  deletePostController,
};
