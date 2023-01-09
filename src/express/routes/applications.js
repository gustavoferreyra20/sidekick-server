const { models } = require('../../sequelize/index');

async function getAll(req, res) {
	const applications = await models.applications.findAll( );
	res.status(200).json(applications);
};

async function getBo(req, res) {
	let myBo = (req.query);
	const applications = await models.applications.findAll({ where: myBo } );
	if (applications[0]) {
		res.status(200).json(applications);
	} else {
		res.status(404).send('404 - Not found');
	}
};

async function create(req, res) {
	let myBo = (req.body);
	const application = await models.applications.create(myBo);
	res.status(200).json(application); 
	
};

async function update(req, res) {
	let myBo = (req.query);
	const applications = await models.applications.update( JSON.parse(myBo.values), {
		where: JSON.parse(myBo.cond)
	  })
	res.status(200).json(applications); 
};

async function removeBo(req, res) {
	let myBo = (req.query);
	const applications = await models.applications.destroy({
		where: myBo
	  });
	res.status(200).json(applications); 
};

module.exports = {
	getAll,
	getBo,
	create,
	update,
	removeBo
};