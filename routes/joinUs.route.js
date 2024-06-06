const express = require('express');
const route = express.Router();

route
    .get('/', (req, res) => {
        res.render('JoinUs');
    })

module.exports = route;