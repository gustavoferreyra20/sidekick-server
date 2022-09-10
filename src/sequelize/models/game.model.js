//Getting the orm instance
const { DataTypes } = require('sequelize');

// defining model
// We export a function that defines the model.
// This function will automatically receive as parameter the Sequelize connection object.
module.exports = (sequelize) => {
	sequelize.define('juego', {
		id_juego: {type:DataTypes.INTEGER, primaryKey:true},
		nombre: DataTypes.STRING,
        img: DataTypes.STRING,
}, {
    freezeTableName: true,
	timestamps: false
	});
};
