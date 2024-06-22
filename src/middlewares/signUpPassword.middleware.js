
const bcrypt = require('bcrypt');

const userSchema = require('../models/student.model.js');
const { cookieOptions } = require('../../constants.js');

const checkValidPassword = (req, res, next) => {
    const password = req.body["password"];
    const confirmPassword = req.body["confirm-password"];
    if (password != confirmPassword) {
        req.flash('error', "Password did not match!")
        return res.redirect('/studentPortal/studentsignup');
    }
    if (password.length < 8) {
        req.flash('error', "Password length must not less than 8")
        return res.redirect('/studentPortal/studentsignup');
    }
    next();
}

const matchPassword = async (req, res, next) => {
    try {
        const roll = req.body["roll"];
        const password = req.body["password"];
        const data = await userSchema.findOne({ roll: `${roll}` });
        const match = await bcrypt.compare(password, data.password);
        if (match && data) {
            res.cookie('username', data.fullName, cookieOptions);
            res.cookie('id', data['_id'], cookieOptions);
            res.cookie('roll', data.roll, cookieOptions);
            return next();
        }
    }
    catch (err) {
        console.log(err);
    }
    req.flash('error', 'Wrong Roll number or Password');
    return res.redirect('/studentPortal/studentlogin');
}

module.exports = {
    checkValidPassword,
    matchPassword
}

