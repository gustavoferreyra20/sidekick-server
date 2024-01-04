//Getting the orm instance
const { DataTypes } = require('sequelize');

// defining model
// We export a function that defines the model.
// This function will automatically receive as parameter the Sequelize connection object.
module.exports = (sequelize) => {
    sequelize.define('roles', {
        id_role: { type: DataTypes.BIGINT, autoIncrement: true, primaryKey: true },
        name: DataTypes.STRING,
    }, {
        freezeTableName: true,
        timestamps: false
    });
};
