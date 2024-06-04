
const bcrypt = require('bcrypt');
const path = require('path');

const userSchema = require('../models/student.model.js');
const { default: mongoose } = require('mongoose');

const checkValidPassword = (req, res, next) => {
    const password = req.body["password"];
    const confirmPassword = req.body["confirm-password"];
    if (password !== confirmPassword || password.length < 8) {
        return res.redirect('/studentPortal/studentsignup');
    }
    next();
}

const matchPassword = async (req, res, next) => {
    console.log(req.body);
    if (req.body.formType == 'default') {

        try {
            const roll = req.body["roll"];
            const password = req.body["password"];
            const data = await userSchema.findOne({ roll: `${roll}` });
            const match = await bcrypt.compare(password, data.password);
            if (match && data) {
                console.log(data);
                res.cookie.username = data.fullName;
                res.cookie.roll = data['roll'];
                return next();
            }
        }
        catch (err) {
        }
        return res.redirect('/studentPortal/studentlogin');
    }
    else
        return res.sendFile(path.join(__dirname, '../public/pages', 'studentDetails.html'));

}

module.exports = {
    checkValidPassword,
    matchPassword
}

