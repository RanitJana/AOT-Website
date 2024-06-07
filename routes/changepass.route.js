const express = require('express');
const route = express.Router();

const userSchema = require('../models/student.model.js');

const matchPassword = async (req, res, next) => {
    try {
        const password = req.body["password"].trim();
        const confirmPasword = req.body['confirm-password'].trim();

        if (password.length < 8) {
            req.flash('error', "Password length must not less than 8")
            return res.redirect('/studentPortal/studentlogin/forgetPassword/changePassword');
        }

        const user = await userSchema.findOne({ _id: `${req.cookies.id}` });

        if (user && password === confirmPasword) {
            user.password = password;
            user.save();
            return next();
        }
    }
    catch (err) {
        console.log(err);
    }
    req.flash('error', 'Password did not match!');
    return res.redirect('/studentPortal/studentlogin/forgetPassword/changePassword');
}

route
    .get('/',
        async (req, res, next) => {
            let user = await userSchema.findOne({ _id: req.cookies.id });
            if (user) next();
            else return res.redirect('/studentPortal/studentlogin/forgetPassword');
        },
        (req, res) => {
            res.render('changePassword');
        })
    .post('/', matchPassword, (req, res) => {
        req.flash('success', 'Password has been changed successfully!');
        res.clearCookie('id');
        res.redirect('/studentPortal/studentlogin');
    })

module.exports = route;