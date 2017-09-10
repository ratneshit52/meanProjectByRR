const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');

const User = require('../models/user');

router.post('/register', (req, res, next) => {
    // res.send("This is Router page working");
    let newUser = new User({
        name: req.body.name,
        email: req.body.email,
        username: req.body.username,
        password: req.body.password
    });
    User.addUser(newUser, (err, user) => {
        if (err) {
            res.json({ success: false, msg: 'Failed to register user...!!' });
            throw err;
        } else {
            res.json({ success: true, msg: 'user registered...!!' });
        }
    });
});

router.post('/authenticate', (req, res, next) => {
    // res.send("authenticate page"); 
    const username = req.body.username;
    const password = req.body.password;

    User.getUserByUserName(username, (err, user) => {
        if (err) throw err;

        if (!user) {
            return res.json({ success: false, msg: 'user not found...!!' });
        }

        User.comparePassword(password, user.password, (err, isMatch) => {
            if (err) throw err;
            if (isMatch) {
                const token = jwt.sign(user, config.secret, {
                    expiresIn: 604800 // 1 week
                });
                res.json({
                    success: true,
                    token: 'JWT ' + token,
                    user: {
                        id: user._id,
                        name: user.name,
                        username: user.username,
                        email: user.email
                    }
                });
            } else {
                res.json({ success: false, msg: 'Wrong Password...!!' });
            }
        });
    });
});



router.get('/profile', passport.authenticate('jwt', { session: false }), (req, res, next) => {
    // res.send("profile page");
    res.json({ user: req.user })
        // res.send(req.user);
});

router.get('/validates', (req, res, next) => {
    res.send("validates page");
});

module.exports = router;