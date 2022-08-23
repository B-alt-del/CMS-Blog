const view_router = require('express').Router();
const { isLoggedIn } = require('./helpers');
const User = require('../models/User');
const Post = require('../models/Post');
const Comment = require('../models/Comment');
// const {User, Post, Comment} = require('../models/index')


view_router.get('/', isLoggedIn, (req, res) => {
  // console.log(req.session.user_id)
    Post.findAll({
      attributes: ['id','title','date_created','content', 'userId'],
      include: [
        {
          model: Comment,
          attributes: ['id', 'content', 
          // 'post_id', 'user_id', 
          'date_created'],
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

        
        // console.log(req.session)
        // console.log(Data)
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
        // use the ID from the session
        userId: req.session.user_id
      },
      attributes: ['id','title','date_created','content', 'userId'],
      include: [
        {
          model: Comment,
          attributes: ['id', 'content', 
          // 'post_id', 'user_id', 
          'date_created'],
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

//---------------------ADDED saved view router------------------

// view_router.get('/saved', isLoggedIn, (req, res) => {
//     const user_id = req.session.user_id;
//     if (user_id) {
//         return User.findOne({
//             where: {
//                 id: user_id
//             },
//             include: Saved,
//             attributes: ['id', 'email', 'username']
//         })
//         .then( user => {
//             user = {
//                 username: user.username,
//                 email: user.email,
//                 saved: user.saveds.map(save => ({
//                     bodyPart: save.bodyPart,
//                     equipment: save.equipment,
//                     gifUrl: save.gifUrl,
//                     name: save.name,
//                     target: save.target
//                 }))
//             };
//             // console.log(user)
//             res.render('saved', {user});
//         }).catch( err => console.log(err))
//     }
//     res.redirect('/register');
// });

//------------------------------------------------------

module.exports = view_router