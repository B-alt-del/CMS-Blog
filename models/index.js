const User = require('./User');
const Post = require('./Post');
const Comment = require('./Comment');

// User.hasMany(Post, {
//   foreignKey: 'user_id',
//   onDelete: 'CASCADE'
// });

// Post.belongsTo(User, {
//   foreignKey: 'user_id'
// });

// Post.hasMany(Comment,{
//   foreignKey: 'post_id'
// })

// Comment.belongsTo(User, {
//     foreignKey: 'user_id',
// })
//-----------------------
// User.hasMany(Post, {
//     foreignKey: 'userId'
// });
// //Post-User relationship
// Post.belongsTo(User, {
//     foreignKey: 'userId'
// });

// // Comment-User relationship
// Comment.belongsTo(User, {
//     foreignKey: 'user_id',
//     onDelete: 'cascade',
//     hooks:true
// });

// // Comment-Post relationship
// Comment.belongsTo(Post, {
//     foreignKey: 'post_id',
//     onDelete: 'cascade',
//     hooks: true
// });

// // User-Comment relationsihp
// User.hasMany(Comment, {
//     foreignKey: 'user_id',
//     onDelete: 'cascade',
//     hooks:true
// });

// // Post-Comment relationship
// Post.hasMany(Comment, {
//     foreignKey: 'post_id',
//     onDelete: 'cascade',
//     hooks:true
// })


module.exports = { User, Post, Comment };