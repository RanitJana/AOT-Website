const express = require('express');
const route = express.Router();
const url = require('url');

const studentSchema = require('../models/student.model.js');

const { checkValidPassword } = require('../middlewares/signUpPassword.middleware.js');
const { checkUniqueness } = require('../middlewares/checkUniqueness.middleware.js');
const { detectAndSendMail } = require('../middlewares/detectValidOwnerEmail.middleware.js');

const memorySchema = require('../models/memory.model.js');


async function assignInDataBase(req, res, user) {
    try {
        await studentSchema.create({
            fullName: user.fullName,
            roll: user.roll,
            emailPersonal: user.emailPersonal,
            emailAot: user.emailAot,
            password: user.password,
            contact: user.contact,
            gurdian: user.gurdian,
            gurdianContact: user.gurdianContact,
            localGurdian: user.localGurdian,
            localGurdianContact: user.localGurdianContact,
            permanentAddress: user.permanentAddress,
            presentAddress: user.presentAddress,
            class10Marks: 0,
            class12Marks: 0
        })
        req.flash('success', "Sign Up successful");
    }
    catch (err) {
        console.log(err);
        req.flash('error', "Registration failed");
    }
}

route
    .get('/', async (req, res) => {
        let myUrl = url.parse(req.url);
        if (myUrl.query) {
            let user = await memorySchema.findOne({ uniqueID: myUrl.query.slice(3) });
            if (user) {
                assignInDataBase(req, res, user);
                await memorySchema.deleteOne({ uniqueID: myUrl.query.slice(3) });
                req.flash('success', "Sign Up successful");
                res.redirect('/studentPortal/studentlogin');
            }
            else {
                req.flash('error', "Invalid request");
                res.redirect('/studentPortal/studentsignup');
            }
        } else
            res.render('studentsignup');
    })
    .post('/', checkValidPassword, checkUniqueness, detectAndSendMail, (req, res) => {
        res.render('sendSignupMail');
    })

module.exports = route;