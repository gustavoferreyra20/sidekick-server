const { models } = require('../../sequelize/index');

async function getAll(req, res) {
	const token = await models.tokens.findAll( );
	res.status(200).json(token);
};

async function getBo(req, res) {
	let myBo = (req.query);
	const token = await models.tokens.findAll({ where: myBo } );
	res.status(200).json(token);
};

async function create(req, res) {
	let myBo = (req.body);
	const token = await models.tokens.create(myBo);
	res.status(200).json(token); 
	
};

async function update(req, res) {
	let myBo = (req.query);
	const token = await models.tokens.update( JSON.parse(myBo.values), {
		where: JSON.parse(myBo.cond)
	  })
	res.status(200).json(token); 
};

async function removeBo(req, res) {
	let myBo = (req.query);
	const token = await models.tokens.destroy({
		where: myBo
	  });
	res.status(200).json(token); 
};

module.exports = {
	getAll,
	getBo,
	create,
	update,
	removeBo
};