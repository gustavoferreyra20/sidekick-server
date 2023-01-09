//Getting the orm instance
const { DataTypes } = require('sequelize');

// defining model
// We export a function that defines the model.
// This function will automatically receive as parameter the Sequelize connection object.
module.exports = (sequelize) => {
	sequelize.define('applications', {
		id_application: {type:DataTypes.INTEGER, primaryKey:true},
        id_post: DataTypes.INTEGER,
		id_userApplicant: DataTypes.INTEGER,
}, {
    freezeTableName: true,
	timestamps: false
	});
};
