const express = require('express');
const route = express.Router();
const { checkOTP } = require('../middlewares/admincheckOTP.middleware.js');
const adminSchema = require('../models/admin.model.js');

route
    .get('/',
        async (req, res, next) => {
            let user = await adminSchema.findOne({ _id: req.cookies.admin });
            if (user) next();
            else return res.redirect('/studentPortal/adminlogin/forgetPassword');
        },
        (req, res) => {
            res.render('adminenterOTP');
        })
    .post('/', checkOTP, (req, res) => {
        res.redirect('/studentPortal/adminlogin/forgetPassword/changePassword');
    })

module.exports = route;