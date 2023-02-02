//Getting the orm instance
const { DataTypes } = require('sequelize');

// defining model
// We export a function that defines the model.
// This function will automatically receive as parameter the Sequelize connection object.
module.exports = (sequelize) => {
	sequelize.define('reviews_rewards', {
		id_review: DataTypes.INTEGER,
		id_reward: DataTypes.INTEGER
}, {
    freezeTableName: true,
	timestamps: false
	});
};
