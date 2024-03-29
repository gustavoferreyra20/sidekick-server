const { models } = require('../../sequelize/index');
const isAdmin = require('../utils/isAdmin');

models.platforms.belongsToMany(models.games, { through: 'platforms_games', foreignKey: 'id_platform' })

async function getAll(req, res) {
	const platforms = await models.platforms.findAll();
	res.status(200).json(platforms);
}

async function getSingle(req, res) {
	const platformId = req.params.id;

	const platform = await models.platforms.findByPk(platformId);

	if (platform) {
		res.status(200).json(platform);
	} else {
		res.status(404).send('404 - Not found');
	}
}

async function create(req, res) {
	const platformData = req.body;

	const adminStatus = await isAdmin(req);

	if (adminStatus) {
		const platform = await models.platforms.create(platformData);
		res.status(200).json(platform);
	} else {
		res.status(401).json({ error: 'Unauthorized' });
	}
}

async function update(req, res) {
	const platformId = req.params.id;
	const platformData = req.body;
	const adminStatus = await isAdmin(req);

	if (adminStatus) {
		const platform = await models.platforms.findByPk(platformId);

		if (!platform) {
			return res.status(404).send('404 - Not found');
		}

		await platform.update(platformData);

		res.status(200).json({ message: 'Updated successfully' });
	} else {
		res.status(401).json({ error: 'Unauthorized' });
	}
}

async function removeSingle(req, res) {
	const platformId = req.params.id;

	const adminStatus = await isAdmin(req);

	if (adminStatus) {
		const platform = await models.platforms.findByPk(platformId);

		if (platform) {
			await platform.destroy();
			res.status(200).json({ message: 'Deleted successfully' });
		} else {
			res.status(404).send('404 - Not found');
		}
	} else {
		res.status(401).json({ error: 'Unauthorized' });
	}
}

module.exports = {
	getAll: getAll,
	getSingle: getSingle,
	create: create,
	update: update,
	removeSingle: removeSingle,
};