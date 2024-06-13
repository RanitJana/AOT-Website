const express = require('express');
const cookieParser = require('cookie-parser');

const studentlogin = require('./studentlogin.route.js');
const studentsignup = require('./studentsignup.route.js');

const adminLogin = require('./adminLogin.route.js');
const adminSignup = require('./adminSignup.route.js');

const route = express.Router();

route
    .use(express.urlencoded({ extended: false }))   //to accept form inputs
    .use(cookieParser())
    //studnet section
    .use('/studentlogin', studentlogin)
    .use('/studentsignup', studentsignup)
    //admin section
    // .use('/adminLogin', adminLogin)
    // .use('/adminSignup', adminSignup)
    .get('/', (req, res) => {
        res.render('studentPortal');
    })

module.exports = route;