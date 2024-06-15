const adminSchema = require('../models/admin.model.js');

const adminProtected = async (req, res, next) => {
    try {
        const admin = await adminSchema.findOne({ _id: req.cookies.admin });
        if (admin) {
            return next();
        }
        else {
            req.flash('error', 'You need to login first');
        }
    }
    catch (err) {
        req.flash('error', 'Something went wrong');
    }
    return res.redirect('/studentPortal/adminLogin');
}
module.exports = {
    adminProtected
}