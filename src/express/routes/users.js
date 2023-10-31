const { models } = require('../../sequelize/index');
const dotenv = require('dotenv').config();
var Sequelize = require("sequelize");

models.users.belongsToMany(models.contact_inf, { through: 'users_contact_inf', foreignKey: 'id_user' });
models.users.belongsToMany(models.posts, { through: 'applications', foreignKey: 'id_user' });
models.users.hasMany(models.reviews, { foreignKey: 'id_user' });
models.users.belongsToMany(models.rewards, { through: 'users_rewards', foreignKey: 'id_user' });

async function getAll(req, res) {
	const user = await models.users.findAll({ attributes: { exclude: ['password'] } });
	res.status(200).json(user);
};

async function getSingle(req, res) {
	const userId = req.params.id;
	const user = await models.users.findByPk(userId, {
		attributes: { exclude: ['password'] },
	});

	if (user) {
		res.status(200).json(user);
	} else {
		res.status(404).send('404 - Not found');
	}
}

async function update(req, res) {
	const userId = req.params.id;
	const userData = req.body;

	const [updatedRows] = await models.users.update(userData, {
		where: { id_user: userId },
	});

	if (updatedRows > 0) {
		res.status(200).json({ message: 'Updated successfully' });
	} else {
		res.status(404).send('404 - Not found');
	}
};

async function removeSingle(req, res) {
	const userId = req.params.id;
	const user = await models.users.findByPk(userId);

	if (user) {
		await user.destroy();
		res.status(200).json({ message: 'Deleted successfully' });
	} else {
		res.status(404).send('404 - Not found');
	}
};

async function joinPost(req, res) {
	const userId = req.params.id;
	const associationName = req.params.associationName;

	const user = await models.users.findByPk(userId);

	if (!user) {
		return res.status(404).json({ error: 'User not found' });
	}

	switch (associationName) {
		case "reviews":
			const reviewData = req.body;
			const writerUserId = req.params.associationId;

			const writerUser = await models.users.findByPk(writerUserId);

			if (!writerUser) {
				return res.status(404).json({ error: 'Writer user not found' });
			}

			reviewData.id_writerUser = writerUserId;

			const createdReview = await user.createReview(reviewData);

			res.status(201).json({ message: 'Review created successfully', reviewId: createdReview.dataValues.id_review });
			break;


		case "rewards":
			const rewardId = req.params.associationId;

			const reward = await models.rewards.findByPk(rewardId);

			if (!reward) {
				return res.status(404).json({ error: 'Reward not found' });
			}

			const hasReward = await user.hasRewards(reward);

			if (!hasReward) {
				await user.addRewards(reward, { through: { amount: 1 } });
			} else {
				const userReward = await user.getRewards({
					through: { attributes: ['amount'] }
				});

				const currentAmount = userReward[0].users_rewards.amount;
				await userReward[0].users_rewards.update({ amount: currentAmount + 1 });
			}

			res.status(200).json({ message: 'Reward operation completed successfully' });
			break;

		default:
			res.status(404).json({ error: 'Association not found' });
			break;
	}

};

