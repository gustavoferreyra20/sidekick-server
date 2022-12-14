//Getting the orm instance
const { DataTypes } = require('sequelize');

// defining model
// We export a function that defines the model.
// This function will automatically receive as parameter the Sequelize connection object.
module.exports = (sequelize) => {
	sequelize.define('medals', {
		id_medal: {type:DataTypes.INTEGER, primaryKey:true},
		name: DataTypes.STRING,
        desciption: DataTypes.STRING,
        price: DataTypes.DECIMAL,
        img: DataTypes.TIME,
}, {
    freezeTableName: true,
	timestamps: false
	});
};
