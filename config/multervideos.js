const multer = require("multer");
module.exports = multerVideos = {
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, './uploads/videos/')
        },
        filename: (req, file, cb) => {
            cb(null, Date.now() + " " +file.originalname)
        }
    }),
    fileFilter: (req, file, cb) => {
        if(file.mimetype === 'video/mp4'){
            cb(null, true)
        }
        else{
            cb(new Error("Only MP4 file is supported", false))
        }
    }
}