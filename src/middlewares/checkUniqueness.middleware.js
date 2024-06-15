
const userSchema = require('../models/student.model.js');

//unique valus are -> roll, emailPersonal, emailAot, contact

const checkUniqueness = async (req, res, next) => {
    try {
        let isExist = await userSchema.findOne({ roll: `${req.body["university-roll"]}` });
        if (isExist) {
            req.flash('error', "Your University Roll is already registered!!");
            return res.redirect('/studentPortal/studentsignup');
        }
        isExist = await userSchema.findOne({ emailPersonal: `${req.body["personal-email"]}` });
        if (isExist) {
            req.flash('error', "Your Personal Email is already registered!!");
            return res.redirect('/studentPortal/studentsignup');
        }
        isExist = await userSchema.findOne({ emailAot: `${req.body["college-email"]}` });
        if (isExist) {
            req.flash('error', "Your Aot Mail Id is already registered!!");
            return res.redirect('/studentPortal/studentsignup');
        }
        isExist = await userSchema.findOne({ contact: `${req.body["contact"]}` });
        if (isExist) {
            req.flash('error', "Your Contact Number is already registered!!");
            return res.redirect('/studentPortal/studentsignup');
        }
    }
    catch (err) {
        console.log(err);
        req.flash('error', "Registration failed");
        return res.redirect('/studentPortal/studentsignup');
    }
    return next();
}

module.exports = {
    checkUniqueness
}