const { DataTypes, Model } = require('sequelize');

class Post extends Model {};

Post.init({
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    contents: {
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
    user_id: {
        type: DataTypes.INTEGER,
        references: {
          model: 'user',
          key: 'id',
        }
    }

}, {
    sequelize: require('../config/connection'),
    modelName: 'post',
});

module.exports = Post;
