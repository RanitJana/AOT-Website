const express = require('express');
const route = express.Router();
const path = require('path');
const bcrypt = require('bcrypt');
const saltRounds = 10;

const studentSchema = require('../models/student.model.js');

const { checkValidPassword } = require('../middlewares/signUpPassword.middleware.js');
const { checkUniqueness } = require('../middlewares/checkUniqueness.middleware.js');


async function assignInDataBase(req, res) {
    try {
        let student;
        bcrypt.hash(req.body["password"], saltRounds, async function (err, hash) {
            // Store hash in  password DB.
            try {
                student = await studentSchema.create({
                    fullName: req.body["student-name"],
                    roll: req.body["university-roll"],
                    emailPersonal: req.body["personal-email"],
                    emailAot: req.body["college-email"],
                    password: hash,
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
        });
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