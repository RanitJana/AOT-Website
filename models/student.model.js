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
    password: {
        type: String,
        required: true,
        unique: true
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
    permanentAddress: {
        type: String,
        required: true
    },
    presentAddress: {
        type: String,
        required: true
    },
    class10Marks: {
        type: Number,
        default: 0
    },
    class12Marks: {
        type: Number,
        default: 0
    },
    semMarks: [
        {
            type: Number,
            default: 0
        }
    ]

}, { timestamps: true });

module.exports = mongoose.model('Student', studentSchema);  //In db it'll be saved as students