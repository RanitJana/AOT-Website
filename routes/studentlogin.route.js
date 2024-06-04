const express = require('express');
const route = express.Router();
const path = require('path');
const fs = require('fs');
let userData = null;

const userSchema = require('../models/student.model.js');
const { matchPassword } = require('../middlewares/signUpPassword.middleware.js');

// const studentDetails = require('./studentDetails.route.js');

async function editDB() {
    let roll = res.cookie.roll;
    const user = await userSchema.findOne({ roll: `${roll}` });
    //update here
    // if()
    console.log(user);
}

route
    // .use(`/studentDetails`, studentDetails)
    .get('/', (req, res) => {
        res.sendFile(path.join(__dirname, '../public/pages', 'studentlogin.html'));
    })
    .post('/', matchPassword, async (req, res) => {
        const formType = req.body.formType;
        switch (formType) {
            case 'default':
                let data = JSON.stringify((await userSchema.find()));
                // console.log(res.cookie.roll);
                try {
                    fs.writeFileSync(path.join(__dirname, '../public/temp/temp.json'), data);
                }
                catch (err) {

                }
                break;
            default:
                editDB();
        }
        res.sendFile(path.join(__dirname, '../public/pages', 'studentDetails.html'));
    })
    .post('/edit', async (req, res, next) => { })
module.exports = route;