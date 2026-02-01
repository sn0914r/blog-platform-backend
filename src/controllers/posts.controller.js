const {
  createPost,
  getPosts,
  getPost,
  updatePost,
  deletePost,
} = require("../services/posts.service");

/**
 * @desc Retrives posts for authenticated and unauthenticated users
 *
 * @route GET /posts
 * @route GET /user/posts
 * @access Public
 */
const getPostsController = async (req, res) => {
  const uid = req?.user?.uid;
  const posts = await getPosts(uid);

  res.status(200).json(posts);
};

/**
 * @desc Retrives a specific post for authenticated and unauthenticated users
 *
 * @returns {Promise<Post>}
 * @access Public
 */
const getPostController = async (req, res) => {
  const uid = req?.user?.uid;
  const id = req.params.id;

  const post = await getPost(uid, id);

  res.status(200).json(post);
};

/**
 * @desc Creates a new post
 *
 * Preconditions:
 *  - Request is authenticated
 *  - req.body contains valid title, content, tags, status
 *
 * @route POST /user/posts
 * @access Private
 */
const createPostController = async (req, res) => {
  const { title, content, tags, status } = req.body;
  const { uid } = req.user;
  const { files } = req;

  const post = await createPost({
    title,
    content,
    tags,
    status,
    authorId: uid,
    files,
  });

  res.status(201).send(post);
};

/**
 * @desc Updates a post
 * 
 * Preconditions:
 *  - Request is authenticated
 *  - req.params contains valid post id
 *  - req.body contains valid updates
 * 
 * @route PATCH /user/posts/:id
 * @access Private
 */

const updatePostController = async (req, res) => {
  const { id } = req.params;
  const { uid } = req.user;
  const updates = req.body;

  const post = await updatePost({ id, uid, updates });

  res.status(200).send(post);
};

/**
 * @desc Deletes a post
 * 
 * Preconditions:
 *  - Request is authenticated
 *  - req.params contains valid post id
 * 
 * @route DELETE /user/posts/:id
 * @access Private
 */
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
