//Getting the orm instance
const { DataTypes } = require('sequelize');

// defining model
// We export a function that defines the model.
// This function will automatically receive as parameter the Sequelize connection object.
module.exports = (sequelize) => {
	sequelize.define('reviews', {
		id_review: {type:DataTypes.INTEGER, primaryKey:true},
		id_writerUser: DataTypes.INTEGER,
        id_user: DataTypes.INTEGER,
        id_post	: DataTypes.INTEGER,
        abilityScore: DataTypes.INTEGER,
        karmaScore: DataTypes.INTEGER,
        comment: DataTypes.STRING,
}, {
    freezeTableName: true,
	timestamps: false
	});
};
