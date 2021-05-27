const multer = require('multer');

const MIME_TYPES = {
  'image/jpg': 'jpg',
  'image/jpeg': 'jpg',
  'image/png': 'png',
  'image/gif': 'gif'
};

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, 'images');
  },
  filename: function (req, file, cb) {
    if (file == undefined) {
      cb();
    }
    const extension = MIME_TYPES[file.mimetype];
    let filename = Date.now() +
      "." +
      extension;
    cb(null, filename);
  }

});

module.exports = multer({ storage: storage }).single('image');
