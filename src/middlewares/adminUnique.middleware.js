const adminSchema = require('../models/admin.model.js');
const adminMemorySchema = require('../models/adminMemory.model.js');

const adminUnique = async (req, res, next) => {
    try {
        const { contact } = req.body;
        const admin = await adminSchema.findOne({ contact: contact });
        if (admin) {
            req.flash('error', 'Admin already exists');
            return res.redirect('/studentPortal/adminSignup');
        }
        const adminMemory = await adminMemorySchema.findOne({ contact: contact });
        if (adminMemory) {
            req.flash('error', 'Request already sent');
            return res.redirect('/studentPortal/adminSignup');
        }
        return next();
    }
    catch (err) {
        req.flash('error', 'Something went wrong');
        return res.redirect('/studentPortal/adminSignup');
    }
}

const passwordMatch = async (req, res, next) => {
    try {
        if (req.body['password'] !== req.body['confirm-password']) {
            req.flash('error', 'Passwords did not match');
            return res.redirect('/studentPortal/adminSignup');
        }
        return next();
    }
    catch (err) {
        req.flash('error', 'Something went wrong');
        return res.redirect('/studentPortal/adminSignup');
    }
}
module.exports = {
    adminUnique,
    passwordMatch
}