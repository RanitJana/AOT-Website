require('dotenv').config();
const mongoose = require('mongoose');
const DB_NAME = require('../constants.js');

; (
    async () => {
        try {
            await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
        }
        catch (err) {
            console.log(err);
            throw err;
        }
    }
)()


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