require('dotenv').config()
const mongoose = require('mongoose');
const express = require('express');
const path = require('path')
const app = express();
const session = require('express-session');
const flash = require('connect-flash');

//routing
app
    .use(express.static(path.join(__dirname, './src/public')))
    .use(session({
        resave: false,
        saveUninitialized: false,
        secret: `${process.env.SESSION_SECRET}`
    }))
    .use(flash())
    .use((req, res, next) => {
        res.locals.successMessages = req.flash('success');
        res.locals.errorMessages = req.flash('error');
        next();
    })

const achivement = require('./src/routes/achivement.route.js');
const career = require('./src/routes/career.route.js');
const contact = require('./src/routes/contact.route.js');
const cse = require('./src/routes/cse.route.js');
const curriculum = require('./src/routes/curriculum.route.js');
const department = require('./src/routes/department.route.js');
const departmentNewsLetter = require('./src/routes/departmentNewsLetter.route.js');
const event = require('./src/routes/event.route.js');
const facility = require('./src/routes/facility.route.js');
const faculty = require('./src/routes/faculty.route.js');
const JoinUs = require('./src/routes/joinUs.route.js');
const library = require('./src/routes/library.route.js');
const LifeAOT = require('./src/routes/lifeAOT.route.js')
const MBA = require('./src/routes/MBA.route.js');
const placement = require('./src/routes/placement.route.js');
const programStructure = require('./src/routes/programStructure.route.js');
const regulation = require('./src/routes/regulation.route.js');
const research = require('./src/routes/research.route.js');
const staff = require('./src/routes/staff.route.js');
const StudentActivity = require('./src/routes/studentActivity.route.js');
const studentPortal = require('./src/routes/studentPortal.route.js');
const search = require('./src/routes/search.route.js');
const nss = require('./src/routes/nss.route.js');

app
    .set('view engine', 'ejs')
    .set('views', path.join(__dirname, 'src/views'))
    .use('/achivement', achivement)
    .use('/career', career)
    .use('/contact', contact)
    .use('/CSE', cse)
    .use('/curriculam', curriculum)
    .use('/department', department)
    .use('/departmentNewsLetter', departmentNewsLetter)
    .use('/event', event)
    .use('/facility', facility)
    .use('/faculty', faculty)
    .use('/JoinUs', JoinUs)
    .use('/library', library)
    .use('/LifeAOT', LifeAOT)
    .use('/MBA', MBA)
    .use('/placement', placement)
    .use('/programStructure', programStructure)
    .use('/regulation', regulation)
    .use('/research', research)
    .use('/search', search)
    .use('/staff', staff)
    .use('/StudentActivity', StudentActivity)
    .use('/studentPortal', studentPortal)
    .use('/nss', nss)

app
    .get('/', (req, res) => {
        res.render('index');
    })
    .all('*', (req, res) => {
        res.render('errorPage')
    })

module.exports = app;