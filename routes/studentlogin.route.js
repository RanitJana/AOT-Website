const express = require('express');
const route = express.Router();
const path = require('path');

const { matchPassword } = require('../middlewares/signUpPassword.middleware.js');

const studentDetails = require('./studentDetails.route.js');

route
    .use(`/studentDetails`, studentDetails)
    .get('/', (req, res) => {
        res.sendFile(path.join(__dirname, '../public/pages', 'studentlogin.html'));
    })
    .post('/', matchPassword, (req, res) => {
        res.redirect(`/studentPortal/studentlogin/studentDetails`);
    })

module.exports = route;