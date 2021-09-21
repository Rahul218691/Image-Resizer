const router = require('express').Router();
const multer = require('multer');
const {fileConverter} = require('../controllers/fileController');



const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./public/uploads")
    },
    filename: function (req, file, cb) {
        const parts = file.mimetype.split("/");
        cb(null, `${file.fieldname}-${Date.now()}.${parts[1]}`)
    }
})

const upload = multer({storage});



router.post('/convert',upload.single('file'),fileConverter);



module.exports = router;