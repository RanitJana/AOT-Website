
const userSchema = require('../models/student.model.js');

const checkProtected = async (req, res, next) => {
    if (req.cookies.id) {
        let user = await userSchema.findOne({ _id: req.cookies.id });
        if (user.fullName == req.cookies.username)
            return next();
    }
    return res.redirect('/studentPortal/studentlogin');
}

module.exports = {
    checkProtected
}