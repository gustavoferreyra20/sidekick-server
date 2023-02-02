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

async function join(req, res) {
	let myBo = (req.query);
	models.rewards.belongsToMany(models.users, {through: 'users_rewards', foreignKey: 'id_reward' })
	models.users.belongsToMany(models.rewards, {through: 'users_rewards', foreignKey: 'id_user' })

	const user = await models.users.findOne({ where: myBo })
	const rewards = await user.getRewards({ joinTableAttributes: ['amount'] });

	res.status(200).json(rewards); 
};

async function joinDelete(req, res) {
	let myBo = (req.query);
	models.rewards.belongsToMany(models.users, {through: 'users_rewards', foreignKey: 'id_reward'})
	models.users.belongsToMany(models.rewards, {through: 'users_rewards', foreignKey: 'id_user'})

	const user = await models.users.findOne({ 
		where: {id_user: myBo.id_user},
		attributes:{ exclude: ['password']}		
	})

	const reward = await models.rewards.findOne({ 
		where: {id_reward: myBo.id_reward}		
	})
	
	
	try{
		var previousAmount = (await user.getRewards({where: {id_reward: myBo.id_reward}}))[0]['users_rewards']['dataValues']['amount'];
		if ( typeof  previousAmount !== "undefined" &&  previousAmount > 1) {
			res.status(200).json(await user.addRewards(reward,{through: {amount: previousAmount - 1}})); 
		} else{
			res.status(200).json(await user.removeReward(reward)); 
		}
	}catch(e){
		console.error(e);
	} 
		

};


module.exports = {
	getAll,
	getBo,
	create,
	update,
	removeBo,
	join,
	joinDelete
};