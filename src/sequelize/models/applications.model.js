//Getting the orm instance
const { DataTypes } = require('sequelize');

// defining model
// We export a function that defines the model.
// This function will automatically receive as parameter the Sequelize connection object.
module.exports = (sequelize) => {
	sequelize.define('applications', {
		id_application: {type:DataTypes.INTEGER, autoIncrement: true, primaryKey:true},
        id_post: DataTypes.INTEGER,
		id_user: DataTypes.INTEGER,
		status: DataTypes.STRING
}, {
    freezeTableName: true,
	timestamps: false
	});
};
