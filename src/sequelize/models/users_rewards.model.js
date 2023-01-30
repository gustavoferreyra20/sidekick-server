//Getting the orm instance
const { DataTypes } = require('sequelize');

// defining model
// We export a function that defines the model.
// This function will automatically receive as parameter the Sequelize connection object.
module.exports = (sequelize) => {
	sequelize.define('users_rewards', {
		id_user: DataTypes.INTEGER,
		id_reward: DataTypes.INTEGER,
        amount: DataTypes.INTEGER
}, {
    freezeTableName: true,
	timestamps: false
	});
};
