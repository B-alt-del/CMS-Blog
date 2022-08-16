const { DataTypes, Model } = require('sequelize');
const User = require('../models/User');
const Comment = require('../models/Comment');


class Post extends Model {};

Post.init({
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    content: {
        type: DataTypes.STRING,
        allowNull: false
    },
    date_created: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
    },
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    // user_id: {
    //     type: DataTypes.INTEGER,
    //     references: {
    //       model: 'user',
    //       key: 'id',
    //     }
    // }

}, {
    sequelize: require('../config/connection'),
    modelName: 'post',
});

Post.hasMany(Comment)
  
Comment.belongsTo(Post)


module.exports = Post;
