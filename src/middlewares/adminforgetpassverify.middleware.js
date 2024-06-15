const adminSchema = require('../models/admin.model.js');

const adminForgetPassVerify = async (req, res, next) => {
    try {
        const { contact, email } = req.body;
        let adminUser = await adminSchema.findOne({ contact: contact });
        if (adminUser) {
            if (adminUser.email === email) {
                req.flash('success', 'An OTP has been sent to your email. Please verify it to reset your password.');
                return next();
            }
            else {
                req.flash('error', 'Invalid Email');
            }
        }
        else {
            req.flash('error', 'Invalid Contact');
        }

    }
    catch (err) {
        rer.flash('error', 'Something went wrong');
    }
    return res.redirect('/studentPortal/adminlogin/adminforgetpass');
}

module.exports = { adminForgetPassVerify };