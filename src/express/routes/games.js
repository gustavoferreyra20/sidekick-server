const { models } = require('../../sequelize/index');

async function getAll(req, res) {
	const games = await models.games.findAll( );
	res.status(200).json(games);
};

async function getBo(req, res) {
	let myBo = (req.query);
	const games = await models.games.findAll({ where: myBo } );
	if (games[0]) {
		res.status(200).json(games);
	} else {
		res.status(404).send('404 - Not found');
	}
};

async function create(req, res) {
	let myBo = (req.query);
	const game = await models.games.create(myBo);
	res.status(200).json(game); 
	
};

async function update(req, res) {
	let myBo = (req.query);
	const games = await models.games.update( JSON.parse(myBo.values), {
		where: JSON.parse(myBo.cond)
	  })
	res.status(200).json(games); 
};

async function removeBo(req, res) {
	let myBo = (req.query);
	const games = await models.games.destroy({
		where: myBo
	  });
	res.status(200).json(games); 
};

module.exports = {
	getAll,
	getBo,
	create,
	update,
	removeBo
};