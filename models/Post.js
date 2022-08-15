const { DataTypes, Model } = require('sequelize');
const bcrypt = require('bcrypt');

class Post extends Model {};


//     post title, contents, post creator’s username, and date created for that post and have the option to leave a comment


Post.init({
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    contents: {
        type: DataTypes.STRING,
        allowNull: false
        }
    //created by

    // date created
}, {
    sequelize: require('../config/connection'),
    modelName: 'post',
    // hooks: {
    //     async beforeCreate(user) {
    //         const encrypted_password = await bcrypt.hash(user.password, 10);
    //         user.password = encrypted_password;
    //     }
    // }
});

User.prototype.validatePassword = async function (password, encrypted_password) {
    return await bcrypt.compare(password, encrypted_password)
};

module.exports = User;