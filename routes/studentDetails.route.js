const express = require('express');
const route = express.Router();
const path = require('path')

route
    .get('/',
        // (req, res, next) => {
        //     if (isUserLoggedIn) return next();
        //     return res.redirect('/studentPortal/studentlogin');
        // },
        (req, res) => {
            res.sendFile(path.join(__dirname, '../public/pages', 'studentDetails.html'));
        })

module.exports = route;