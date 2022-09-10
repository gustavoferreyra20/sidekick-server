//Getting the orm instance
const { DataTypes } = require('sequelize');

// defining model
// We export a function that defines the model.
// This function will automatically receive as parameter the Sequelize connection object.
module.exports = (sequelize) => {
	sequelize.define('usuarios', {
		id_usuario: {type:DataTypes.INTEGER, primaryKey:true},
		nombre: DataTypes.STRING,
        email: DataTypes.STRING,
        password: DataTypes.STRING,
        descripcion: DataTypes.STRING,
        img: DataTypes.STRING,
}, {
    freezeTableName: true,
	timestamps: false
	});
};
