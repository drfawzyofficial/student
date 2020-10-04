const express = require('express');
const router = express.Router();
const QRCode = require('qrcode');
const Student = require('../models/Student');
router.get('/', async (req, res, next) => {
    try {
        const text = 'Shimaa Fawzy';
        await QRCode.toFile(`assets/Codes/${ text }.png`, text, { height: 300, width: 300 });
        res.render('qrCode')
      } catch (err) {
        console.error(err)
      }
});
router.post('/', async (req, res, next) => {
   try {
        const student = await Student.findOne({ _id: req.body.studentID });
        res.status(200).json(student);
   } catch(err) {
       console.error(err.message);
   }
})
module.exports = router;
