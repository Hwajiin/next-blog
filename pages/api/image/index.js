import axios from "axios";
const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  api_secret: process.env.NEXT_PUBLIC_CLOUDINARY_API_SECRET,
  secure: true,
});

export default async function handler(req, res) {
  try {
    const response = await cloudinary.uploader.destroy(`${req.query.id}`);
  } catch (error) {
    console.log(error);
  }
}
