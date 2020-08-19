import cloudinary from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import multer from "multer";
import dotenv from "dotenv";

dotenv.config();

const version2 = cloudinary.v2;

// me.config({
//     cloud_name: process.env.CLOUD_NAME,
//     api_key: process.env.CLOUDINARY_API_KEY,
//     api_secret: process.env.CLOUDINARY_API_SECRET
//   });

version2.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const storage = new CloudinaryStorage({
  cloudinary: version2
  // params: {
  //   folder: 'some-folder-name',
  //   format: async (req, file) => 'png', // supports promises as well
  //   public_id: (req, file) => 'computed-filename-using-request',
  // },
});

export const parser = multer({ storage });
