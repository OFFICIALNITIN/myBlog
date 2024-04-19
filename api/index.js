const express = require("express");
const postRouter = require("./routes/posts.js");
const userRouter = require("./routes/users.js");
const authRouter = require("./routes/auth.js");
const cookieParser = require("cookie-parser");
const multer = require("multer");

const app = express();

app.use(express.json());
app.use(cookieParser());

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "../client/public/upload");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  },
});

const upload = multer({ storage });

app.post("/api/upload", upload.single("file"), function (req, res) {
  const file = req.file;
  res.status(200).json(file.filename);
});

app.use("/api/posts", postRouter);
app.use("/api/users", userRouter);
app.use("/api/auth", authRouter);

app.get("/test", (req, res) => {
  res.json("It works!");
});

app.listen(4000, () => {
  console.log("Server running on port 4000");
});
