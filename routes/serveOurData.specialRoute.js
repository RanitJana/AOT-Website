const express = require('express');
const axios = require('axios');
const route = express.Router();

const userSchema = require('../models/student.model.js');

route.get('/getDataStudent', async (req, res) => {
    try {
        if (req.get('Referer')) {
            // The request was likely made via a link or redirection
            const jsonData = await userSchema.find().sort({ roll: 1 });
            const filteredData = jsonData.map(item => ({
                roll: item.roll,
                fullName: item.fullName,
                semMarks: item.semMarks
            }));
            console.log(filteredData);
            res.json(filteredData);
        } else {
            // The request was likely made by manually entering the URL
            res.status(403).json({ error: 'Unauthorized access' });
        }
    }
    catch (err) {
        res.status(500).json({ error: 'Error fetching data' });
    }
})
module.exports = route;