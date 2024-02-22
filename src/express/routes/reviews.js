const { models } = require('../../sequelize/index');
const isAdmin = require('../utils/isAdmin');

models.reviews.belongsTo(models.users, { foreignKey: 'id_writeruser' });
models.reviews.belongsToMany(models.rewards, { through: 'reviews_rewards', foreignKey: 'id_review' });

async function getAll(req, res) {
	const adminStatus = await isAdmin(req);

	if (adminStatus) {
		const review = await models.reviews.findAll();
		res.status(200).json(review);
	} else {
		res.status(401).json({ error: 'Unauthorized' });
	}

};

async function getSingle(req, res) {
	const reviewId = req.params.id;
	const adminStatus = await isAdmin(req);

	if (adminStatus) {
		const review = await models.reviews.findByPk(reviewId);

		if (review) {
			res.status(200).json(review);
		} else {
			res.status(404).send('404 - Not found');
		}
	} else {
		res.status(401).json({ error: 'Unauthorized' });
	}


};

async function create(req, res) {
	let reviewData = (req.body);
	const currentUser = req.auth;

	reviewData.id_writeruser = currentUser.id_user;
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
	const reviewData = req.body;
	const currentUser = req.auth;
	const review = await models.reviews.findOne({
		where: {
			id_review: reviewId,
			id_writeruser: currentUser.id_user
		},
	})

	if (!review) {
		return res.status(404).send('404 - Not found');
	}

	const { comment } = reviewData;

	await review.update({ comment });
	res.status(200).json({ message: 'Updated successfully' });
}

async function removeSingle(req, res) {
	const reviewId = req.params.id;
	const adminStatus = await isAdmin(req);

	if (adminStatus) {
		const review = await models.reviews.findByPk(reviewId);

		if (review) {
			await review.destroy();
			res.status(200).json({ message: 'Deleted successfully' });
		} else {
			res.status(404).send('404 - Not found');
		}
	} else {
		res.status(401).json({ error: 'Unauthorized' });
	}

};

async function addReward(req, res) {
	const reviewId = req.params.id;
	const rewardId = req.params.id_reward;

	const review = await models.reviews.findByPk(reviewId);

	if (!review) {
		return res.status(404).json({ error: 'Review not found' });
	}

	const reward = await models.rewards.findByPk(rewardId);

	if (!reward) {
		return res.status(404).json({ error: 'Reward not found' });
	}

	review.addReward(reward)

	res.status(200).json({ message: 'Reward added successfully' });

};

module.exports = {
	getAll: getAll,
	getSingle: getSingle,
	create: create,
	update: update,
	removeSingle: removeSingle,
	addReward: addReward,
};