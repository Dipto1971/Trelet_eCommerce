import path from 'path';
import express from 'express';
import multer from 'multer';
const router = express.Router();

const storage = multer.diskStorage({
    destination(req, file, cb) {
        cb(null, 'uploads/'); //null is for error
    },
    filename(req, file, cb) {
        cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`);
    },
});

// function to check file type
function checkFileType(file, cb) {
    const filetypes = /jpg|jpeg|png/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase()); //test method returns true or false
    const mimetype = filetypes.test(file.mimetype);

    if (extname && mimetype) {
        return cb(null, true);
        // cb is callback function which takes error and boolean
    } else {
        cb('Images only!');
    }
}

const upload = multer({
    storage,
});

router.post('/', upload.single('image'), (req, res) => {
    res.send({
        message: 'Image Uploaded',
        image: `/${req.file.path}`,
    });
});

export default router;