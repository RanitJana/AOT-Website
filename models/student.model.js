require('dotenv').config();
const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/aotData');

const studentSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true
    },
    roll: {
        type: Number,
        required: true,
        unique: true,
    },
    emailPersonal: {
        type: String,
        required: true,
        unique: true
    },
    emailAot: {
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true,
        unique:true
    },
    contact: {
        type: Number,
        required: true,
        unique: true
    },
    gurdian: {
        type: String,
        required: true
    },
    gurdianContact: {
        type: Number,
        required: true
    },
    localGurdian: {
        type: String,
        required: true
    },
    localGurdianContact: {
        type: Number,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    class10Marks: {
        type: Number,
        required: true
    },
    class12Marks: {
        type: Number,
        required: true
    },
    semMarks: [
        {
            type: Number,
            default: 0
        }
    ]

}, { timestamps: true });

module.exports = mongoose.model('Student', studentSchema);  //In db it'll be saved as students