// const express = require('express');
// const router = express.Router();
// const db = require('../db');
// const xlsx = require('xlsx');
// const multer = require('multer');
// const path = require('path');
// const mysql = require('../mysql')

// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         console.log('file'+file)
//         cb(null, 'uploads/')
//     },
//     filename: function (req, file, cb) {
//         cb(null, new Date().valueOf() + path.extname(file.originalname))
//     }
// })
// const upload = multer({
//     storage: storage
// });

// router.use(express.json({
//     limit:'50mb'
// }))


// router.post('/xlsx', upload.single('xlsx'), (req, res, next) => {
//     console.log(upload.single('xlsx'));
//     const workbook = xlsx.readFile(`./uploads/${req.file.filename}`)
//     const sheetName = workbook.SheetNames[0];
//     const sheet = workbook.Sheets[sheetName];
//     const sheetJson = xlsx.utils.sheet_to_json(sheet);

//     sheetJson.forEach(async (customer) => {
//         let sql = `
//             INSERT INTO xlsx SET ?
//         `
//         await mysql.query(sql,customer)
//     })
// })


// module.exports = router