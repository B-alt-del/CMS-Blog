const { Model, DataTypes } = require('sequelize');

class Comment extends Model {}

Comment.init({
    conetent: {
        type: DataTypes.STRING,
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
    user_id: {
        type: DataTypes.INTEGER,
        references: {
            model: 'user',
            key: 'id',
        },
    },
    blog_id: {
        type: DataTypes.INTEGER,
        references: {
            model: 'post',
            key: 'id',
        },
    },
},  {
    sequelize: require('../config/connection'),
    modelName: 'comment',
    });


module.exports = Comment;