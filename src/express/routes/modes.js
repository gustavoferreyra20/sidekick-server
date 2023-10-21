const { models } = require('../../sequelize/index');

async function getAll(req, res) {
	const modes = await models.modes.findAll();
	res.status(200).json(modes);
}

async function getSingle(req, res) {
	const modeId = req.params.id;

	const mode = await models.modes.findByPk(modeId);

	if (mode) {
		res.status(200).json(mode);
	} else {
		res.status(404).send('404 - Not found');
	}
}

async function create(req, res) {
	const modeData = req.body;

	const mode = await models.modes.create(modeData);
	res.status(200).json(mode);
}

async function update(req, res) {
	const modeId = req.params.id;
	const modeData = req.body;

	const [updatedRows] = await models.modes.update(modeData, {
		where: { id_mode: modeId },
	});

	if (updatedRows > 0) {
		res.status(200).json({ message: 'Updated successfully' });
	} else {
		res.status(404).send('404 - Not found');
	}
}

async function removeSingle(req, res) {
	const modeId = req.params.id;
	const mode = await models.modes.findByPk(modeId);

	if (mode) {
		await mode.destroy();
		res.status(200).json({ message: 'Deleted successfully' });
	} else {
		res.status(404).send('404 - Not found');
	}
}

module.exports = {
	getAll: getAll,
	getSingle: getSingle,
	create: create,
	update: update,
	removeSingle: removeSingle,
};