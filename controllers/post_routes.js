const post_router = require('express').Router();
const { isLoggedIn } = require('./helpers');
const {User, Post, Comment} = require('../models/index');

//--------------------create comment-----------------------
post_router.post('/create-comment/:postId', isLoggedIn, (req, res) => {
    Post.findByPk(req.params.postId).then(post => {
        post.createComment(
            {
                content: req.body.content,
                userId: req.session.user_id
            }
        ).then(new_comment => {
            res.redirect('/')
        })
    })
})
//---------------------create post--------------------------
post_router.post('/create-post', isLoggedIn, (req, res) => {
        User.findByPk(req.session.user_id).then(user => {
            user.createPost(
                {
                    title: req.body.title,
                    content: req.body.content,
                    user_id: req.session.user_id,
                }
            ).then(new_saved => {
                // res.json(new_saved)
                res.redirect('/dashboard')
                // console.log(new_saved)
            })
        })
    })
//-----------------------delete post--------------------------
post_router.delete('/delete-post/:postId', isLoggedIn, (req, res) => {
    Post.destroy({
        where: {
          id: req.params.postId,
        },
      })
        .then(() => {
            res.redirect('/dashboard')
        })
        .catch((err) => res.json(err));
})
//-----------------------update post--------------------------
post_router.post('/update-post/:postId', isLoggedIn, (req, res) => {
    Post.update(
        {
            title: req.body.title,
            content: req.body.content
        },
        {
            where: {id: req.params.postId}
        }
    ).then(() => {
        res.redirect('/dashboard')
    }).catch((err) => {
        console.log(err);
        res.json(err);
    })
})

module.exports = post_router