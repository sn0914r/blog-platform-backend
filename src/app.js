const express = require("express");
const cors = require("cors");
const helmet = require("helmet");

const publicRoutes = require("./routes/public.route");
const userRoutes = require("./routes/user.route");

const errorMiddleware = require("./middlewares/error.middleware");

const app = express();

app.use(cors());
app.use(helmet());
app.use(express.json());

app.use(publicRoutes);
app.use("/user", userRoutes);

app.get("/health", (_req, res) => res.send("OK"));

app.use(errorMiddleware);
module.exports = app;
