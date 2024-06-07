require('dotenv').config();
const nodemailer = require('nodemailer');

function generateOTP(length) {
    const digits = '0123456789';
    let otp = '';
    for (let i = 0; i < length; i++) {
        otp += digits[Math.floor(Math.random() * 10)];
    }
    return otp;
}
let otp = { otp: null }
const sendMail = async (req, res, next) => {
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

        otp.otp = generateOTP(6);
        req.flash('otp', `${otp}`);

        // Email options
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: req.body['email'],
            subject: 'OTP to reset Password',
            text: `Your OTP is :\n${otp.otp}`
        };

        // Send email
        const info = await transporter.sendMail(mailOptions);
        req.flash('success', `An OTP is send to your email ${req.body['email']}`);
        return next();
    } catch (error) {
        console.log(error);
        req.flash('error', `An error occurred. Please Try again!!`);
    }
    res.redirect('/studentPortal/studentlogin/forgetPassword');
}
module.exports = {
    sendMail,
    otp
}