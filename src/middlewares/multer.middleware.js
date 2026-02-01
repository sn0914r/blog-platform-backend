const multer = require("multer");
const AppError = require("../errors/AppError");


/**
 * @desc Uploads one or more images
 * 
 * Effects:
 *  - Attaches files to req.files
 * 
 * Blocks When:
 *  - Each file size is greater than 5MB
 *  - Number of files is greater than 5
 *  - File is not an image
 */
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024,
    files: 5,
  },
  fileFilter: (req, file, cb) => {
    if (!file.mimetype.startsWith("image/")) {
      return cb(
        new AppError("Invalid file format: Only images are allowed", 400),
        false,
      );
    }

    cb(null, true);
  },
}).array("files", 5);

module.exports = upload;
