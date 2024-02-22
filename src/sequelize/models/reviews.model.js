//Getting the orm instance
const { DataTypes } = require('sequelize');

// defining model
// We export a function that defines the model.
// This function will automatically receive as parameter the Sequelize connection object.
module.exports = (sequelize) => {
	sequelize.define('reviews', {
		id_review: {type:DataTypes.INTEGER, autoIncrement: true, primaryKey:true},
		id_writeruser: DataTypes.INTEGER,
        id_user: DataTypes.INTEGER,
        id_post	: DataTypes.INTEGER,
        abilityscore: DataTypes.INTEGER,
        karmascore: DataTypes.INTEGER,
        comment: DataTypes.STRING,
}, {
    freezeTableName: true,
	timestamps: false
	});
};
