import multer from "multer";
import path from "path";

var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    console.log("req:::", req);
    cb(null, "imageStore/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
var uploadFile = multer({ storage: storage }).single("Image");

export default uploadFile;
