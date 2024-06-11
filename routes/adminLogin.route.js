const express = require('express');
const route = express.Router();

route
    .get('/', (req, res) => {
        res.render('adminlogin');
    })

module.exports = route;