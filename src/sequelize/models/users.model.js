//Getting the orm instance
const { DataTypes } = require('sequelize');
const bcryptjs = require('bcryptjs');

// defining model
// We export a function that defines the model.
// This function will automatically receive as parameter the Sequelize connection object.
module.exports = (sequelize) => {
    sequelize.define('users', {
        id_user: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
        name: DataTypes.STRING,
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true,
            },
        },
        password: DataTypes.STRING,
        description: DataTypes.STRING,
        role: {
            type: DataTypes.BIGINT,
            allowNull: true,
            defaultValue: 2
        },

        img: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: process.env.DEFAULT_PROFILE_PIC_URL
        },
    }, {
        freezeTableName: true,
        timestamps: false,
        hooks: {
            // encrypt  password before store it
            beforeCreate: async (users) => {
                const salt = await bcryptjs.genSalt();
                users.password = await bcryptjs.hash(users.password, salt);
            },
            beforeUpdate: async (user) => {
                if (user.changed('password')) {
                    const salt = await bcryptjs.genSalt();
                    user.password = await bcryptjs.hash(user.password, salt);
                }
            }
        }
    });
};
