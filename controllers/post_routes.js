const post_router = require('express').Router();
const { isLoggedIn } = require('./helpers');
const User = require('../models/User');
const Post = require('../models/Post')

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

module.exports = post_router