const { models } = require('../../sequelize/index');

async function getAll(req, res) {
	const medals = await models.medals.findAll( );
	res.status(200).json(medals);
};

async function getBo(req, res) {
	let myBo = (req.query);
	const medals = await models.medals.findAll({ where: myBo } );
	if (medals[0]) {
		res.status(200).json(medals);
	} else {
		res.status(404).send('404 - Not found');
	}
};

async function create(req, res) {
	let myBo = (req.query);
	const medal = await models.medals.create(myBo);
	res.status(200).json(medal); 
	
};

async function update(req, res) {
	let myBo = (req.query);
	const medals = await models.medals.update( JSON.parse(myBo.values), {
		where: JSON.parse(myBo.cond)
	  })
	res.status(200).json(medals); 
};

async function removeBo(req, res) {
	let myBo = (req.query);
	const medals = await models.medals.destroy({
		where: myBo
	  });
	res.status(200).json(medals); 
};

module.exports = {
	getAll,
	getBo,
	create,
	update,
	removeBo
};