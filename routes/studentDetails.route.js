const express = require('express');
const route = express.Router();
const path = require('path')
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
            user.roll = req.body["roll"];
            user.emailPersonal = req.body["emailPersonal"];
            user.emailAot = req.body["emailAot"];
            // user.password = req.body[];
            user.contact = req.body["contact"];
            user.gurdian = req.body["gurdian"];
            user.gurdianContact = req.body["gurdianContact"];
            user.localGurdian = req.body["localGurdian"];
            user.localGurdianContact = req.body["localGurdianContact"];
            user.permanentAddress = req.body["permanentAddress"];
            user.presentAddress = req.body["presentAddress"];
            user.class10Marks = req.body["class10Marks"];
            user.class12Marks = req.body["class12Marks"];
            newSemMarks.forEach(val => {
                user.semMarks.push(val);
            })

            user.save();
            res.cookie.id = user['_id'];
        }
        catch (err) {
            console.log(err);
            return res.redirect('/studentPortal/studentlogin/studentDetails');
        }
        return next();

    }
    else res.redirect('/studentPortal/studentlogin');

}


route
    .get('/', checkProtected, (req, res) => {
        res.sendFile(path.join(__dirname, '../public/pages', 'studentDetails.html'));
    })
    .post('/', editDB, (req, res) => {
        res.redirect('/studentPortal/studentlogin/studentDetails');
    })

module.exports = route;