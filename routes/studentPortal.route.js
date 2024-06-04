const path = require('path');
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
        res.sendFile(path.join(__dirname, '../public/pages', 'studentPortal.html'));
    })
    //admin section
    .get('/adminlogin', (req, res) => {
        res.sendFile(path.join(__dirname, '../public/pages', 'adminlogin.html'));
    })


module.exports = route;