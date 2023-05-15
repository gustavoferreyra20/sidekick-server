const { models } = require('../../sequelize/index');
const bcryptjs = require('bcryptjs');

models.users.belongsToMany(models.contact_inf, { through: 'users_contact_inf', foreignKey: 'id_user' });
models.contact_inf.belongsToMany(models.users, { through: 'users_contact_inf', foreignKey: 'id_contact_inf' });

async function getAll(req, res) {
	const user = await models.users.findAll({ attributes: { exclude: ['password'] } });
	res.status(200).json(user);
};

async function getBo(req, res) {
	let myBo = (req.query);
	let user;
	if (myBo.password !== undefined) {
		let dbPassword = myBo.password
		delete myBo['password'];
		user = await models.users.findAll({ where: myBo })
		if (user.length > 0) {
			if (bcryptjs.compareSync(dbPassword, user[0].password)) {
				user[0].password = undefined;
				res.status(200).json(user);
			} else {
				res.status(200).json({});
			}
		} else {
			res.status(200).send(user);
		}
	} else if (user = await models.users.findAll({ where: myBo, attributes: { exclude: ['password'] } })) {
		res.status(200).json(user);
	} else {
		res.status(404).send('404 - Not found');
	}
};

async function create(req, res) {
	let myBo = (req.body);
	const user = await models.users.create(myBo);
	res.status(200).json(user.dataValues.id_user);

};

async function update(req, res) {
	let myBo = (req.query);
	const user = await models.users.update(JSON.parse(myBo.values), {
		where: JSON.parse(myBo.cond)
	})
	res.status(200).json(user);
};

async function removeBo(req, res) {
	let myBo = (req.query);
	const user = await models.users.destroy({
		where: myBo
	});
	res.status(200).json(user);
};

async function joinUpdate(req, res) {
	let myBo = (req.body);
	const user = await models.users.findByPk(myBo.id_user);

	for (const element of myBo.contact_inf_list) {
		const contact_inf = await models.contact_inf.findByPk(element.platform.id_contact_inf);
		await user.addContact_infs(contact_inf, { through: { nickname: element.account } })
	};

	res.status(200).json({ message: 'Contact information added successfully' });
};

module.exports = {
	getAll,
	getBo,
	create,
	update,
	removeBo,
	joinUpdate
};