
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

const matchPassword = (req, res, next) => {
    // console.log(req.body);

    (
        async () => {
            try {
                const roll = req.body["roll"];
                const password = req.body["password"];
                const data = await userSchema.findOne({ roll: `${roll}` });
                const match = await bcrypt.compare(password, data.password);
                if (match && data) {
                    res.cookie.username = data.fullName;
                    res.cookie.roll = data['roll'];
                    return next();
                }
                else return res.redirect('/studentPortal/studentlogin');
            }
            catch (err) {
            }
            return res.sendFile(path.join(__dirname, '../public/pages', 'studentDetails.html'));
            // next();
        }
    )()
}

module.exports = {
    checkValidPassword,
    matchPassword
}

