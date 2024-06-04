
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
                ans = true;
            }
        })

    }
    catch (err) {
        console.log((err));
    }
    return ans ? res.redirect('/studentPortal/studentsignup') : next();

}

module.exports = {
    checkUniqueness
}