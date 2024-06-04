const express = require('express');
const route = express.Router();
const path = require('path');

const studentSchema = require('../models/student.model.js');

const { checkValidPassword } = require('../middlewares/signUpPassword.middleware.js');
const { checkUniqueness } = require('../middlewares/checkUniqueness.middleware.js');


async function assignInDataBase(req, res) {
    try {
        student = await studentSchema.create({
            fullName: req.body["student-name"],
            roll: req.body["university-roll"],
            emailPersonal: req.body["personal-email"],
            emailAot: req.body["college-email"],
            password: req.body["password"],
            contact: req.body["contact"],
            gurdian: req.body["guardian-name"],
            gurdianContact: req.body["guardian-contact"],
            localGurdian: req.body["local-guardian-name"],
            localGurdianContact: req.body["local-guardian-contact"],
            permanentAddress: req.body["permanent-address"],
            presentAddress: req.body["present-address"]
        })
        res.redirect('/studentPortal/studentlogin');
    }
    catch (err) {
        console.log(err);
        res.redirect('/studentPortal/studentsignup');
    }
}


route
    .get('/', (req, res) => {
        res.sendFile(path.join(__dirname, '../public/pages', 'studentsignup.html'));
    })
    .post('/', checkValidPassword, checkUniqueness, assignInDataBase)

module.exports = route;