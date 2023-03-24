//Getting the orm instance
const { DataTypes } = require('sequelize');

// defining model
// We export a function that defines the model.
// This function will automatically receive as parameter the Sequelize connection object.
module.exports = (sequelize) => {
	sequelize.define('users_contact_inf', {
		id_user: DataTypes.INTEGER,
		id_contact_inf: DataTypes.INTEGER,
        nickname: DataTypes.STRING
}, {
    freezeTableName: true,
	timestamps: false
	});
};
