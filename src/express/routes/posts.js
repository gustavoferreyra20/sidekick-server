const { models } = require('../../sequelize/index');

async function getAll(req, res) {
	const posts = await models.posts.findAll( );
	res.status(200).json(posts);
};

async function getBo(req, res) {
	let myBo = (req.query);
	const posts = await models.posts.findAll({ where: myBo } );
	if (posts[0]) {
		res.status(200).json(posts);
	} else {
		res.status(404).send('404 - Not found');
	}
};

async function create(req, res) {
	let myBo = (req.query);
	const post = await models.posts.create(myBo);
	res.status(200).json(post); 
	
};

async function update(req, res) {
	let myBo = (req.query);
	const posts = await models.posts.update( JSON.parse(myBo.values), {
		where: JSON.parse(myBo.cond)
	  })
	res.status(200).json(posts); 
};

async function removeBo(req, res) {
	let myBo = (req.query);
	const posts = await models.posts.destroy({
		where: myBo
	  });
	res.status(200).json(posts); 
};

module.exports = {
	getAll,
	getBo,
	create,
	update,
	removeBo
};