const view_router = require('express').Router();
const { isLoggedIn } = require('./helpers');
const {User, Post, Comment} = require('../models/index')

view_router.get('/', isLoggedIn, (req, res) => {
    Post.findAll({
      attributes: ['id','title','date_created','content', 'userId'],
      include: [
        {
          model: Comment,
          attributes: ['id', 'content', 'date_created'],
          include: {
            model: User,
            attributes: ['username']
          }
        },
        {
          model: User,
          attributes: ['username']
        }
      ]
    })
      .then(Data => {
        const posts = Data.map(post => post.get({ plain: true }));
        res.render('homepage', {
            posts,
            User,
            isLoggedIn: req.session.user_id
          });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });

view_router.get('/dashboard', isLoggedIn, (req, res) => {
    if (!req.session.user_id) return res.redirect('/login');
    Post.findAll({
      where: {
        userId: req.session.user_id
      },
      attributes: ['id','title','date_created','content', 'userId'],
      include: [
        {
          model: Comment,
          attributes: ['id', 'content', 'postId', 'userId', 'date_created'],
          // include: {
          //   model: User,
          //   attributes: ['username']
          // }
        },
        {
          model: User,
          attributes: ['username']
        }
      ]
    })
      .then(Data => {
        const posts = Data.map(post => post.get({ plain: true }));

        res.render('dashboard', {
            posts,
            User,
            isLoggedIn: req.session.user_id
          });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
})

view_router.get('/login', isLoggedIn, (req, res) => {
    res.render('login', {errors: req.session.errors});
});

view_router.get('/register', isLoggedIn, (req, res) => {
    res.render('register', { errors: req.session.errors});
});

module.exports = view_router