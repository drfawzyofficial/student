const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const { check, validationResult } = require('express-validator');
const passport = require('passport');
const Student = require('../models/Student');
const { ensureAuthenticated } = require('../config/auth');
router.get('/', ensureAuthenticated, (req, res, next) => {
    Student.find({  }, (err, studentDocs) => {
        if(err) return console.log(err);
        else res.render('showEdit', { studentDocs : studentDocs });
    })
});
router.post('/', ensureAuthenticated, (req, res, next) => {
    Student.findOne({ _id: req.body.studentID }, (err, result) => {
        if(err) return console.log(err);
        else {
            let payment = result.payment;
            payment[req.body.chooseMonth] = Number(req.body.defaultExampleRadios);
            Student.findByIdAndUpdate(req.body.studentID, { $set: { fullname: req.body.fullname, studentPhone: req.body.studentPhone, fatherPhone: req.body.fatherPhone, motherPhone: req.body.motherPhone, comment: req.body.comment, group: req.body.group, time: req.body.time, payment: payment}, $push: { exams: { examName: req.body.examName, minDegree: Number(req.body.minDegree), maxDegree: Number(req.body.maxDegree) } } }, (err, result) => {
                if(err) return console.log(err);
                else {
                    console.log(result);
                    req.flash('success', 'Update is complete successfully');
                    res.redirect('/editStudent');
                }
            })
        }
    })
    
});
module.exports = router;
