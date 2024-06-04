const path = require('path');
const express = require('express');
const bcrypt = require('bcrypt');

const studentSchema = require('../models/student.model.js');
const { listenerCount } = require('process');
const { checkValidPassword } = require('../middlewares/signUpPassword.middleware.js');

const route = express.Router();
let saltRounds = 10;

route
    .use(express.urlencoded({ extended: false }))   //to accept form inputs
    .get('/', (req, res) => {
        res.sendFile(path.join(__dirname, '../public/pages', 'studentPortal.html'));
    })
    .get('/adminlogin', (req, res) => {
        res.sendFile(path.join(__dirname, '../public/pages', 'adminlogin.html'));
    })
    .get('/studentlogin', (req, res) => {
        res.sendFile(path.join(__dirname, '../public/pages', 'studentlogin.html'));
    })
    .get('/studentsignup', (req, res) => {
        res.sendFile(path.join(__dirname, '../public/pages', 'studentsignup.html'));
    })

    .post('/studentsignup', checkValidPassword, (req, res) => {
        try {
            let student;
            bcrypt.hash(req.body["password"], saltRounds, async function (err, hash) {
                // Store hash in your password DB.
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
    })
    .post('/studentlogin', async (req, res) => {
        try {

        }
        catch (err) {
            console.log(err);
        }
    })

module.exports = route;