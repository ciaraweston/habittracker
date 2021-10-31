const express = require('express');
const router = express.Router();


const User = require('../models/User')


router.get('/login', (req, res) => res.render('login'));


router.get('/register', (req, res) => res.render('register'));


router.post('/register', (req, res) => {
    const { name, email } = req.body;


    let errors = []; //checking for errors//

    if (!name || !email) {
        errors.push({ msg: 'Please enter all fields' });
    }

    if (errors.length > 0) {
        res.render('register', {
            errors,
            name,
            email
        });
    } else {

        User.findOne({ email: email }).then(user => {
            if (user) {

                errors.push({ msg: 'Email ID already exists' });
                res.render('register', {
                    errors,
                    name,
                    email
                });
            } else {
                const newUser = new User({
                    name,
                    email
                });


                newUser //saving user//
                    .save()
                    .then(user => {
                        req.flash(
                            'success_msg',
                            'You are now registered and can log in'
                        );
                        res.redirect('/users/login');
                    })
                    .catch(err => console.log(err));
            }
        });
    }
});


router.post('/login', (req, res) => {
    const { name, email } = req.body;

    User.findOne({ //checking if user is in DB//
        email: email
    }).then(user => {
        if (!user) {
            let errors = [];
            errors.push({ msg: 'This email is not registered' });
            res.render('login', {
                errors,
                name,
                email
            });
        }

        else {
            res.redirect(`/dashboard?user=${user.email}`); //redirecting to dashboard if user exists//
        }
    });

});


router.get('/logout', (req, res) => {
    // req.logout();
    req.flash('success_msg', 'You are logged out');
    res.redirect('/users/login');
});

module.exports = router;