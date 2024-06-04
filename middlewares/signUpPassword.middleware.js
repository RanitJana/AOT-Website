
const bcrypt = require('bcrypt');

const userSchema = require('../models/student.model.js');

const checkValidPassword = (req, res, next) => {
    const password = req.body["password"];
    const confirmPassword = req.body["confirm-password"];
    if (password !== confirmPassword || password.length < 8) {
        return res.redirect('/studentPortal/studentsignup');
    }
    next();
}

const matchPassword = (req, res, next) => {
    const roll = req.body["roll"];
    const password = req.body["password"];

    (
        async () => {
            try {
                const data = await userSchema.findOne({ roll: `${roll}` });
                const match = await bcrypt.compare(password, data.password);
                if (match && data) {
                    res.cookie.username = data.fullName;
                    return next()
                }
                else return res.redirect('/studentPortal/studentlogin');
            }
            catch (err) {
                console.log(err);
                return res.redirect('/studentPortal/studentlogin');
            }
            next();
        }
    )()
}

module.exports = {
    checkValidPassword,
    matchPassword
}

