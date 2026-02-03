//Getting the orm instance
const { DataTypes } = require('sequelize');

// defining model
// We export a function that defines the model.
// This function will automatically receive as parameter the Sequelize connection object.
module.exports = (sequelize) => {
    sequelize.define('user_ai_review', {
        id_user: { 
            type: DataTypes.INTEGER, 
            primaryKey: true,
            references: {
                model: 'users',
                key: 'id_user'
            },
            onDelete: 'CASCADE'
        },
        ai_review: {
            type: DataTypes.STRING,
            allowNull: true
        },
        show: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true
        }
    }, {
        freezeTableName: true,
        timestamps: false
    });
};