const express = require('express');
const route = express.Router();

route
    .get('/', (req, res) => {
        res.render('search');
    })

module.exports = route;