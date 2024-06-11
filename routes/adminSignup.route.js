const express = require('express');
const reoute = express.Router();

reoute
    .get('/', (req, res) => {
        res.render('adminSignup');
    })

module.exports = reoute;