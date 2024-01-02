const { Sequelize } = require('sequelize');

// In a real app, you should keep the database connection URL as an environment variable.
// But for this example, we will just use a local SQLite database.
// const sequelize = new Sequelize(process.env.DB_CONNECTION_URL);
const sequelize = new Sequelize('sidekickdb', 'root', '', {
	host: 'localhost',
	dialect: 'mariadb'/* one of 'mysql' | 'mariadb' | 'postgres' | 'mssql' */
});

const modelDefiners = [
	require('./models/games.model'),
	require('./models/rewards.model'),
	require('./models/platforms_games.model'),
	require('./models/platforms.model'),
	require('./models/posts.model'),
	require('./models/reviews.model'),
	require('./models/users.model'),
	require('./models/modes.model'),
	require('./models/applications.model'),
	require('./models/users_rewards.model'),
	require('./models/reviews_rewards.model'),
	require('./models/contact_inf.model'),
	require('./models/users_contact_inf.model'),
	require('./models/notifications.model')

	// Add more models here...
	// require('./models/item'),
];

// We define all models according to their files.
for (const modelDefiner of modelDefiners) {
	modelDefiner(sequelize);
}

// We export the sequelize connection instance to be used around our app.
module.exports = sequelize;