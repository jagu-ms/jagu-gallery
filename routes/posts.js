const express = require('express');

const router = express.Router();

const controller = require('../controllers/postController');

const authMiddleware = require('../middlewares/authMiddleware');

const path = require('path');

const multer = require('multer');

const storage = multer.diskStorage({
    // Storage title
    destination: 'public/uploads/',
    // Generate a unique name for the avatar
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname))
    }
});

const upload = multer({
    // Max file size
    //limits: { fileSize: 1024 * 1024 },
    // Files storage
    storage: storage ,
    // Checking the type of the uploaded file
    fileFilter: (req, file, cb) => {
        let fileTypes = /jpeg|jpg|png/;
        let mimeType = fileTypes.test(file.mimetype);
        let extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
        if (mimeType && extname)  return cb(null, true);
        cb(new Error('this file is not allowed'));
    },
});


router.post('/', [authMiddleware.authenticated, upload.single('image')], controller.create);

router.get('/', controller.list);

//router.get('/mine/:id', controller.mine);

router.get('/:id', controller.post); 

/* router.put('/:id', authMiddleware.authenticated, controller.update);

router.delete('/:id', authMiddleware.authenticated, controller.delete);  */

module.exports = router;