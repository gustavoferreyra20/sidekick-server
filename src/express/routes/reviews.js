const { models } = require('../../sequelize/index');

async function getAll(req, res) {
	const review = await models.reviews.findAll( );
	res.status(200).json(review);
};

async function getBo(req, res) {
	let myBo = (req.query);
	const review = await models.reviews.findAll({ where: myBo } );
	if (review[0]) {
		res.status(200).json(review);
	} else {
		res.status(404).send('404 - Not found');
	}
};

async function create(req, res) {
	let myBo = (req.query);
	const review = await models.reviews.create(myBo);
	res.status(200).json(review); 
	
};

async function update(req, res) {
	let myBo = (req.query);
	const review = await models.reviews.update( JSON.parse(myBo.values), {
		where: JSON.parse(myBo.cond)
	  })
	res.status(200).json(review); 
};

async function removeBo(req, res) {
	let myBo = (req.query);
	const review = await models.reviews.destroy({
		where: myBo
	  });
	res.status(200).json(review); 
};

module.exports = {
	getAll,
	getBo,
	create,
	update,
	removeBo
};