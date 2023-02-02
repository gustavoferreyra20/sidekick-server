//Getting the orm instance
const { DataTypes } = require('sequelize');

// defining model
// We export a function that defines the model.
// This function will automatically receive as parameter the Sequelize connection object.
module.exports = (sequelize) => {
	sequelize.define('tokens', {
		session: {type:DataTypes.STRING, autoIncrement: true, primaryKey:true},
		token: DataTypes.STRING,
        expire: DataTypes.DATE,
}, {
    freezeTableName: true,
	timestamps: false
	});
};
