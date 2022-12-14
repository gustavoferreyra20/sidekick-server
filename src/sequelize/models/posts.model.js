//Getting the orm instance
const { DataTypes } = require('sequelize');

// defining model
// We export a function that defines the model.
// This function will automatically receive as parameter the Sequelize connection object.
module.exports = (sequelize) => {
	sequelize.define('posts', {
		id_post: {type:DataTypes.INTEGER, primaryKey:true},
		id_user: DataTypes.STRING,
        id_game: DataTypes.INTEGER,
        id_platform	: DataTypes.INTEGER,
        id_mode	: DataTypes.INTEGER,
        requiredUsers: DataTypes.INTEGER,
        actualUsers: DataTypes.INTEGER,
        title: DataTypes.STRING,
        description: DataTypes.STRING,
        date: DataTypes.TIME,
}, {
    freezeTableName: true,
	timestamps: false
	});
};
