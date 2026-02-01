const AppError = require("../errors/AppError");
const { uploadImages } = require("../integrations/uploads.service");
const { PostModel } = require("../modals/Post");

/**
 * @desc Retrives a specific post
 *
 * Behavior:
 *  - Retrives published posts for authenticated and unauthenticated users
 *  - Retrives draft posts only for the post owner
 *
 * Fails when:
 *  - Post not found
 *  - Not authorized (for draft posts)
 *
 * @returns {Promise<Post>}
 */
const getPost = async (uid, id) => {
  if (!id) throw new AppError("Post not found", 404);

  const post = await PostModel.findById(id);
  if (!post) throw new AppError("Post not found", 404);

  if (post.status === "published") return post;
  if (post.authorId === uid) return post;

  throw new AppError("Not authorized", 400);
};

/**
 * @desc Retrives all posts
 *
 * Behavior:
 *  - Retrives published posts for authenticated and unauthenticated users
 *  - Retrives published and draft posts only for the posts owner
 *
 * @returns {Promise<Post[]>}
 */
const getPosts = async (uid) => {
  let posts;

  if (uid) {
    posts = await PostModel.find({ authorId: uid }).sort({ createdAt: -1 });
    return posts;
  }

  posts = await PostModel.find({ status: "published" }).sort({ createdAt: -1 });
  return posts;
};

/**
 * @desc Creates a new post
 *
 * Side Effects:
 *  - Uploads images to cloudinary
 *  - Creates a new post
 *
 * @returns {Promise<Post>}
 */
const createPost = async ({
  title,
  content,
  tags,
  status,
  authorId,
  files,
}) => {
  let uploads = [];
  if (files || files.length > 0) {
    uploads = await uploadImages(files);
  }
  const post = await PostModel.create({
    title,
    content,
    tags,
    status,
    authorId,
    images: uploads,
  });

  return post;
};

/**
 * @desc Updates a post only for the post owner
 *
 * Side Effects:
 *  - Updates a post
 *
 * Fails when:
 *  - Post not found
 *
 * @returns {Promise<Post>}
 */
const updatePost = async ({ id, uid, updates }) => {
  const post = await PostModel.findOneAndUpdate(
    { _id: id, authorId: uid },
    { $set: updates },
    { new: true, runValidators: true },
  );

  if (!post) throw new AppError("Post not found", 404);
  return post;
};

/**
 * @desc Deletes a post only for the post owner
 *
 * Side Effects:
 *  - Deletes a post
 *
 * Fails when:
 *  - Post not found
 *
 * @returns {Promise<Post>}
 */
const deletePost = async ({ id, uid }) => {
  const deletedPost = await PostModel.findOneAndDelete({
    _id: id,
    authorId: uid,
  });

  if (!deletedPost) throw new AppError("Post not found", 404);
  return deletedPost;
};

module.exports = {
  getPost,
  getPosts,
  createPost,
  updatePost,
  deletePost,
};
