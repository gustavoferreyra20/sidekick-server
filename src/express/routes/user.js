const { models } = require('../../sequelize/index');
const { getIdParam } = require('../helpers');

async function getAll(req, res) {
	const users = await models.usuarios.findAll( );
	res.status(200).json(users);
};

async function getBo(req, res) {
	let myBo = (req.query);
	const user = await models.usuarios.findAll({ where: myBo } );
	if (user[0]) {
		res.status(200).json(user);
	} else {
		res.status(404).send('404 - Not found');
	}
};

async function create(req, res) {
	let myBo = (req.query);
	const user = await models.usuarios.create(myBo);
	res.status(200).json(user); 
	
};

async function update(req, res) {
	let myBo = (req.query);
	console.log( JSON.parse(myBo.values),   JSON.parse(myBo.cond))
	const user = await models.usuarios.update( JSON.parse(myBo.values), {
		where: JSON.parse(myBo.cond)
	  })
	res.status(200).json(user); 
};

async function removeBo(req, res) {
	let myBo = (req.query);
	const user = await models.usuarios.destroy({
		where: myBo
	  });
	res.status(200).json(user); 
};

module.exports = {
	getAll,
	getBo,
	create,
	update,
	removeBo
};