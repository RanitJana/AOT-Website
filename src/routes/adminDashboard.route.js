const express = require('express');
const route = express.Router();

const { adminProtected } = require('../middlewares/adminProtected.middleware.js');

route.get('/', adminProtected, (req, res) => {
    res.render('adminEdit');
})

module.exports = route;