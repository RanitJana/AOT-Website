require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
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
    ]

}, { timestamps: true });


//pre hook
studentSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
})



module.exports = mongoose.model('Student', studentSchema);  //In db it'll be saved as students