const express = require('express');
const route = express.Router();

route
    .get('/', (req, res) => {
        res.render('library');
    })

module.exports = route;