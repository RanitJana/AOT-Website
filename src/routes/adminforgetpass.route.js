const express = require('express');

const route = express.Router();
const { adminForgetPassVerify } = require('../middlewares/adminforgetpassverify.middleware.js');

route
    .get('/', (req, res) => {
        res.render('adminforgetpass');
    })
    .post('/', adminForgetPassVerify, (req, res) => {
        
    })

module.exports = route;