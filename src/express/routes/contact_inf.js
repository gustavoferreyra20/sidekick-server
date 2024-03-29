const { models } = require('../../sequelize/index');
const isAdmin = require('../utils/isAdmin');

models.contact_inf.belongsToMany(models.users, { through: 'users_contact_inf', foreignKey: 'id_contact_inf' });

async function getAll(req, res) {
	const contactInf = await models.contact_inf.findAll();
	res.status(200).json(contactInf);
}

async function getSingle(req, res) {
	const contactInfId = req.params.id;

	const contactInf = await models.contact_inf.findByPk(contactInfId);

	if (contactInf) {
		res.status(200).json(contactInf);
	} else {
		res.status(404).send('404 - Not found');
	}
}

async function create(req, res) {
	const contactInfData = req.body;

	const adminStatus = await isAdmin(req);

	if (adminStatus) {
		const contactInf = await models.contact_inf.create(contactInfData);
		res.status(200).json(contactInf);
	} else {
		res.status(401).json({ error: 'Unauthorized' });
	}

}

async function update(req, res) {
	const contactInfId = req.params.id;
	const contactInfData = req.body;
	const adminStatus = await isAdmin(req);

	if (adminStatus) {
		const contactInf = await models.contact_inf.findByPk(contactInfId);
		
		if (!contactInf) {
			return res.status(404).send('404 - Not found');
		}

		await contactInf.update(contactInfData);

		res.status(200).json({ message: 'Updated successfully' });
	} else {
		res.status(401).json({ error: 'Unauthorized' });
	}
}

async function removeSingle(req, res) {
	const contactInfId = req.params.id;
	const adminStatus = await isAdmin(req);
	if (adminStatus) {
		const contactInf = await models.contact_inf.findByPk(contactInfId);

		if (contactInf) {
			await contactInf.destroy({ force: true });
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