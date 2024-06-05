
const userSchema = require('../models/student.model.js');

const checkProtected = async (req, res, next) => {
    if (res.cookie.id) {
        let user = await userSchema.findOne({ _id: res.cookie.id });
        if (user.fullName == res.cookie.username)
            return next();
    }
    return res.redirect('/studentPortal/studentlogin');
}

module.exports = {
    checkProtected
}