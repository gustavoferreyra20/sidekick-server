const {DataTypes} = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define('chat_messages', {
    id_message: {type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true},

    id_post: {type: DataTypes.INTEGER, allowNull: false},
    id_user: {type: DataTypes.INTEGER, allowNull: false},

    user_name: {type: DataTypes.STRING, allowNull: false},
    message: {type: DataTypes.STRING(1000), allowNull: false},

    created_at: {type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW},
  }, {
    freezeTableName: true,
    timestamps: false,
  });
};
