const DB = require("../db/mockDB");
const AppError = require("../errors/AppError");
const generateRandomString = require("../utils/randomStringGenerator");

const getPost = (uid, id) => {
  if (!id) throw new AppError("Post not found", 404);

  const post = DB.find((post) => post.id === id);

  if (post.status === "published") return post;
  if (post.authorId === uid) return post;

  throw new AppError("Not authorized", 400);
};

const getPosts = async (uid) => {
  if (uid) {
    return DB.filter((post) => post.authorId === uid);
  }

  return DB.filter((post) => post.status === "published");
};

const createPost = async ({ title, content, tags, status, authorId }) => {
  const timestamp = Date.now();

  DB.push({
    id: generateRandomString(),
    title,
    content,
    tags,
    status,
    authorId,
    createdAt: timestamp,
    updatedAt: timestamp,
  });

  return DB[DB.length - 1];
};

const updatePost = ({id, uid, updates}) => {
  const post = DB.find((post) => post.id === id);
  if (post.authorId !== uid) throw new AppError("Not authorized", 400);
  post.updatedAt = Date.now();
  Object.assign(post, updates);
  return post;

};

const deletePost = ({id, uid}) => {
  const post = DB.find((post) => post.id === id);
  if (post.authorId !== uid) throw new AppError("Not authorized", 400);
  DB.splice(DB.indexOf(post), 1);
  return "deleted";
};

module.exports = {
  getPost,
  getPosts,
  createPost,
  updatePost,
  deletePost,
};
