const post_router = require('express').Router();
const { isLoggedIn } = require('./helpers');
// const User = require('../models/User');
// const Post = require('../models/Post');
// const Comment = require('../models/Comment');
const {User, Post, Comment} = require('../models/index')


post_router.post('/create-post', (req, res) => {

        User.findByPk(req.session.user_id).then(user => {
            // console.log(req.body)
            // console.log(req.body.title)
            // console.log(req.body.content)
            // console.log(req.session.user_id)
            user.createPost(
                {
                    title: req.body.title,
                    content: req.body.content,
                    user_id: req.session.user_id,
                }
            ).then(new_saved => {
                // res.json(new_saved)
                // console.log(res)
                res.redirect('../')
            })
        })
    })

post_router.get('/', isLoggedIn, (req, res) => {
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

        
        // console.log(req.session.user_id)
        console.log(Data)
        console.log('got to this point')
        res.render('homepage', {
            posts,
            User
            // isLoggedIn: req.session.loggedIn
            });
        })
        .catch(err => {
        console.log(err);
        res.status(500).json(err);
        });
    });


module.exports = post_router