const express = require('express');
const app = express();

const achivement = require('./routes/achivement.route.js');
const career = require('./routes/career.route.js');
const contact = require('./routes/contact.route.js');
const cse = require('./routes/cse.route.js');
const curriculum = require('./routes/curriculum.route.js');
const department = require('./routes/department.route.js');
const departmentNewsLetter = require('./routes/departmentNewsLetter.route.js');
const event = require('./routes/event.route.js');
const facility = require('./routes/facility.route.js');
const faculty = require('./routes/faculty.route.js');
const JoinUs = require('./routes/joinUs.route.js');
const library = require('./routes/library.route.js');
const LifeAOT = require('./routes/lifeAOT.route.js')
const MBA = require('./routes/MBA.route.js');
const placement = require('./routes/placement.route.js');
const programStructure = require('./routes/programStructure.route.js');
const regulation = require('./routes/regulation.route.js');
const research = require('./routes/research.route.js');
const staff = require('./routes/staff.route.js');
const StudentActivity = require('./routes/studentActivity.route.js');
const studentPortal = require('./routes/studentPortal.route.js');
const search = require('./routes/search.route.js');

app
    .use(express.static('./public'))
    .set('view engine', 'ejs')
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

app
    .get('/', (req, res) => {
        res.render('index');
    })

module.exports = app;