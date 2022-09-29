const { models } = require('../../sequelize/index');

async function getAll(req, res) {
	const platforms = await models.platforms.findAll( );
	res.status(200).json(platforms);
};

async function getBo(req, res) {
	let myBo = (req.query);
	const platforms = await models.platforms.findAll({ where: myBo } );
	if (platforms[0]) {
		res.status(200).json(platforms);
	} else {
		res.status(404).send('404 - Not found');
	}
};

async function create(req, res) {
	let myBo = (req.query);
	const platform = await models.platforms.create(myBo);
	res.status(200).json(platform); 
	
};

async function update(req, res) {
	let myBo = (req.query);
	const platforms = await models.platforms.update( JSON.parse(myBo.values), {
		where: JSON.parse(myBo.cond)
	  })
	res.status(200).json(platforms); 
};

async function removeBo(req, res) {
	let myBo = (req.query);
	const platforms = await models.platforms.destroy({
		where: myBo
	  });
	res.status(200).json(platforms); 
};

async function join(req, res) {
	let myBo = (req.query);
	models.games.belongsToMany(models.platforms, {through: 'platforms_games', foreignKey: 'id_game' })
	models.platforms.belongsToMany(models.games, {through: 'platforms_games', foreignKey: 'id_platform' })

	const gamePlatforms = await models.games.findOne({ 
		where: myBo,
		include: [ models.platforms ]
	})
	res.status(200).json(gamePlatforms.platforms); 
};

module.exports = {
	getAll,
	getBo,
	create,
	update,
	removeBo,
	join
};