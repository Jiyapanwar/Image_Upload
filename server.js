import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import multer from "multer";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

dotenv.config();

const app = express();

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

const PORT = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
