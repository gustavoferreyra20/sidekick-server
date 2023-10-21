const { models } = require('../../sequelize/index');
const bcryptjs = require('bcryptjs');
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

async function login(req, res) {
	const { email, password } = req.body;
	console.log("here")
	const user = await models.users.findOne({
		where: { email },
	});

	if (!user) {
		res.status(404).json({ error: 'Incorrect email or password' });
		return;
	}

	if (bcryptjs.compareSync(password, user.password)) {
		const userWithoutPassword = { ...user.toJSON() };
		delete userWithoutPassword.password;
		res.status(200).json(userWithoutPassword);
	} else {
		res.status(401).json({ error: 'Incorrect email or password' });
	}
}

async function create(req, res) {
	const userData = req.body;

	try {
		const user = await models.users.create(userData);

		const userWithoutPassword = user.toJSON();
		delete userWithoutPassword.password;

		res.status(200).json(userWithoutPassword);
	} catch (error) {
		if (error.name === 'SequelizeUniqueConstraintError') {
			res.status(400).json({ error: 'Email is already in use' });
		} else if (error.name === 'SequelizeValidationError') {
			res.status(400).json({ error: 'Invalid email format' });
		}
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
		case "contact_inf":
			const id_contact_inf = req.params.associationId;
			const account = req.query.account;

			const contact_inf = await models.contact_inf.findByPk(id_contact_inf);

			if (!contact_inf) {
				return res.status(404).json({ error: 'Contact information not found' });
			}

			const hasContact = await user.hasContact_infs(contact_inf);

			if (hasContact) {
				return res.status(404).json({ error: 'User already has this contact information' });
			}

			await user.addContact_infs(contact_inf, { through: { nickname: account } })

			res.status(200).json({ message: 'Contact information added successfully' });
			break;

		case "rewards":
			const id_reward = req.params.associationId;

			const reward = await models.rewards.findByPk(id_reward);

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
			}

			if (type == 'sent') {
				const sentApplications = await models.users.findAll({
					where: { id_user: userId },
					include: [
						{
							model: models.posts,
							attributes: { exclude: ['password'] },
							through: {
								attributes: ['status'],
							}
						},
					],
				});

				res.status(200).json(sentApplications);
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
	create,
	update,
	removeSingle,
	joinPost,
	join,
	joinDelete,
	joinUpdate,
	login
};