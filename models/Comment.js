const { Model, DataTypes } = require('sequelize');

class Comment extends Model {}

Comment.init({
    content: {
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
    
},  {
    sequelize: require('../config/connection'),
    modelName: 'comment',
    });


module.exports = Comment;