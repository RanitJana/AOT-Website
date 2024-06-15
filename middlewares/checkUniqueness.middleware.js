
const userSchema = require('../models/student.model.js');

//unique valus are -> roll, emailPersonal, emailAot, contact

const checkUniqueness = async (req, res, next) => {

    let ans = false;
    try {

        let uniqueValues = ['roll', 'emailPersonal', 'emailAot', 'contact']
        let inpValues = [req.body["university-roll"], req.body["personal-email"], req.body["college-email"], req.body["contact"],];
        uniqueValues.forEach(async (value, index) => {

            let isExist = await userSchema.findOne({ [value]: `${inpValues[index]}` });
            if (isExist) {
                req.flash('error', "Your University Roll or Personal Email or Aot Mail Id is already registered!!")
                ans = true;
            }
        })

    }
    catch (err) {
        // console.log((err));
    }
    if (ans) {
        return res.redirect('/studentPortal/studentsignup');
    }
    return next();

}

module.exports = {
    checkUniqueness
}