const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');
const flash = require('connect-flash');
const session = require('express-session');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

//mongo db//
mongoose
    .connect(process.env.MONGO_URL)
    .then(() => console.log("MongoDB Connection Successful!"))
    .catch((erro) => {
        console.log(err);
    });

//MONGO_URL =mongodb+srv://cweston0727:RIpcpqZAFy0W9qQu@cluster0.ahgdx.mongodb.net/habittracker?retryWrites=true&w=majority

//ejs//
app.use(expressLayouts);
app.use("/assets", express.static('./assets'));
app.set('view engine', 'ejs');

//body-parser//
app.use(express.urlencoded({ extended: false }));

//express-session//
app.use(
    session({
        secret: 'secret',
        resave: true,
        saveUninitialized: true
    })
);


app.use(flash());


app.use(function (req, res, next) {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    next();
});

//routes//
app.use('/', require('./routes/index'));
app.use('/users', require('./routes/users'));

const PORT = process.env.PORT || 2121;

app.listen(process.env.PORT || 2121, () => {
    console.log("and we are runninggg!");
});

