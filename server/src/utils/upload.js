import multer from "multer";
const storage = multer.diskStorage({
    destination : function(req, file, cb){
        cb(null,"./upload")
    },
    filename : function(req, file, cb){
        // cb(null,`${Date.now()}-${file.originalname}`)
        const name = Date.now()+file.originalname
        const final = name.toString().trim();
        cb(null,final)
    }
})

const upload = multer({storage});

export default upload;