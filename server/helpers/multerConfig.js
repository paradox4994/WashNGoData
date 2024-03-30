const multer = require('multer');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // upload directory
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname); // Preserve original filename
  }
});

module.exports = multer({ storage });