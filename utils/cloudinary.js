import { v2 as cloudinary } from "cloudinary";

// A custom class that satisfies the interface multer.StorageEngine (can be used by multer to save files somewhere)
class CloudinaryStorage {
  _handleFile(req, file, cb) {
    const uploadStream = cloudinary.uploader.upload_stream(
      { resource_type: "auto" },
      (error, result) => {
        if (error) {
          cb(error);
        }
        cb(null, result);
      }
    );

    file.stream.pipe(uploadStream);
  }

  // We don't need that usually, but node will it can crash, if this isn't found occasionally
  _removeFile(req, file, cb) {
    cb(new Error(""));
  }
}

export default CloudinaryStorage;
