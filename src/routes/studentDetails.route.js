const express = require('express');
const route = express.Router();
const userSchema = require('../models/student.model.js');
const { checkProtected } = require('../middlewares/protected.middleware.js');

async function editDB(req, res, next) {

    let id = req.cookies.id;
    if (!id) return res.redirect('/studentPortal/studentlogin');
    const user = await userSchema.findOne({ _id: `${id}` });
    //update here
    if (user && user.fullName == req.cookies.username) {

        let newSemMarks = [req.body["sgpa1"], req.body["sgpa2"], req.body["sgpa3"], req.body["sgpa4"], req.body["sgpa5"], req.body["sgpa6"], req.body["sgpa7"], req.body["sgpa8"]];
        try {

            user.fullName = req.body["fullName"];
            res.cookie.username = req.body["fullName"];
            user.emailPersonal = req.body["emailPersonal"];
            user.emailAot = req.body["emailAot"];
            user.contact = req.body["contact"];
            user.gurdian = req.body["gurdian"];
            user.gurdianContact = req.body["gurdianContact"];
            user.localGurdian = req.body["localGurdian"];
            user.localGurdianContact = req.body["localGurdianContact"];
            user.permanentAddress = req.body["permanentAddress"];
            user.presentAddress = req.body["presentAddress"];
            user.class10Marks = Number(req.body["class10Marks"]);
            user.class12Marks = Number(req.body["class12Marks"]);
            user.semMarks = [0, 0, 0, 0, 0, 0, 0, 0];
            newSemMarks.forEach((val, idx) => {
                user.semMarks[idx] = val;
            })
            user.save();
            res.cookie.id = user['_id'];
        }
        catch (err) {
            console.log(err);
        }
        return next();
    }
    else res.redirect('/studentPortal/studentlogin');
}


route
    .get('/', checkProtected, async (req, res) => {
        try {

            let id = req.cookies.id;
            const user = await userSchema.findOne({ _id: `${id}` });
            let students = await userSchema.find({ admissionYear: `${user.admissionYear}` }).sort({ roll: 1 });

            let info = {
                fullName: user['fullName'],
                roll: user['roll'],
                department: user['department'],
                admissionYear: user['admissionYear'],
                emailPersonal: user['emailPersonal'],
                emailAot: user['emailAot'],
                contact: user['contact'],
                gurdian: user['gurdian'],
                gurdianContact: user['gurdianContact'],
                localGurdian: user['localGurdian'],
                localGurdianContact: user['localGurdianContact'],
                permanentAddress: user['permanentAddress'],
                presentAddress: user['presentAddress'],
                class10Marks: user['class10Marks'],
                class12Marks: user['class12Marks'],
                sgpa1: user.semMarks[0] ? user.semMarks[0] : 0,
                sgpa2: user.semMarks[1] ? user.semMarks[1] : 0,
                sgpa3: user.semMarks[2] ? user.semMarks[2] : 0,
                sgpa4: user.semMarks[3] ? user.semMarks[3] : 0,
                sgpa5: user.semMarks[4] ? user.semMarks[4] : 0,
                sgpa6: user.semMarks[5] ? user.semMarks[5] : 0,
                sgpa7: user.semMarks[6] ? user.semMarks[6] : 0,
                sgpa8: user.semMarks[7] ? user.semMarks[7] : 0,
                students
            }
            return res.render('studentDetails', info);
        }
        catch (err) {
            return res.redirect('/studentPortal/studentlogin/studentDetails');
        }
    })
    .post('/', editDB, (req, res) => {
        res.redirect('/studentPortal/studentlogin/studentDetails');
    })

module.exports = route;