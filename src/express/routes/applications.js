const { models } = require('../../sequelize/index');

async function getAll(req, res) {
	const applications = await models.applications.findAll( );
	res.status(200).json(applications);
};

async function getBo(req, res) {
	let myBo = (req.query);
	const applications = await models.applications.findAll({ where: myBo } );
	res.status(200).json(applications);
};

async function create(req, res) {
	let myBo = (req.body);
	const application = await models.applications.create(myBo);
	res.status(200).json(application); 
	
};

async function update(req, res) {
	let myBo = (req.body);
	const applications = await models.applications.update(myBo.values, {
		where: myBo.cond
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

async function join(req, res) {
	let myBo = (req.query);
	models.users.belongsToMany(models.posts, { through: 'applications', foreignKey: 'id_user' })
	models.posts.belongsToMany(models.users, {through: 'applications', foreignKey: 'id_post' })

	const usersPosts = await models.posts.findAll({ 
		where: myBo,
		include: [{ 
			model: models.users,
			attributes:{ exclude: ['password']}
		 }]
		
	})
	res.status(200).json(usersPosts); 
};

module.exports = {
	getAll,
	getBo,
	create,
	update,
	removeBo,
	join
};