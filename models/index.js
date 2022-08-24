const User = require('./User');
const Post = require('./Post');
const Comment = require('./Comment');

User.hasMany(Post);

Post.belongsTo(User);

Comment.belongsTo(User, {
    onDelete: 'cascade',
    hooks:true
});

Comment.belongsTo(Post, {
    onDelete: 'cascade',
    hooks: true
});

User.hasMany(Comment, {
    onDelete: 'cascade',
    hooks:true
});

Post.hasMany(Comment, {
    onDelete: 'cascade',
    hooks:true
})

module.exports = { User, Post, Comment };
