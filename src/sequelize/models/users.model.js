//Getting the orm instance
const { DataTypes } = require('sequelize');

// defining model
// We export a function that defines the model.
// This function will automatically receive as parameter the Sequelize connection object.
module.exports = (sequelize) => {
	sequelize.define('users', {
		id_user: {type:DataTypes.INTEGER, primaryKey:true},
		name: DataTypes.STRING,
        email: DataTypes.STRING,
        password: DataTypes.STRING,
        description: DataTypes.STRING,
        img: DataTypes.STRING,
}, {
    freezeTableName: true,
	timestamps: false
	});
};
