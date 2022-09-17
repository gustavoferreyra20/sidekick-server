//Getting the orm instance
const { DataTypes } = require('sequelize');

// defining model
// We export a function that defines the model.
// This function will automatically receive as parameter the Sequelize connection object.
module.exports = (sequelize) => {
	sequelize.define('platforms_games', {
		id_game: DataTypes.INTEGER,
		id_platform: DataTypes.INTEGER,
}, {
    freezeTableName: true,
	timestamps: false
	});
};
