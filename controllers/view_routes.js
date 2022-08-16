const view_router = require('express').Router();
const { isLoggedIn } = require('./helpers');
const User = require('../models/User');
const Post = require('../models/Post');
const Comment = require('../models/Comment');

view_router.get('/', isLoggedIn, (req, res) => {
    const user_id = req.session.user_id;
    if (user_id) {
        return User.findOne({
            where: {
                id: user_id
            },
            attributes: ['id', 'username']
        })
        .then(user => {
            user = {
                username: user.username
            };
            res.render('index', { user});
        });
    }
    res.render('index');
});


view_router.get('/home', isLoggedIn, (req, res) => {
    Post.findAll({
      attributes: ['id','title','date_created','content', 'userId'],
      // include: [
      //   {
      //     model: Comment,
      //     attributes: ['id', 'content', 'post_id', 'user_id', 'date_created'],
      //     include: {
      //       model: User,
      //       attributes: ['username']
      //     }
      //   },
      //   {
      //     model: User,
      //     attributes: ['username']
      //   }
      // ]
    })
      .then(Data => {
        const posts = Data.map(post => post.get({ plain: true }));
        res.render('homepage', {
            posts,
            
            // loggedIn: req.session.loggedIn
          });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });


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