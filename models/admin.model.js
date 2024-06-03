require('dotenv').config();
const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/aotData');

const adminSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        uniqure: true
    },
    password: {
        type: String,
        required: true,
        unique: true
    },
    contact: {
        type: Number,
        required: true,
        unique: true
    }
}, { timestamps: true });

module.exports = mongoose.model('Admin', adminSchema);  //In db it'll saved as admins