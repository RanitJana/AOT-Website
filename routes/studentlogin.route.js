const express = require('express');
const route = express.Router();

const { matchPassword } = require('../middlewares/signUpPassword.middleware.js');

const studentDetails = require('./studentDetails.route.js');

route
    .use(`/studentDetails`, studentDetails)
    .get('/', (req, res) => {
        res.render('studentlogin');
    })
    .post('/', matchPassword, async (req, res) => {
        return res.redirect('/studentPortal/studentlogin/studentDetails');
    })
module.exports = route;