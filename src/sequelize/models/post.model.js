//Getting the orm instance
const { DataTypes } = require('sequelize');

// defining model
// We export a function that defines the model.
// This function will automatically receive as parameter the Sequelize connection object.
module.exports = (sequelize) => {
	sequelize.define('anuncio', {
		id_anuncio: {type:DataTypes.INTEGER, primaryKey:true},
		id_usuarioPropietario: DataTypes.STRING,
        id_juego: DataTypes.INTEGER,
        id_plataforma: DataTypes.INTEGER,
        usuariosRequeridos: DataTypes.INTEGER,
        usuariosActuales: DataTypes.INTEGER,
        titulo: DataTypes.STRING,
        descripcion: DataTypes.STRING,
        creacion: DataTypes.TIME,
}, {
    freezeTableName: true,
	timestamps: false
	});
};
