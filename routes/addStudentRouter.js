const express = require('express');
const router = express.Router();
const Student = require('../models/Student');
const { check, validationResult } = require('express-validator');
const { ensureAuthenticated } = require('../config/auth');
router.get('/', ensureAuthenticated, (req, res, next) => {
    res.render('addStudent', { errors: req.flash('errors') });
});
router.post('/', ensureAuthenticated, [
    check('fullname').isLength({ min: 6 }).withMessage('Fullname shuold be more than 6 chars'),
    check('studentPhone').isLength({ min: 11 }).withMessage('Student Phone shoud be equal to 11 chars'),
    check('fatherPhone').isLength({ min: 11 }).withMessage('Father Phone shoud be equal to 11 chars'),
    check('motherPhone').isLength({ min: 11 }).withMessage('Mother Phone shoud be equal to 11 chars'),
    check('comment').isLength({ min: 6 }).withMessage('Comment shoud be at least 6 chars')

], async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        req.flash('errors', errors.array());
        res.redirect('/addStudent');
    } else {
        let basicCounter = 25;
        try {
            let result = await Student.find({  });
            for(let i = 0; i < result.length; i++) {
                if(i === result.length - 1) {
                    basicCounter = result[i].studentCode + 1;
                 }
            }  
        } catch(err) {
            console.log(err.message);
        } 
        
        let student = new Student({
            studentCode: basicCounter,
            fullname: req.body.fullname,
            studentPhone: req.body.studentPhone,
            fatherPhone: req.body.fatherPhone,
            motherPhone: req.body.motherPhone,
            comment: req.body.comment,
            group: req.body.group,
            time: req.body.time,
            payment: {
                firstMonth: Number(req.body.defaultExampleRadios),
                secondMonth: 0,
                thirdMonth: 0,
                fourthMonth: 0,
                fifthMonth: 0,
                sixthMonth: 0,
                seventhMonth: 0,
                eighthMonth: 0
            }
        });
        student.save((err, result) => {
            if(err) return console.log(err);
            else {
                console.log(result);
                req.flash('success', 'Student has been added to DB');
                res.redirect('/showStudent');
            }
        })
    }
});
module.exports = router;
