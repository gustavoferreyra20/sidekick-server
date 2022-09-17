const { models } = require('../../sequelize/index');

async function getAll(req, res) {
	await models.platforms_games.removeAttribute('id');
	const platforms_games = await models.platforms_games.findAll( );
	res.status(200).json(platforms_games);
};

async function getBo(req, res) {
	await models.platforms_games.removeAttribute('id');
	let myBo = (req.query);
	const platforms_games = await models.platforms_games.findAll({ where: myBo } );
	if (platforms_games[0]) {
		res.status(200).json(platforms_games);
	} else {
		res.status(404).send('404 - Not found');
	}
};

async function create(req, res) {
	await models.platforms_games.removeAttribute('id');
	let myBo = (req.query);
	const relation = await models.platforms_games.create(myBo);
	res.status(200).json(relation); 
	
};

async function update(req, res) {
	await models.platforms_games.removeAttribute('id');
	let myBo = (req.query);
	const platforms_games = await models.platforms_games.update( JSON.parse(myBo.values), {
		where: JSON.parse(myBo.cond)
	  })
	res.status(200).json(platforms_games); 
};

async function removeBo(req, res) {
	await models.platforms_games.removeAttribute('id');
	let myBo = (req.query);
	const platforms_games = await models.platforms_games.destroy({
		where: myBo
	  });
	res.status(200).json(platforms_games); 
};

module.exports = {
	getAll,
	getBo,
	create,
	update,
	removeBo
};