import express from 'express';
import multer from 'multer';
import path from 'path';
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
function fileFilter(req, file, cb){
    const filetypes = /jpg|jpeg|png/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase()); // test if the extension name is in the filetypes array
    const mimetype = filetypes.test(file.mimetype); // test if the mimetype is in the filetypes array

    if(extname && mimetype) {
        cb(null, true);
    } else {
        cb(new Error('Images only!'), false);
    }
}

const upload = multer ({ storage, fileFilter });
const uploadSingleImage = upload.single('image');

router.post('/', upload.single('image'), (req, res) => {
    uploadSingleImage(req, res, (err) => {
        if(err) {
            res.status(400).send({ message: err.message });
        } else {
            res.send(`/${req.file.path}`);
        }
    });
});

export default router;