async function join(req, res) {
	const userId = req.params.id;
	const associationName = req.params.associationName;
	const user = await models.users.findByPk(userId);

	if (!user) {
		return res.status(404).json({ error: 'User not found' });
	}

	switch (associationName) {
		case "applications":
			const type = req.query.type;

			if (type == 'received') {
				const usersPosts = await models.posts.findAll({
					where: { id_user: userId },
					include: [{
						model: models.users,
						attributes: { exclude: ['password'] },
					}],

				})

				res.status(200).json(usersPosts);
			} else if (type == 'sent') {
				const sentApplications = await user.getPosts();

				res.status(200).json(sentApplications);
			} else {
				return res.status(404).json({ error: 'Type not found' });
			}
			break;

		case "contact_inf":
			const contact_inf = await user.getContact_infs({ joinTableAttributes: ['nickname'] });

			res.status(200).json(contact_inf);
			break;

		case "reviews":
			const usersPosts = await user.getReviews({
				include: [{
					model: models.users,
					attributes: { exclude: ['password'] }
				}]
			});

			res.status(200).json(usersPosts);
			break;

		case "rewards":
			const rewards = await user.getRewards({ joinTableAttributes: ['amount'] });

			res.status(200).json(rewards);
			break;

		case "stats":
			const stats = await models.reviews.findAll({ attributes: [[Sequelize.fn('AVG', Sequelize.col('abilityScore')), 'abilityScore'], [Sequelize.fn('AVG', Sequelize.col('karmaScore')), 'karmaScore']], where: { id_user: userId } });

			if (stats[0]) {
				res.status(200).json(stats);
			} else {
				res.status(404).send('404 - Not found');
			}
			break;

		default:
			res.status(404).json({ error: 'Association not found' });
			break;
	}

}

async function joinUpdate(req, res) {
	const userId = req.params.id;
	const associationName = req.params.associationName;
	const user = await models.users.findByPk(userId);

	if (!user) {
		return res.status(404).json({ error: 'User not found' });
	}

	switch (associationName) {
		case "contact_inf":
			const id_contact_inf = req.params.associationId;
			const account = req.query.account;

			const contact_inf = await models.contact_inf.findByPk(id_contact_inf);

			if (!contact_inf) {
				return res.status(404).json({ error: 'Contact information not found' });
			}

			const hasContact = await user.hasContact_infs(contact_inf);

			if (!hasContact) {
				return res.status(404).json({ error: 'Contact information not found' });
			}

			await user.addContact_infs(contact_inf, { through: { nickname: account } })

			return res.status(404).json({ error: 'User does not have this contact information' });
			break;

		default:
			res.status(404).json({ error: 'Association not found' });
			break;
	}

};

async function joinDelete(req, res) {
	const userId = req.params.id;
	const associationName = req.params.associationName;

	const user = await models.users.findByPk(userId);

	if (!user) {
		return res.status(404).json({ error: 'User not found' });
	}

	switch (associationName) {
		case "rewards":
			const rewardId = req.params.associationId;
			const reward = await models.rewards.findByPk(rewardId);

			if (!reward) {
				return res.status(404).json({ error: 'Reward not found' });
			}

			const hasReward = await user.hasRewards(reward);

			if (hasReward) {
				const userReward = await user.getRewards({
					where: { id_reward: rewardId },
					through: { attributes: ['amount'] }
				});

				if (userReward.length > 0) {
					const previousAmount = userReward[0].users_rewards.amount;

					if (previousAmount > 1) {
						await userReward[0].users_rewards.update({ amount: previousAmount - 1 });
						res.status(200).json({ message: 'Reward used' });
					} else {
						await user.removeRewards(reward);
						res.status(200).json({ message: 'Reward used' });
					}
				} else {
					return res.status(404).json({ error: 'User does not have this reward' });
				}
			} else {
				return res.status(404).json({ error: 'User does not have this reward' });
			}

			break;

		case "contact_inf":
			const id_contact_inf = req.params.associationId;

			const contact_inf = await models.contact_inf.findByPk(id_contact_inf);

			if (!contact_inf) {
				return res.status(404).json({ error: 'Contact information not found' });
			}

			const hasContact = await user.hasContact_infs(contact_inf);

			if (!hasContact) {
				return res.status(404).json({ error: 'User does not have this contact information' });
			}

			await user.removeContact_infs(contact_inf);

			res.status(200).json({ message: 'Deleted successfully' });

			break;

		default:
			res.status(404).json({ error: 'Association not found' });
			break;
	}

};


module.exports = {
	getAll,
	getSingle,
	update,
	removeSingle,
	joinPost,
	join,
	joinDelete,
	joinUpdate,
};