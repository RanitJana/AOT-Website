const express = require('express');
const userSchema = require('../models/student.model.js');
const route = express.Router();

route.get('/getDataStudent', async (req, res) => {
    const jsonData = await userSchema.find().sort({ roll: 1 });
    res.json(jsonData);
})
module.exports = route;