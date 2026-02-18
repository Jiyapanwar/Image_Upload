import express from "express";
import mongoose from "mongoose";
import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
cloudinary.config({
  cloud_name: "dqxfguygm",
  api_key: "347723495639414",
  api_secret: "nxIR0y1LlLEYpaaa6WqDjN2wyq8",
});

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

const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
