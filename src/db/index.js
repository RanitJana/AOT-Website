require('dotenv').config()
const { DB_NAME } = require('../../constants.js');
const mongoose = require('mongoose');

const express = require('express');
const app = express();

const connectDB = async function () {
    try {
        await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
        console.log('Connected to database!!');
    }
    catch (err) {
        console.log(err);
        throw err;
    }
}

module.exports = connectDB;