const { models } = require('../../sequelize/index');

async function getAll(req, res) {
	const modes = await models.modes.findAll( );
	res.status(200).json(modes);
};

async function getBo(req, res) {
	let myBo = (req.query);
	const modes = await models.modes.findAll({ where: myBo } );
	if (modes[0]) {
		res.status(200).json(modes);
	} else {
		res.status(404).send('404 - Not found');
	}
};

async function create(req, res) {
	let myBo = (req.query);
	const mode = await models.modes.create(myBo);
	res.status(200).json(mode); 
	
};

async function update(req, res) {
	let myBo = (req.query);
	const modes = await models.modes.update( JSON.parse(myBo.values), {
		where: JSON.parse(myBo.cond)
	  })
	res.status(200).json(modes); 
};

async function removeBo(req, res) {
	let myBo = (req.query);
	const modes = await models.modes.destroy({
		where: myBo
	  });
	res.status(200).json(modes); 
};

module.exports = {
	getAll,
	getBo,
	create,
	update,
	removeBo
};