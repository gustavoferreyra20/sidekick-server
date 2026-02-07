const { models } = require('../../sequelize/index');
const dotenv = require('dotenv').config();
var Sequelize = require("sequelize");
const isAdmin = require('../utils/isAdmin');
const bcryptjs = require('bcryptjs');

models.users.belongsToMany(models.contact_inf, { through: 'users_contact_inf', foreignKey: 'id_user' });
models.users.belongsToMany(models.posts, { through: 'applications', foreignKey: 'id_user' });
models.users.hasMany(models.reviews, { foreignKey: 'id_user' });
models.users.hasMany(models.notifications, { foreignKey: 'id_user' });
models.users.belongsToMany(models.rewards, { through: 'users_rewards', foreignKey: 'id_user' });
models.users.hasOne(models.user_ai_review, { foreignKey: 'id_user' });

async function getAll(req, res) {
	const adminStatus = await isAdmin(req);

	if (adminStatus) {
		const user = await models.users.findAll({ attributes: { exclude: ['password'] } });
		res.status(200).json(user);
	} else {
		res.status(401).json({ error: 'Unauthorized' });
	}
};

async function getSingle(req, res) {
	const userId = req.params.id;

	const user = await models.users.findByPk(userId, {
		attributes: { exclude: ['password'] },
	});

	if (!user) {
		return res.status(404).send('404 - Not found');
	}

	res.status(200).json(user);
}

