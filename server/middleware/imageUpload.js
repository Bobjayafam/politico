import multer from 'multer';
import dotenv from 'dotenv';
import mkdirp from 'mkdirp';

dotenv.config();

const cloudinary = require('cloudinary').v2;
const fs = require('fs');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = 'uploads/';
    mkdirp(dir, err => cb(err, dir));
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/jpeg' || file.mimetytpe === 'image/jpg' || file.mimetype === 'image/png') {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({
  storage,
  limits: {
    fileSize: 1024 * 1024 * 2,
  },
  fileFilter,
}).single('logoUrl');

let logoUrlUploaded;

cloudinary.config({
  cloud_name: process.env.cloud_name,
  api_key: process.env.api_key,
  api_secret: process.env.api_secret,
});

const uploadLogo = (req, res, next) => {
  upload(req, res, (err) => {
    if (err) {
      res.status(400).json({
        status: 400,
        error: err.message,
      });
    }
    if (req.file) {
      const { path } = req.file;
      cloudinary.uploader.upload(path, (err, image) => {
        if (err) {
          return res.send(err);
        }
        logoUrlUploaded = image.secure_url;
        fs.unlinkSync(path);
        return next();
      });
    } else {
      const error = new Error('Please upload an image in the logoUrl field');
      error.status = 400;
      return next(error);
    }
  });
};

export {
  uploadLogo,
  logoUrlUploaded,
};
