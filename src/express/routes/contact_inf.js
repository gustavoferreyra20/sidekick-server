const { models } = require('../../sequelize/index');

async function getAll(req, res) {
	const contact_inf = await models.contact_inf.findAll( );
	res.status(200).json(contact_inf);
};

async function getBo(req, res) {
	let myBo = (req.query);
	const contact_inf = await models.contact_inf.findAll({ where: myBo } );
	if (contact_inf[0]) {
		res.status(200).json(contact_inf);
	} else {
		res.status(404).send('404 - Not found');
	}
};

async function create(req, res) {
	let myBo = (req.query);
	const platform = await models.contact_inf.create(myBo);
	res.status(200).json(platform); 
	
};

async function update(req, res) {
	let myBo = (req.query);
	const contact_inf = await models.contact_inf.update( JSON.parse(myBo.values), {
		where: JSON.parse(myBo.cond)
	  })
	res.status(200).json(contact_inf); 
};

async function removeBo(req, res) {
	let myBo = (req.query);
	const contact_inf = await models.contact_inf.destroy({
		where: myBo
	  });
	res.status(200).json(contact_inf); 
};

async function join(req, res) {
	let myBo = (req.query);
	models.users.belongsToMany(models.contact_inf, {through: 'users_contact_inf', foreignKey: 'id_user' })
	models.contact_inf.belongsToMany(models.users, {through: 'users_contact_inf', foreignKey: 'id_contact_inf' })
	
	models.users.findOne({where: myBo})
	.then(function(user){
		return user.getPlatforms({ joinTableAttributes: [] });
	}).then(function(contact_inf){
		res.status(200).json(contact_inf); 
	})

};

module.exports = {
	getAll,
	getBo,
	create,
	update,
	removeBo,
	join
};