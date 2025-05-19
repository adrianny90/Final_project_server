import multer from "multer";
import CloudinaryStorage from "../utils/cloudinary.js";

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, './my-uploads');
//   },
//   filename: function (req, file, cb) {
//     const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
//     cb(null, file.fieldname + '-' + uniqueSuffix);
//   },
// });

const storage = new CloudinaryStorage();

const allowedFileExt = [
  "jpeg",
  "jpg",
  "webp",
  "png",
  "heic",
  "avif",
  "svg",
  "gif",
];

const fileFilter = (req, file, cb) => {
  const fileExt = file.mimetype.split("/")[1]; // application/json, image/png, image/svg, text/svg

  if (allowedFileExt.includes(fileExt)) {
    cb(null, true);
  } else {
    const err = new Error(
      `Wrong file type, only ${allowedFileExt.join(", ")} allowed`
    );
    err.statusCode = 400;
    cb(err);
  }
};

const fileSize = 1_048_576 * 2; // 2mb

const upload = multer({ storage, fileFilter, limits: { fileSize } });
export default upload;
