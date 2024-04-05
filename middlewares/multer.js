// IMPORTING MODULES
import multer from "multer";
import path from "path";

// MULTER CONFIGURATION
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    switch (file.fieldname) {
      case "product_image":
        cb(null, "public/images/product");
        break;
      case "eventImg":
        cb(null, "public/images/events");
        break;
      default:
        cb(null, "public/images/others");
        break;
    }
  },
  filename: (req, file, cb) => {
    switch (file.fieldname) {
      case "product_image":
        cb(null, `${req.body.product_name}${path.extname(file.originalname)}`);
        break;
      case "eventImg":
        cb(null, `${req.body.eventName}${path.extname(file.originalname)}`);
        break;
      default:
        cb(null, `${req.body.fileName}${path.extname(file.originalname)}`);
        break;
    }
  },
  limits: {
    fileSize: 10 * 1024 * 1024,
  },
});

// MULTER UPLOAD
const upload = multer({ storage });

// EXPORTING FUNCTIONS
export { upload as UPLOAD };
