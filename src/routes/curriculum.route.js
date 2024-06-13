const express = require('express');
const route = express.Router();

route
    .get('/', (req, res) => {
        res.render('curriculam');
    })

module.exports = route;