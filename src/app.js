const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const cookieParser = require("cookie-parser");

const authRoutes = require("./routes/auth.routes");
const postRoutes = require("./routes/posts.routes");

const errorMiddleware = require("./middlewares/error.middleware");

const app = express();

app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(cookieParser());

app.use("/auth", authRoutes);
app.use(postRoutes);

app.get("/health", (_req, res) => res.send("OK"));

app.use(errorMiddleware);
module.exports = app;
