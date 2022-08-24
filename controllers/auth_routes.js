const auth_router = require('express').Router();
const { isLoggedIn } = require('./helpers');
const {User} = require('../models/index')

// REGISTER
auth_router.post('/register', isLoggedIn, (req, res) => {
    const { username, password } = req.body;
    if(!username || !password) {
        req.session.error = ['SOMETHING ISNT RIGHT, TRY AGAIN'];
        return res.redirect('/register');
    }
    User.findOne({
        where: {
            username: username
        }
    }).then(user => {
        if (user) {
            req.session.errors = ['THAT USERNAME IS ALREADY IN USE'];
            return res.redirect('/register');
        }
        User.create(req.body)
            .then(new_user => {
                req.session.save(() => {
                    req.session.user_id = new_user.id;
                    res.redirect('/');
                });
            }).catch(err => {
                console.log(err);
                req.session.errors = err.errors.map(e => e.message);
                res.redirect('/register');
            });
    });
});

// LOG IN
auth_router.post('/login', isLoggedIn, (req, res) => {
    const { username, password } = req.body;
    if(!username || !password) {
        req.session.errors = ['USERNAME OR PASSWORD IS INCORRECT'];
        return res.redirect('/login');
    }

    User.findOne({
        where: {
            username
        }
    }).then(async user => {
        if (!user) {
      req.session.errors = ['THAT USERNAME IS NOT IN OUR DATABSE'];
      return res.redirect('/login');
    }

        const pass_validated = await user.validatePassword(password, user.password);
        if (!pass_validated) {
            req.session.errors = ['PASSWORD INCORRECT'];
            return res.redirect('/login');
          }
        req.session.save(() => {
            req.session.user_id = user.id
            res.redirect('/');
        });
    });
});

// LOG OUT
auth_router.get('/logout', (req, res) => {
    if (!req.session.user_id) return res.redirect('/');
    req.session.destroy(() => {
        res.redirect('/');
    });
})

module.exports = auth_router
