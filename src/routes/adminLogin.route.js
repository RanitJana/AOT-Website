const express = require('express');
const route = express.Router();

const { adminVerify } = require('../middlewares/adminVerify.middleware.js');
const adminDashboard = require('./adminDashboard.route.js');
const adminforgetpass = require('./adminforgetpass.route.js');

route
    .use('/adminDashboard', adminDashboard)
    .use('/forgetPassword', adminforgetpass)
    .get('/', (req, res) => {
        res.render('adminlogin');
    })
    .post('/', adminVerify, (req, res) => {
        return res.redirect('/studentPortal/adminLogin/adminDashboard');
    })

module.exports = route;