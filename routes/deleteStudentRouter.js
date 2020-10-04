const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const { check, validationResult } = require('express-validator');
const passport = require('passport');
const Student = require('../models/Student');
const { ensureAuthenticated } = require('../config/auth');
router.get('/', ensureAuthenticated, (req, res, next) => {
    res.render('deleteStudent');
});
router.post('/', ensureAuthenticated, (req, res, next) => {
    if ((req.body.studentCode).trim() === '') return res.json({ txt: 'Student Code must not be empty' });
    else if (isNaN(req.body.studentCode)) return res.json({ txt: 'Stdent Code must be number' })
    else {
        Student.findOne({ studentCode: Number(req.body.studentCode) }, (err, result) => {
            if (err) return console.log(err);
            else {
                if (!result) res.json({ txt: 'Student Code is Wrong' });
                else res.json(result);
            }
        })
    }
});

router.delete('/', (req, res, next) => {
    Student.remove({ studentCode: Number(req.body.studentCode) }, (err, result) => {
        if(err) return console.log(err);
        else {
            console.log(`Deleted ${result}`);
            res.json({ txt: 'Deleted Successfully, You can now refresh your page' });
        }
    })
});
module.exports = router;
