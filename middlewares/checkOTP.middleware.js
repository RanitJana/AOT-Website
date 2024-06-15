const userSchema = require('../models/student.model.js');
const { otp } = require('./sendmail.middleware.js');

const checkOTP = (req, res, next) => {
    if (req.body.otp == otp.otp) {
        return next();
    }
    req.flash('error', "Incorrect OTP");
    return res.redirect('/studentPortal/studentlogin/forgetPassword/otp');
}
module.exports = {
    checkOTP
}