const express = require('express');
const route = express.Router();

route
    .get('/', (req, res) => {
        res.render('facility');
    })

module.exports = route;