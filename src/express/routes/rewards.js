const { models } = require('../../sequelize/index');

async function getAll(req, res) {
	const rewards = await models.rewards.findAll( );
	res.status(200).json(rewards);
};

async function getBo(req, res) {
	let myBo = (req.query);
	const rewards = await models.rewards.findAll({ where: myBo } );
	if (rewards[0]) {
		res.status(200).json(rewards);
	} else {
		res.status(404).send('404 - Not found');
	}
};

async function create(req, res) {
	let myBo = (req.query);
	const reward = await models.rewards.create(myBo);
	res.status(200).json(reward); 
	
};

async function update(req, res) {
	let myBo = (req.query);
	const rewards = await models.rewards.update( JSON.parse(myBo.values), {
		where: JSON.parse(myBo.cond)
	  })
	res.status(200).json(rewards); 
};

async function removeBo(req, res) {
	let myBo = (req.query);
	const rewards = await models.rewards.destroy({
		where: myBo
	  });
	res.status(200).json(rewards); 
};

module.exports = {
	getAll,
	getBo,
	create,
	update,
	removeBo
};