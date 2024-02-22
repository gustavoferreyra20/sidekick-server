//Getting the orm instance
const { DataTypes } = require('sequelize');

// defining model
// We export a function that defines the model.
// This function will automatically receive as parameter the Sequelize connection object.
module.exports = (sequelize) => {
    sequelize.define('posts', {
        id_post: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
        id_user: DataTypes.STRING,
        id_game: DataTypes.INTEGER,
        id_platform: DataTypes.INTEGER,
        id_mode: DataTypes.INTEGER,
        requiredusers: DataTypes.INTEGER,
        actualusers: DataTypes.INTEGER,
        title: DataTypes.STRING,
        description: DataTypes.STRING,
        date: DataTypes.TIME,
        deleted: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
            allowNull: false,
            set: function (value) {
                if (value === 'true') value = true;
                if (value === 'false') value = false;
                this.setDataValue('deleted', value);
            }
        }
    }, {
        freezeTableName: true,
        timestamps: false,
        defaultScope: {
            where: {
                deleted: false
            }
        }
    });

};
