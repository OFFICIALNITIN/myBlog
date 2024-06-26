const db = require("../db.js");
const jwt = require("jsonwebtoken");

const getPosts = async (req, res) => {
  const q = req.query.cat
    ? "SELECT * FROM posts WHERE cat=?"
    : "SELECT * FROM posts";

  db.query(q, [req.query.cat], (err, data) => {
    if (err) return res.status(500).json(err);

    return res.status(200).json(data);
  });
};

const getPost = async (req, res) => {
  const q =
    "SELECT `p`.`id`,`username`, `title`,`desc`,`p`.`img`, `u`.`img` AS userImage,`cat`,`date` FROM users u JOIN posts p ON u.id = p.uid WHERE p.id = ? ";

  try {
    const data = await new Promise((resolve, reject) => {
      db.query(q, [req.params.id], (err, data) => {
        if (err) reject(err);
        resolve(data);
      });
    });

    return res.status(200).json(data[0]);
  } catch (error) {
    return res.status(500).json(error);
  }
};

const addPost = async (req, res) => {
  const token = req.cookies.access_token;
  if (!token) return res.status(401).json("Not authenticated!");

  jwt.verify(token, "jwtkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    const q =
      "INSERT INTO posts(`title`,`desc`,`img`,`cat`,`date`,`uid`) VALUES (?)";

    const values = [
      req.body.title,
      req.body.desc,
      req.body.img,
      req.body.cat,
      req.body.date,
      userInfo.id,
    ];

    db.query(q, [values], (err, data) => {
      if (err) return res.status(500).json(err);

      return res.json("Post has been created!");
    });
  });
};

const deletePost = async (req, res) => {
  const token = req.cookies.access_token;
  if (!token) return res.status(401).json("Not authenticated!");

  jwt.verify(token, "jwtkey", (err, userInfo) => {
    if (err) res.status(403).json("Token is not valid!");

    const postId = req.params.id;

    const q = "DELETE FROM posts WHERE `id` = ? AND `uid` = ?";

    db.query(q, [postId, userInfo.id], (err, data) => {
      if (err) return res.status(403).json("You can delete only your post!");

      return res.json("Post has been deleted!");
    });
  });
};
const updatePost = async (req, res) => {
  const token = req.cookies.access_token;
  console.log(token);
  if (!token) return res.status(401).json("Not authenticated!");

  jwt.verify(token, "jwtkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    const postId = req.params.id;
    const q =
      "UPDATE posts SET `title`=?, `desc`=?, `img`=?, `cat`=? WHERE `id`=? AND  `uid`=? ";

    const values = [req.body.title, req.body.desc, req.body.img, req.body.cat];

    db.query(q, [...values, postId, userInfo.id], (err, data) => {
      if (err) return res.status(500).json(err);

      return res.json("Post has been updated!");
    });
  });
};

module.exports = {
  getPosts,
  getPost,
  deletePost,
  addPost,
  updatePost,
};
