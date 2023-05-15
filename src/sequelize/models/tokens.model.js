//Getting the orm instance
const { DataTypes } = require('sequelize');

// defining model
// We export a function that defines the model.
// This function will automatically receive as parameter the Sequelize connection object.
module.exports = (sequelize) => {
	sequelize.define('tokens', {
		id_token: {type:DataTypes.STRING, autoIncrement: true, primaryKey:true},
		id_user: DataTypes.INTEGER,
		token: DataTypes.STRING,
        creation_date: DataTypes.DATE,
		expiration_date: DataTypes.DATE,
		platform: DataTypes.ENUM('electron', 'mobile'),
}, {
    freezeTableName: true,
	timestamps: false
	});
};
