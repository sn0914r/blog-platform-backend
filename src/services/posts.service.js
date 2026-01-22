const AppError = require("../errors/AppError");
const { PostModel } = require("../modals/Post");

const getPost = async (uid, id) => {
  if (!id) throw new AppError("Post not found", 404);

  const post = await PostModel.findById(id);
  if (!post) throw new AppError("Post not found", 404);

  if (post.status === "published") return post;
  if (post.authorId === uid) return post;

  throw new AppError("Not authorized", 400);
};

const getPosts = async (uid) => {
  let posts;

  if (uid) {
    posts = await PostModel.find({ authorId: uid }).sort({ createdAt: -1 });
    return posts;
  }

  posts = await PostModel.find({ status: "published" }).sort({ createdAt: -1 });
  return posts;
};

const createPost = async ({ title, content, tags, status, authorId }) => {
  const post = await PostModel.create({
    title,
    content,
    tags,
    status,
    authorId,
  });

  return post;
};

const updatePost = async ({ id, uid, updates }) => {
  const post = await PostModel.findOneAndUpdate(
    { _id: id, authorId: uid },
    { $set: updates },
    { new: true, runValidators: true },
  );

  if (!post) throw new AppError("Post not found", 404);
  return post;
};

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
