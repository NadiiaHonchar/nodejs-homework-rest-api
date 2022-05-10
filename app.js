// 7Q!c_Ga7xwUXX_b
// mongodb+srv://Nadiia:7Q!c_Ga7xwUXX_b@cluster0.mrrli.mongodb.net/test
const express = require("express");
const logger = require("morgan");
const cors = require("cors");
// const multer = require("multer");
// const puth = require("path");
require("dotenv").config();

const contactsRouter = require("./routes/api/contacts");
const userRouter = require("./routes/api/users");
const app = express();
const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

// const publicDir = puth.join(__dirname, "public");
// const multerConfig = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, publicDir);
//   },
//   filename: (req, file, cb) => {
//     cb(null, file.originalename);
//   },
//   limits: {
//     fileSyze: 2048,
//   },
// });

// const upload = multer({
//   storage: multerConfig,
// });

// const DB_HOST = "mongodb+srv://Nadiia:7Q!c_Ga7xwUXX_b@cluster0.mrrli.mongodb.net/db-contacts?retryWrites=true&w=majority"

app.use("/api/users", userRouter);
app.use("/api/contacts", contactsRouter);
// app.use("/api/contacts", upload.single("image"), contactsRouter);

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  const { status = 500, message = "err.message" } = err;
  res.status(status).json({ message: err.message });
});

module.exports = app;
