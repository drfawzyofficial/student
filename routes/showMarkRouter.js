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
        else res.render('showMarks', { studentDocs : studentDocs });
    })
});
module.exports = router;
