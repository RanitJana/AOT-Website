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
            subject: 'Your OTP for Password Change at Academy of Technology',
            html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; line-height: 1.6;">
            <h2 style="font-size: 24px; color: #333;">Hello,</h2>
            <p style="font-size: 16px; color: #555;">
                We have received a request to change the password for your account at the <strong>Academy of Technology</strong>.
            </p>
            <p style="font-size: 16px; color: #555;">
                Please use the following One-Time Password (OTP) to proceed with your password change:
            </p>
            <p style="font-size: 24px; color: #333; font-weight: bold;text-align:center">
                ${otp.otp}
            </p>
            <p style="font-size: 16px; color: #555;">
                If you did not request a password change, please ignore this email or contact our support team immediately.
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