const adminSchema = require('../models/admin.model.js');

const adminForgetPassVerify = async (req, res, next) => {
    try {
        const { contact, email } = req.body;
        let adminUser = await adminSchema.findOne({ contact: contact });
        if (adminUser) {
            if (adminUser.email === email) {
                res.cookie('admin', adminUser._id);
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
    return res.redirect('/studentPortal/adminlogin/forgetPassword');
}

module.exports = { adminForgetPassVerify };