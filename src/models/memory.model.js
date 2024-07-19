const mongoose = require('mongoose');

const memorySchemaa = new mongoose.Schema(
    {
        fullName: {
            type: String,
            required: true
        },
        roll: {
            type: Number,
            required: true
        },
        department: {
            type: String,
            required: true
        },
        admissionYear: {
            type: Number,
            required: true
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
            required: true
        },
        contact: {
            type: Number,
            required: true
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
        ],
        uniqueID: {
            type: String,
        },
        createdAt: {
            type: Date,
            default: Date.now,
            expires: '1h' // TTL of 60 seconds
        }
    }, { timestamps: true });



module.exports = mongoose.model('Memory', memorySchemaa);