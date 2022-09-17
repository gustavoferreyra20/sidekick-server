const { models } = require('../../sequelize/index');

async function getAll(req, res) {
	const platforms = await models.platforms.findAll( );
	res.status(200).json(platforms);
};

async function getBo(req, res) {
	let myBo = (req.query);
	const platforms = await models.platforms.findAll({ where: myBo } );
	if (platforms[0]) {
		res.status(200).json(platforms);
	} else {
		res.status(404).send('404 - Not found');
	}
};

async function create(req, res) {
	let myBo = (req.query);
	const platform = await models.platforms.create(myBo);
	res.status(200).json(platform); 
	
};

async function update(req, res) {
	let myBo = (req.query);
	const platforms = await models.platforms.update( JSON.parse(myBo.values), {
		where: JSON.parse(myBo.cond)
	  })
	res.status(200).json(platforms); 
};

async function removeBo(req, res) {
	let myBo = (req.query);
	const platforms = await models.platforms.destroy({
		where: myBo
	  });
	res.status(200).json(platforms); 
};

module.exports = {
	getAll,
	getBo,
	create,
	update,
	removeBo
};