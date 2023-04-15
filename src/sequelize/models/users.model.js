//Getting the orm instance
const { DataTypes } = require('sequelize');
const bcryptjs = require('bcryptjs');

// defining model
// We export a function that defines the model.
// This function will automatically receive as parameter the Sequelize connection object.
module.exports = (sequelize) => {
	sequelize.define('users', {
		id_user: {type:DataTypes.INTEGER, autoIncrement: true,primaryKey:true},
		name: DataTypes.STRING,
        email: DataTypes.STRING,
        password: DataTypes.STRING,
        description: DataTypes.STRING,
        img: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: "profiles/default.png"
        },
}, {
    freezeTableName: true,
	timestamps: false,
    hooks: {
        // encrypt  password before store it
        beforeCreate:  async (users) =>{
            const salt = await bcryptjs.genSalt();
            users.password = await bcryptjs.hash(users.password, salt);
        },
        beforeBulkUpdate: async (users) => {
            if (users.fields.includes('password')) {
                const salt = await bcryptjs.genSalt();
                users.attributes.password = await bcryptjs.hash(users.attributes.password, salt);
            }
        }
      }
	});
};
