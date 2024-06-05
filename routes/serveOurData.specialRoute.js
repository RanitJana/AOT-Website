const express = require('express');
const axios = require('axios');
const route = express.Router();

const userSchema = require('../models/student.model.js');

route.get('/getDataStudent', async (req, res) => {
    try{

        const jsonData = await userSchema.find().sort({ roll: 1 });
        res.json(jsonData);
    }
    catch(err){
        res.status(500).json({ error: 'Error fetching data' });
    }
})
module.exports = route;