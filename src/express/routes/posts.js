const { models } = require('../../sequelize/index');
const Op = require('sequelize').Op;

models.users.belongsToMany(models.posts, { through: 'applications', foreignKey: 'id_user' });
models.posts.belongsToMany(models.users, {through: 'applications', foreignKey: 'id_post' });


async function getAll(req, res) {
	const posts = await models.posts.findAll( );
	res.status(200).json(posts);
};

async function getBo(req, res) {
	let myBo = (req.query);
	const posts = await models.posts.findAll({ where: myBo } );
	res.status(200).json(posts);
};

async function create(req, res) {
	let myBo = (req.body);
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

async function join(req, res) {
	let myBo = (req.query);

	if (myBo.type == 'received'){
		const usersPosts = await models.posts.findAll({ 
			where: {id_user: myBo.id_user},
			include: [{ 
				model: models.users,
				attributes:{ exclude: ['password']},
			 }],
			
		}) 
	
		res.status(200).json(usersPosts); 
	}

	if (myBo.type == 'sended'){
		const usersPosts = await models.users.findAll({ 
			where: {id_user: myBo.id_user},
			attributes:  [],
			include: [{ 
				model: models.posts,
				attributes:{ exclude: ['password']},
				through: { 
					attributes: ['status'],
					where: {id_post: (myBo.id_post) ?  myBo.id_post : {[Op.ne]: null}}}
			 }],
			
		}) 
	
		res.status(200).json(usersPosts[0].posts); 
	}
	
};

async function joinUpdate(req, res) {
	let myBo = (req.query);

	const user = await models.users.findByPk( myBo.id_user); 
	const post = await models.posts.findByPk( myBo.id_post);
	res.status(200).json(await user.addPosts(post, {through: {status: myBo.status}})); 
};

async function joinDelete(req, res) {
	let myBo = (req.query);
	const user = await models.users.findByPk( myBo.id_user); 
	const post = await models.posts.findByPk( myBo.id_post);
	try{
		res.status(200).json(await user.removePosts(post)); 
	}catch(e){
		console.error(e);
	} 
		
};

module.exports = {
	getAll,
	getBo,
	create,
	joinUpdate,
	removeBo,
	join,
	joinDelete
};