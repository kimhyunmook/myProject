const multer = require("multer");
const path = require("path");

function upload (url,target,type) {
  
  const storage = multer.diskStorage({
      destination: function (req, file, cb) {
          cb(null, url)
          // cb(null, 'client/public/uploads/')
      },
      filename: function (req, file, cb) {
          cb(null, new Date().valueOf() + path.extname(file.originalname))
      }
  }) 
  const upload = multer({
      storage: storage
  }) 

  switch(type) {
    case "multi" : return upload.array(target);
    default : return upload.single(target);
  }
}

module.exports = upload