const { models } = require('../../sequelize/index');

models.reviews.belongsTo(models.users, { foreignKey: 'id_writerUser' });
models.reviews.belongsToMany(models.rewards, { through: 'reviews_rewards', foreignKey: 'id_review' });

async function getAll(req, res) {
	const review = await models.reviews.findAll();
	res.status(200).json(review);
};

async function getSingle(req, res) {
	const reviewId = req.params.id;
	const review = await models.reviews.findByPk(reviewId);

	if (review) {
		res.status(200).json(review);
	} else {
		res.status(404).send('404 - Not found');
	}
};

async function create(req, res) {
	let reviewData = (req.body);
	const review = await models.reviews.create(reviewData);
	if (reviewData.reward != undefined) {

		try {
			await review.addReward(reviewData.reward);
		} catch (e) {
			console.error(e);
		}
	}
	res.status(200).json(review);

};

async function update(req, res) {
	const reviewId = req.params.id;
	const review = await models.reviews.findByPk(reviewId);
	const reviewData = req.body;

	if (review) {
		await review.update(reviewData);
		res.status(200).json({ message: 'Updated successfully' });
	} else {
		res.status(404).send('404 - Not found');
	}
}

async function removeSingle(req, res) {
	const reviewId = req.params.id;
	const review = await models.reviews.findByPk(reviewId);

	if (review) {
		await review.destroy();
		res.status(200).json({ message: 'Deleted successfully' });
	} else {
		res.status(404).send('404 - Not found');
	}
};

async function joinPost(req, res) {
	const reviewId = req.params.id;
	const associationName = req.params.associationName;

	const review = await models.reviews.findByPk(reviewId);

	if (!review) {
		return res.status(404).json({ error: 'Review not found' });
	}

	switch (associationName) {
		case "rewards":
			const rewardId = req.params.associationId;

			const reward = await models.rewards.findByPk(rewardId);

			if (!reward) {
				return res.status(404).json({ error: 'Reward not found' });
			}

			review.addReward(reward)

			res.status(200).json({ message: 'Reward added successfully' });
			break;

		default:
			res.status(404).json({ error: 'Association not found' });
			break;
	}

};

module.exports = {
	getAll: getAll,
	getSingle: getSingle,
	create: create,
	update: update,
	removeSingle: removeSingle,
	joinPost: joinPost,
};