const { models } = require('../../sequelize/index');

async function getAll(req, res) {
	const genres = await models.genres.findAll( );
	res.status(200).json(genres);
};

async function getBo(req, res) {
	let myBo = (req.query);
	const genres = await models.genres.findAll({ where: myBo } );
	if (genres[0]) {
		res.status(200).json(genres);
	} else {
		res.status(404).send('404 - Not found');
	}
};

async function create(req, res) {
	let myBo = (req.query);
	const genre = await models.genres.create(myBo);
	res.status(200).json(genre); 
	
};

async function update(req, res) {
	let myBo = (req.query);
	const genres = await models.genres.update( JSON.parse(myBo.values), {
		where: JSON.parse(myBo.cond)
	  })
	res.status(200).json(genres); 
};

async function removeBo(req, res) {
	let myBo = (req.query);
	const genres = await models.genres.destroy({
		where: myBo
	  });
	res.status(200).json(genres); 
};

module.exports = {
	getAll,
	getBo,
	create,
	update,
	removeBo
};