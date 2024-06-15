const express = require('express');
const route = express.Router();
const { checkOTP } = require('../middlewares/checkOTP.middleware.js');
const userSchema = require('../models/student.model.js');

route
    .get('/',
        async (req, res, next) => {
            let user = await userSchema.findOne({ _id: req.cookies.id });
            if (user) next();
            else return res.redirect('/studentPortal/studentlogin/forgetPassword');
        },
        (req, res) => {
            res.render('enterOTP');
        })
    .post('/', checkOTP, (req, res) => {
        
        res.redirect('/studentPortal/studentlogin/forgetPassword/changePassword');
    })

module.exports = route;