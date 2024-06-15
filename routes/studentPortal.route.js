const express = require('express');
const cookieParser = require('cookie-parser');

const studentlogin = require('./studentlogin.route.js');
const studentsignup = require('./studentsignup.route.js');

const route = express.Router();

route
    .use(express.urlencoded({ extended: false }))   //to accept form inputs
    .use(cookieParser())
    //studnet section
    .use('/studentlogin', studentlogin)
    .use('/studentsignup', studentsignup)
    .get('/', (req, res) => {
        res.render('studentPortal');
    })
    //admin section
    .get('/adminlogin', (req, res) => {
        res.render('adminlogin');
    })


module.exports = route;