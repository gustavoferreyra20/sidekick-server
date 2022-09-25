const { models } = require('../../sequelize/index');
const bcryptjs = require('bcryptjs');

async function getAll(req, res) {
	const user = await models.users.findAll({ attributes:{ exclude: ['password']}});
	res.status(200).json(user);
};

async function getBo(req, res) {
	let myBo = (req.query);
	let user;
	if(myBo.password !== undefined){
		let dbPassword = myBo.password
		delete myBo['password'];
		user = await models.users.findAll({ where: myBo } )
		if(bcryptjs.compareSync(dbPassword, user[0].password)){
			user[0].password = undefined;
			res.status(200).json(user);
		} else {
			res.status(404).send('404 - Not found');
		}
	} else if (user = await models.users.findAll({ where: myBo, attributes:{ exclude: ['password']}})) {
		res.status(200).json(user);
	} else {
		res.status(404).send('404 - Not found');
	}
};

async function create(req, res) {
	let myBo = (req.query);
	const user = await models.users.create(myBo);
	res.status(200).json(user); 
	
};

async function update(req, res) {
	let myBo = (req.query);
	const user = await models.users.update( JSON.parse(myBo.values), {
		where: JSON.parse(myBo.cond)
	  })
	res.status(200).json(user); 
};

async function removeBo(req, res) {
	let myBo = (req.query);
	const user = await models.users.destroy({
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