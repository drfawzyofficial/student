/*@ here we include express-framework @*/
const express = require('express');
const app = express();
/*@ here we include express-framework @*/

/*@ here we include third-party middleware => Morgan @*/
const morgan = require('morgan');
app.use(morgan('tiny'));
/*@ here we include third-party middleware => Morgan @*/

/*@ here we include third-party middleware => Cookie-Parser @*/
const cookieParser = require('cookie-parser');
app.use(cookieParser())
/*@ here we include third-party middleware => Cookie-Parser @*/

/*@ here we connect to DB @*/
const mongoose = require("mongoose");
(async () => {
  try {
    await mongoose.connect("mongodb+srv://fawzy:0120975049@onlinecoursebooking-vbcbx.gcp.mongodb.net/globalDB"),
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
      }
    console.log("Connected to mongoDB");
  } catch (err) {
    console.error(err.message);
  }
})()
/*@ here we connect to DB @*/

/*@ here we include static-files @*/
const path = require('path');
app.use('/assets', express.static(path.join(__dirname, 'assets')));
/*@ here we include static-files @*/

/*@ Passport Configuration @*/
require('./config/passport');
/*@ Passport Configuration @*/

/*@ here we set-up body-parser @*/
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
/*@ here we set-up body-parser @*/

/*@ here we set-up template-engine @*/
app.set('view engine', 'ejs');
/*@ here we set-up template-engine @*/

// session as flash needs to session
const session = require('express-session');
app.use(session({
    secret: 'fawzyInc',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false, maxAge: 180 * 60 * 1000 }
}));
// falsh 
const flash = require('connect-flash');
app.use(flash());

/*@ Passport middleware @*/
const passport = require('passport');
app.use(passport.initialize());
app.use(passport.session());
/*@ Passport middleware @*/

/*@ Global variables @*/
app.use((req, res, next) => {
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    res.locals.errors = req.flash('errors');
    res.locals.user = req.user || null
    res.set('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
    next();
});
/*@ Global variables @*/

let loginRouter = require('./routes/loginRouter');
app.use('/', loginRouter);

let studentSystemRouter = require('./routes/studentSystemRouter');
app.use('/studentsystem', studentSystemRouter);

let addStudentRouter = require('./routes/addStudentRouter');
app.use('/addStudent', addStudentRouter);

let showStudentRouter = require('./routes/showStudentRouter');
app.use('/showStudent', showStudentRouter);

let deleteStudentRouter = require('./routes/deleteStudentRouter');
app.use('/deleteStudent', deleteStudentRouter);

let showPaymentRouter = require('./routes/showPaymentRouter');
app.use('/showPayment', showPaymentRouter);

let showAttendanceRouter = require('./routes/showAttendanceRouter');
app.use('/showAttendance', showAttendanceRouter);

let editStudentRouter = require('./routes/editStudentRouter');
app.use('/editStudent', editStudentRouter);

let showMarkRouter = require('./routes/showMarkRouter');
app.use('/showMark', showMarkRouter);

let qrCodeRouter = require('./routes/qrCodeRouter');
app.use('/qrcode', qrCodeRouter);


/*@ Handle Error 404 not found @*/
app.use((req, res, next) => {
    res.render('error404');
    next();
});
/*@ Handle Error 404 not found @*/

/*@ here the server is running on port 3000 @*/
const port = 3000;
app.listen(port, () => console.log(`The Server is running on port-${port}`));
/*@ here the server is running on port 3000 @*/