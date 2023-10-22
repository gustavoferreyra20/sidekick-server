const { models } = require('../../sequelize/index');

async function getAll(req, res) {
	const tokens = await models.tokens.findAll();
	res.status(200).json(tokens);
}

async function getSingle(req, res) {
	const tokenId = req.params.id;
	const token = await models.tokens.findByPk(tokenId);

	if (token) {
		res.status(200).json(token);
	} else {
		res.status(404).send('404 - Not found');
	}
}

async function create(req, res) {
	const tokenData = req.body;

	const token = await models.tokens.create(tokenData);
	res.status(200).json(token);
}

async function update(req, res) {
	const tokenId = req.params.id;
	const token = await models.tokens.findByPk(tokenId);
	const tokenData = req.body;

	if (token) {
		await token.update(tokenData);
		res.status(200).json({ message: 'Updated successfully' });
	} else {
		res.status(404).send('404 - Not found');
	}
}

async function removeSingle(req, res) {
	const tokenId = req.params.id;
	const token = await models.tokens.findByPk(tokenId);

	if (token) {
		await token.destroy();
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