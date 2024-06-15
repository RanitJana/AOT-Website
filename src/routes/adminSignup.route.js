const express = require('express');
const url = require('url');
const route = express.Router();

const { adminUnique, passwordMatch } = require('../middlewares/adminUnique.middleware.js');
const { adminDetectMail } = require('../middlewares/adminEmailForRegister.middleware.js');

const adminMemorySchema = require('../models/adminMemory.model.js');
const adminSchema = require('../models/admin.model.js');


async function assignInDataBase(req, res, user) {
    try {
        await adminSchema.create({
            fullName: user.fullName,
            email: user.email,
            password: user.password,
            contact: user.contact
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
            let user = await adminMemorySchema.findOne({ uniqueID: myUrl.query.slice(3) });
            if (user) {
                assignInDataBase(req, res, user);
                res.status(200).send(`verified`)
            }
            else {
                res.status(400).send(`Invalid request`);
            }
            await adminMemorySchema.deleteOne({ uniqueID: myUrl.query.slice(3) });
        } else
            res.render('adminSignup');
    })
    .post('/', adminUnique, passwordMatch, adminDetectMail, (req, res) => {
        res.render('pendingVerification');
    })

module.exports = route;