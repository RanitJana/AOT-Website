const userSchema = require('../models/student.model.js');

const checkMailRoll = async (req, res, next) => {
    const roll = req.body.roll, email = req.body.email;
    try {
        let user = await userSchema.findOne({ roll: `${roll}` });
        if (!user) {
            req.flash('error', "Invalid Roll Number.");
            return res.redirect('/studentPortal/studentlogin/forgetPassword');
        }
        if (email === user['emailPersonal']) {
            res.cookie('id', user._id);
            return next();
        }
        else {
            req.flash('error', "Invalid email.");
            return res.redirect('/studentPortal/studentlogin/forgetPassword');
        }
    }
    catch (err) {
        req.flash('error', "Invalid Roll or Email! Please try again.")
        console.log(err);
    }
    return res.redirect('/studentPortal/studentlogin/forgetPassword');
}

module.exports = {
    checkMailRoll
}