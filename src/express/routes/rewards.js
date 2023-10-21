const { models } = require('../../sequelize/index');

models.rewards.belongsToMany(models.users, { through: 'users_rewards', foreignKey: 'id_reward' });
models.rewards.belongsToMany(models.reviews, { through: 'reviews_rewards', foreignKey: 'id_reward' });

async function getAll(req, res) {
	const rewards = await models.rewards.findAll();
	res.status(200).json(rewards);
};

async function getSingle(req, res) {
	const rewardId = req.params.id;
	const reward = await models.rewards.findByPk(rewardId);

	if (reward) {
		res.status(200).json(reward);
	} else {
		res.status(404).send('404 - Not found');
	}
};

async function create(req, res) {
	const rewardData = req.body;

	const reward = await models.rewards.create(rewardData);
	res.status(200).json(reward);
};

async function update(req, res) {
	const rewardId = req.params.id;
	const reward = await models.rewards.findByPk(rewardId);
	const rewardData = req.body;

	if (reward) {
		await reward.update(rewardData);
		res.status(200).json({ message: 'Updated successfully' });
	} else {
		res.status(404).send('404 - Not found');
	}
};

async function removeSingle(req, res) {
	const rewardId = req.params.id;
	const reward = await models.rewards.findByPk(rewardId);

	if (reward) {
		await reward.destroy();
		res.status(200).json({ message: 'Deleted successfully' });
	} else {
		res.status(404).send('404 - Not found');
	}
};

module.exports = {
	getAll: getAll,
	getSingle: getSingle,
	create: create,
	update: update,
	removeSingle: removeSingle,
};