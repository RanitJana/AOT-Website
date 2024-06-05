const express = require('express');
const route = express.Router();
const path = require('path');
const fs = require('fs');
let userData = null;

const userSchema = require('../models/student.model.js');
const { matchPassword } = require('../middlewares/signUpPassword.middleware.js');

const studentDetails = require('./studentDetails.route.js');


async function updateFirstTimeUserData(req, res) {
    let id = res.cookie.id;
    console.log((id));
    if (!id) return res.redirect('/studentPortal/studentlogin');
    const user = await userSchema.findOne({ _id: `${id}` });
    //update here
    if (user) {

        let newSemMarks = [req.body["sgpa1"], req.body["sgpa2"], req.body["sgpa3"], req.body["sgpa4"], req.body["sgpa5"], req.body["sgpa6"], req.body["sgpa7"], req.body["sgpa8"]];

        user.fullName = req.body["fullName"];
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
        user.semMarks = newSemMarks;

    }
    else return res.redirect('/studentPortal/studentlogin');
    // console.log(user);
}

route
    .use(`/studentDetails`, studentDetails)
    .get('/', (req, res) => {
        res.sendFile(path.join(__dirname, '../public/pages', 'studentlogin.html'));
    })
    .post('/', matchPassword, async (req, res) => {
        const jsonData = await userSchema.find().sort({ roll: 1 });
        let data = JSON.stringify(jsonData);
        fs.writeFile(path.join(__dirname, '../public/temp/temp.json'), data,(err)=>{
            if(err) console.log(err);
        });
        return res.redirect('/studentPortal/studentlogin/studentDetails');
    })
module.exports = route;