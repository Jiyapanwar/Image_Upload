import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import path from "path";

const app = express();

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

mongoose
  .connect(
    "mongodb+srv://jiyapanwar2424_db_user:bUJ14BXpIOKsgiyw@cluster0.ckqnnfm.mongodb.net/",
    {
      dbName: "ImageUplaod",
    }
  )
  .then(() => console.log("MongoDB Connected..!"))
  .catch((err) => console.log(err));

app.get("/", (req, res) => {
  res.render("index.ejs", { url: null });
});
// jo hume dynamic cheej rakhni hoti hai usko aise curly braces mai we putt and give a intial value

const storage = multer.diskStorage({
  //   destination: "./public/uploads",

  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + path.extname(file.originalname);
    cb(null, file.fieldname + "-" + uniqueSuffix);
  },
});

const upload = multer({ storage: storage });

const imageSchema = new mongoose.Schema({
  filename: String,
  public_id: String,
  imgUrl: String,
});
const File = mongoose.model("cloudinary", imageSchema);

app.post("/upload", upload.single("file"), async (req, res) => {
  const file = req.file.path;
  const cloudinaryRes = await cloudinary.uploader.upload(file, {
    folder: "NodeJs",
  });

  const db = await File.create({
    filename: file.originalname,
    public_id: cloudinaryRes.public_id,
    imageUrl: cloudinaryRes.secure_url,
  });

  res.render("index.ejs", { url: cloudinaryRes.secure_url });

  //   res.json({ message: "file uploaded successfully", cloudinaryRes });
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
