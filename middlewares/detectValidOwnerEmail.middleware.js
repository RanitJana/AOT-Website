require('dotenv').config();
const nodemailer = require('nodemailer');
const memorySchema = require('../models/memory.model.js');
const getURI = require('../url.serve.js');

function generateRandomString() {
    let str = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_';
    let randomString = '';
    for (let i = 0; i < 15; i++) {
        randomString += str[Math.floor(Math.random() * str.length)];
    }
    return randomString;
}


async function assignInMemoryDataBase(req, res, randomSTR) {
    try {
        await memorySchema.create({
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
            presentAddress: req.body["present-address"],
            class10Marks: 0,
            class12Marks: 0,
            uniqueID: randomSTR
        })
    }
    catch (err) {
        console.log(err);
    }
}


const detectAndSendMail = async (req, res, next) => {
    let randomSTR = generateRandomString();
    let link = `${getURI(req)}` + '?id=' + randomSTR;
    assignInMemoryDataBase(req, res, randomSTR);
    try {

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            secure: true,
            port: 467,
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });
        // Email options
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: req.body['college-email'],
            subject: 'Student Sign Up request at Academy of Technology',
            html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; line-height: 1.6;">
            <h2 style="font-size: 24px; color: #333;">Hello,</h2>
            <p style="font-size: 16px; color: #555;">
                We have received a request to Sign Up for your account at the <strong>Academy of Technology</strong>.
            </p>
            <p style="font-size: 16px; color: #555;">
                Please click on the following link to proceed with your Sign Up in <strong>AOT</strong>:
            </p>
            <p style="font-size: 24px; color: #333; font-weight: bold;text-align:center">
                <a href=${link}>Click here</a>    
            </p>
            <p style="font-size: 16px; color: #555;">
                If you did not request for Sign Up, please ignore this email or contact our support team immediately.
            </p>
            <p style="font-size: 16px; color: #555;">
                Thank you for your attention.
            </p>
            <p style="font-size: 14px; color: #777;">
                Best regards,<br>
                <strong>Academy of Technology</strong><br>
            </p>
        </div>
    `,
        };
        const info = await transporter.sendMail(mailOptions);
        req.flash('success', `A Link is send to your email ${req.body['college-email']}`);
        return next();
    } catch (error) {
        console.log(error);
        req.flash('error', `An error occurred. Please Sign Up again!!`);
    }
    return res.redirect('/studentPortal/studentsignup'); //page
}
module.exports = {
    detectAndSendMail
}