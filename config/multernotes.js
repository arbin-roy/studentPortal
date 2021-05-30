const multer = require("multer");
module.exports = multerNotes = {
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, './uploads/notes/')
        },
        filename: (req, file, cb) => {
            cb(null, file.originalname)
        }
    }),
    fileFilter: (req, file, cb) => {
        if(file.mimetype === 'application/pdf'){
            cb(null, true)
        }
        else{
            cb(new Error("Only PDF file is supported", false))
        }
    }
}