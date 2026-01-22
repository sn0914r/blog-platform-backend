const { Schema, model } = require("mongoose");

const PostSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    content: String,
    authorId: {
      type: String,
      required: true,
    },
    tags: {
      type: [String],
      required: false,
    },
    status: {
      type: String,
      enum: ["draft", "published"],
      default: "draft",
    },
  },
  { timestamps: true },
);

const PostModel = model("Posts", PostSchema);

module.exports = { PostModel };
