//Getting the orm instance
const { DataTypes } = require('sequelize');

// defining model
// We export a function that defines the model.
// This function will automatically receive as parameter the Sequelize connection object.
module.exports = (sequelize) => {
	sequelize.define('genres', {
		id_genre: {type:DataTypes.INTEGER, autoIncrement: true, primaryKey:true},
		name: DataTypes.STRING,
}, {
    freezeTableName: true,
	timestamps: false
	});
};