async function update(req, res) {
	const userId = req.params.id;
	const userData = req.body;
	const currentUser = req.auth;
	const adminStatus = await isAdmin(req);
	const user = await models.users.findByPk(userId);

	if (!user) {
		return res.status(404).send('404 - Not found');
	}


	if (adminStatus) {
		await user.update(userData);
		res.status(200).json({ message: 'Updated successfully' });
	} else if (user.id_user == currentUser.id_user) {
		const { name, description, password, img, show } = userData;

		await user.update({ name, description, password, img });
		
		if (show !== undefined) {
			let userAIReview = await models.user_ai_review.findOne({
				where: { id_user: userId }
			});
			
			if (userAIReview) {
				await userAIReview.update({ show });
			} else {
				await models.user_ai_review.create({
					id_user: userId,
					ai_review: null,
					show: show
				});
			}
		}
		
		res.status(200).json({ message: 'Updated successfully' });
	} else {
		res.status(401).json({ error: 'Unauthorized' });
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

async function addReview(req, res) {
	const userId = req.params.id;
	const currentUser = req.auth;
	const user = await models.users.findByPk(userId);

	const reviewData = req.body;
	reviewData.id_writeruser = currentUser.id_user;

	const createdReview = await user.createReview(reviewData);

	res.status(201).json({ message: 'Review created successfully', reviewId: createdReview.dataValues.id_review });
}

async function addReward(req, res) {
	const userId = req.params.id;
	const rewardId = req.params.id_reward;
	const user = await models.users.findByPk(userId);

	if (!user) {
		return res.status(404).json({ error: 'User not found' });
	}

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


};

async function getApplications(req, res) {
	const userId = req.params.id;
	const user = await models.users.findByPk(userId);

	if (!user) {
		return res.status(404).json({ error: 'User not found' });
	}

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
}

async function getContact_inf(req, res) {
	const userId = req.params.id;
	const user = await models.users.findByPk(userId);

	if (!user) {
		return res.status(404).json({ error: 'User not found' });
	}

	const contact_inf = await user.getContact_infs({ joinTableAttributes: ['nickname'] });

	res.status(200).json(contact_inf);
}

async function getReviews(req, res) {
	const userId = req.params.id;
	const user = await models.users.findByPk(userId);

	if (!user) {
		return res.status(404).json({ error: 'User not found' });
	}

	const usersPosts = await user.getReviews({
		include: [{
			model: models.users,
			attributes: { exclude: ['password'] }
		}, {
			model: models.rewards,
			attributes: { exclude: ['reviews_rewards'] }
		}
		]
	});

	res.status(200).json(usersPosts);
}

/**
 * Get the last 5 reviews for a specific user
 * @param {number} userId - The ID of the user
 * @returns {Array} Array of the user's last 5 reviews with comments only
 */
async function getUserLastReviews(userId) {
	const user = await models.users.findByPk(userId);

	if (!user) {
		throw new Error('User not found');
	}

	const userReviews = await user.getReviews({
		where: {
			comment: {
				[Sequelize.Op.and]: [
					{ [Sequelize.Op.ne]: null },
					{ [Sequelize.Op.ne]: '' }
				]
			}
		},
		attributes: ['comment'],
		order: [['createdAt', 'DESC']],
		limit: 5
	});

	return userReviews;
}

async function getRewards(req, res) {
	const userId = req.params.id;
	const user = await models.users.findByPk(userId);

	if (!user) {
		return res.status(404).json({ error: 'User not found' });
	}

	const rewards = await user.getRewards({ joinTableAttributes: ['amount'] });

	res.status(200).json(rewards);
}

async function getStats(req, res) {
	const userId = req.params.id;
	const user = await models.users.findByPk(userId);

	if (!user) {
		return res.status(404).json({ error: 'User not found' });
	}

	const stats = await models.reviews.findAll({ attributes: [[Sequelize.fn('AVG', Sequelize.col('abilityscore')), 'abilityscore'], [Sequelize.fn('AVG', Sequelize.col('karmascore')), 'karmascore']], where: { id_user: userId } });

	if (stats[0]) {
		res.status(200).json(stats);
	} else {
		res.status(404).send('404 - Not found');
	}
}

async function getNotifications(req, res) {
	const userId = req.params.id;
	const user = await models.users.findByPk(userId);

	if (!user) {
		return res.status(404).json({ error: 'User not found' });
	}

	const notifications = await user.getNotifications();

	res.status(200).json(notifications);
}

async function updateContact_inf(req, res) {
	const userId = req.params.id;
	const id_contact_inf = req.params.id_contact_inf;
	const user = await models.users.findByPk(userId);

	if (!user) {
		return res.status(404).json({ error: 'User not found' });
	}

	const account = req.query.account;

	const contact_inf = await models.contact_inf.findByPk(id_contact_inf);

	if (!contact_inf) {
		return res.status(404).json({ error: 'Contact information not found' });
	}

	const hasContact = await user.hasContact_infs(contact_inf);

	if (!hasContact) {
		return res.status(404).json({ error: 'Contact information not found' });
	}

	await user.addContact_infs(contact_inf, { through: { nickname: account } });
}

async function updateNotification(req, res) {
	const userId = req.params.id; id_notification
	const id_notification = req.params.id_notification;
	const user = await models.users.findByPk(userId);

	if (!user) {
		return res.status(404).json({ error: 'User not found' });
	}

	const status = req.query.status;

	const notification = await models.notifications.findByPk(id_notification);

	if (!notification) {
		return res.status(404).json({ error: 'Notification not found' });
	}

	if (!status) {
		return res.status(404).json({ error: 'Status not found' });
	}

	await notification.update({ status: status });

	return res.status(200).json({ message: 'Updated successfully' });

};

async function useReward(req, res) {
	const userId = req.params.id;
	const rewardId = req.params.id_reward;
	const user = await models.users.findByPk(userId);

	if (!user) {
		return res.status(404).json({ error: 'User not found' });
	}

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
}

async function removeContact_inf(req, res) {
	const userId = req.params.id;
	const id_contact_inf = req.params.id_contact_inf;
	const user = await models.users.findByPk(userId);

	if (!user) {
		return res.status(404).json({ error: 'User not found' });
	}

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


};

async function checkPassword(req, res) {
	const userId = req.params.id;
	const user = await models.users.findByPk(userId);
	const currentUser = req.auth;
	const { password } = req.body;

	if (!user) {
		return res.status(404).json({ error: 'User not found' });
	}

	if (userId != currentUser.id_user) {
		return res.status(401).json({ error: 'Unauthorized' });
	}

	if (bcryptjs.compareSync(password, user.password)) {
		return res.status(200).json({ match: true });
	} else {
		return res.status(200).json({ match: false });
	}
};

async function getAIReview(req, res) {
	const userId = req.params.id;
	
	try {
		// Find the user first to ensure they exist
		const user = await models.users.findByPk(userId);
		
		if (!user) {
			return res.status(404).json({ error: 'User not found' });
		}

		// Find the AI review for this user
		const userAIReview = await models.user_ai_review.findOne({
			where: { id_user: userId }
		});

		if (!userAIReview) {
			return res.status(404).json({ error: 'No AI review found for this user' });
		}

		if (!userAIReview.ai_review) {
			return res.status(404).json({ error: 'AI review content not available for this user' });
		}

		res.status(200).json({
			id_user: userAIReview.id_user,
			ai_review: userAIReview.ai_review,
			show: userAIReview.show
		});
		
	} catch (error) {
		console.error('Error fetching AI review:', error);
		res.status(500).json({ error: 'Internal server error' });
	}
};

module.exports = {
	getAll,
	getSingle,
	update,
	removeSingle,
	addReview,
	addReward,
	getApplications,
	getContact_inf,
	getReviews,
	getUserLastReviews,
	getRewards,
	getStats,
	getNotifications,
	updateContact_inf,
	updateNotification,
	useReward,
	removeContact_inf,
	checkPassword,
	getAIReview
};