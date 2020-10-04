const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const { check, validationResult } = require('express-validator');
const passport = require('passport');
const Student = require('../models/Student');
const moment = require('moment');
router.get('/', (req, res, next) => {
    Student.find({  }, (err, studentDocs) => {
        if(err) return console.log(err);
        else res.render('showStudent', { studentDocs : studentDocs });
    })
});
router.patch('/', (req, res, next) => {
    let today = moment().format('dddd'), futureDate;
    Student.findOne({ _id: req.body.studentID }, (err, result) => {
        if(err) return console.log(err);
        else {
            if(result.group.split('-').includes(today) === false) {
                res.json({ txt : 'Ops! Today is not his appointment' });
            } else {
                if(today === 'Saturday' || today === "Sunday" || today === "Monday") {
                    futureDate = moment().add(3, 'days').startOf('day');
                } else futureDate = moment().add(4, 'days').startOf('day');
                Student.findOneAndUpdate({_id: req.body.studentID, attendanceDate: {$lt: Date.now()}}, { $push : { attendance : { MYD: moment().format('MMMM Do YYYY, ddd'), month: moment().format("MMM"), forAttendance: true } }, $set: { attendanceDate: futureDate }}, (err, result) => {
                    if(err) return console.log(err);
                    else {
                        if(!result) res.json({ txt: 'You cannot attend him again until next time' });
                        else res.json({ txt: 'The student is attendant now' })
                    }
                });
            }
        }
    });
    
});
module.exports = router;
