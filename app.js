const express = require("express");
const { getTopics } = require("./controllers/topics.controller");
const {
  getArticleById,
  getArticles,
  getComments,
  patchVotes,
} = require("./controllers/article.controller");
const cors = require("cors");
const { getUsers } = require("./controllers/user.controller");

const app = express();

app.use(cors());

app.use(express.json());

app.get("/api/topics", getTopics);

app.get("/api/articles/:article_id", getArticleById);

app.get("/api/articles", getArticles);

app.get("/api/users", getUsers);

app.get("/api/articles/:article_id/comments", getComments);

app.patch("/api/articles/:article_id", patchVotes);

// Errors
app.use((err, req, res, next) => {
  if (err.code === "22P02") res.status(400).send({ msg: "Bad request" });
  if (err.status && err.msg) {
    return res.status(404).send({ msg: "Invalid id" });
  }
});

module.exports = app;
