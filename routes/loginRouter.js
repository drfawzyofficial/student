const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const { check, validationResult } = require('express-validator');
const passport = require('passport');
router.get('/', (req, res, next) => {
    res.render('login', { errors: req.flash('errors') });
});
router.post('/' , [
    check('email').isEmail().withMessage('Email must be correct'),
    check('password').isLength({ min: 6 }).withMessage('Password shoud be more than 6 chars')

], (req, res, next) => {
  
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        req.flash('errors', errors.array());
        res.redirect('/');
    } else {
        passport.authenticate('local.login', {
            successRedirect: '/studentsystem',
            failureRedirect: '/',
            failureFlash: true
        })(req, res, next);
    }
});
module.exports = router;
