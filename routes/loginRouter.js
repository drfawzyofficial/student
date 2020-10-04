const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const { check, validationResult } = require('express-validator');
const passport = require('passport');
const { forwardAuthenticated } = require('../config/auth');
router.get('/', forwardAuthenticated, (req, res, next) => {
    res.render('login', { errors: req.flash('errors') });
});
router.post('/' , forwardAuthenticated, [
    check('email').isEmail().withMessage('Email must be correct'),
    check('password').isLength({ min: 6 }).withMessage('Password shoud be more than 6 chars')

], (req, res, next) => {
  
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        req.flash('errors', errors.array());
        res.redirect('/');
    } else {
        passport.authenticate('local.login', {
            successRedirect: '/addStudent',
            failureRedirect: '/',
            failureFlash: true
        })(req, res, next);
    }
});
module.exports = router;
