const express = require('express');
const route = express.Router();

const { checkMailRoll } = require('../middlewares/forgetpass.middleware.js');
const { sendMail } = require('../middlewares/sendmail.middleware.js');
const otp = require('./otp.route.js');
const changePassword = require('./changepass.route.js');

route
    .use('/otp', otp)
    .use('/changePassword', changePassword)
    .get('/', (req, res) => {
        res.render('forgetpass');
    })
    .post('/', checkMailRoll, sendMail, (req, res) => {
        res.redirect('/studentPortal/studentlogin/forgetPassword/otp');
    })

module.exports = route