const mongoose = require('mongoose');

const adminMemorySchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true
    },
    email: {
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
        required: true,
        unique: true
    },
    uniqueID: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: '1h' // TTL of 60 seconds
    }
}, { timestamps: true });

module.exports = mongoose.model('AdminMemory', adminMemorySchema);  //In db it'll saved as adminmemories