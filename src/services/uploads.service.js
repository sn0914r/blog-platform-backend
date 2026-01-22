const cloudinary = require("../configs/cloudinary.config");
const randomStringGenerator = require("../utils/randomStringGenerator");

const uploadImages = async (files) => {
  const uploadedFiles = [];

  for (const file of files) {
    const b64 = Buffer.from(file.buffer).toString("base64");
    const dataURI = `data:${file.mimetype};base64,${b64}`;

    const filename = `${randomStringGenerator(15)}-${Date.now()}`;

    const uploadedFile = await cloudinary.uploader.upload(dataURI, {
      folder: "blogs-images",
      public_id: filename,
    });

    uploadedFiles.push(uploadedFile.secure_url);
  }

  return uploadedFiles;
};

module.exports = uploadImages;
