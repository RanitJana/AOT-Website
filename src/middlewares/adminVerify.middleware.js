const adminSchema = require('../models/admin.model.js');
const bcrypt = require('bcrypt');
const { cookieOptions } = require('../../constants.js');

const adminVerify = async (req, res, next) => {
    try {
        const { contact, password } = req.body;
        const admin = await adminSchema.findOne({ contact: contact });
        if (admin) {
            const isMatch = await bcrypt.compare(password, admin.password);
            if (isMatch) {
                res.cookie('admin', admin._id, cookieOptions);
                return next();
            }
            else {
                req.flash('error', 'wrong password');
                return res.redirect('/studentPortal/adminLogin');
            }
        }
        else {
            req.flash('error', 'Invalid Credentials');
            return res.redirect('/studentPortal/adminLogin');
        }
    }
    catch (err) {
        req.flash('error', 'Something went wrong');
    }
    return res.redirect('/studentPortal/adminLogin');
}
module.exports = {
    adminVerify
}