const express = require('express');

const route = express.Router();
const { adminForgetPassVerify } = require('../middlewares/adminforgetpassverify.middleware.js');
const { sendMail } = require('../middlewares/sendmail.middleware.js');
const adminOtp = require('./adminOtp.route.js');
const changePassword = require('./adminChangePass.route.js');

route
    .use('/otp', adminOtp)
    .use('/changePassword', changePassword)
    .get('/', (req, res) => {
        res.render('adminforgetpass');
    })
    .post('/', adminForgetPassVerify, sendMail, (req, res) => {
        res.redirect('/studentPortal/adminlogin/forgetPassword/otp');
    })

module.exports = route;