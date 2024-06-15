const express = require('express');
const adminSchema = require('../models/admin.model.js');
const studentSchema = require('../models/student.model.js');
const route = express.Router();

const { adminProtected } = require('../middlewares/adminProtected.middleware.js');

route
    .get('/', adminProtected, async (req, res) => {
        try {
            let adminUser = await adminSchema.findOne({ _id: req.cookies.admin });
            let students = await studentSchema.find().sort({ roll: 1 })
            let info = {
                fullName: adminUser.fullName,
                email: adminUser.email,
                contact: adminUser.contact,
                students
            }
            res.render('adminEdit', info);
        }
        catch (err) {
            res.redirect('/studentPortal/andminlogin');
        }

    })
    .get('/:studentRoll', adminProtected, async (req, res) => {
        try {
            let studentUser = await studentSchema.findOne({ roll: req.params.studentRoll });
            let info = {
                fullName: studentUser.fullName,
                roll: studentUser.roll,
                department: studentUser.department,
                admissionYear: studentUser.admissionYear,
                emailPersonal: studentUser.emailPersonal,
                emailAot: studentUser.emailAot,
                contact: studentUser.contact,
                gurdian: studentUser.gurdian,
                gurdianContact: studentUser.gurdianContact,
                localGurdian: studentUser.localGurdian,
                localGurdianContact: studentUser.localGurdianContact,
                permanentAddress: studentUser.permanentAddress,
                presentAddress: studentUser.presentAddress,
                class10Marks: studentUser.class10Marks,
                class12Marks: studentUser.class12Marks,
                sgpa1: studentUser.semMarks[0] ? studentUser.semMarks[0] : '0',
                sgpa2: studentUser.semMarks[1] ? studentUser.semMarks[1] : '0',
                sgpa3: studentUser.semMarks[2] ? studentUser.semMarks[2] : '0',
                sgpa4: studentUser.semMarks[3] ? studentUser.semMarks[3] : '0',
                sgpa5: studentUser.semMarks[4] ? studentUser.semMarks[4] : '0',
                sgpa6: studentUser.semMarks[5] ? studentUser.semMarks[5] : '0',
                sgpa7: studentUser.semMarks[6] ? studentUser.semMarks[6] : '0',
                sgpa8: studentUser.semMarks[7] ? studentUser.semMarks[7] : '0',
            }
            return res.render('adminStudentEdit', info);
        }
        catch (err) {

        }
        res.redirect('/studentPortal/adminlogin/adminDashboard');
    })
    .post('/:studentRoll', async (req, res) => {
        try {
            let studentUser = await studentSchema.findOne({ roll: `${req.params.studentRoll}` });
            studentUser.fullName = req.body.fullName;
            studentUser.department = req.body.department;
            studentUser.admissionYear = req.body.admissionYear;
            studentUser.emailPersonal = req.body.emailPersonal;
            studentUser.emailAot = req.body.emailAot;
            studentUser.contact = req.body.contact;
            studentUser.gurdian = req.body.gurdian;
            studentUser.gurdianContact = req.body.gurdianContact;
            studentUser.localGurdian = req.body.localGurdian;
            studentUser.localGurdianContact = req.body.localGurdianContact;
            studentUser.permanentAddress = req.body.permanentAddress;
            studentUser.presentAddress = req.body.presentAddress;
            studentUser.class10Marks = req.body.class10Marks;
            studentUser.class12Marks = req.body.class12Marks;
            studentUser.semMarks = [req.body.sgpa1, req.body.sgpa2, req.body.sgpa3, req.body.sgpa4, req.body.sgpa5, req.body.sgpa6, req.body.sgpa7, req.body.sgpa8];
            studentUser.save();
            req.flash('success', 'Profile Updated Successfully');
        }
        catch (err) {
            req.flash('error', 'Error Updating Profile');
        }
        res.redirect('/studentPortal/adminlogin/adminDashboard/' + req.params.studentRoll);
    })
    .post('/', adminProtected, async (req, res) => {
        const formType = req.body.formType;
        if (formType === 'first') {
            try {
                let adminUser = await adminSchema.findOne({ _id: req.cookies.admin });
                adminUser.fullName = req.body.fullName;
                adminUser.email = req.body.email;
                adminUser.contact = req.body.contact;
                adminUser.save();
                req.flash('success', 'Profile Updated Successfully');
            }
            catch (err) {
                req.flash('error', 'Error Updating Profile');
            }
        }
        res.redirect('/studentPortal/adminlogin/adminDashboard')
    })

module.exports = route;