const { models } = require('../../sequelize/index');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');

async function login(req, res) {

    const { email, password } = req.body;
    const user = await models.users.findOne({
        where: { email },
    });

    if (!user) {
        res.status(404).json({ error: 'Incorrect email or password' });
        return;
    }

    if (bcryptjs.compareSync(password, user.password)) {
        const userWithoutPassword = { ...user.toJSON() };
        const token = jwt.sign(userWithoutPassword, process.env.JWT_SECRET, { expiresIn: process.env.JWT_TIME_EXPIRES });
        delete userWithoutPassword.password;
        res.status(200).json({ id: userWithoutPassword.id_user, token: token });
    } else {
        res.status(401).json({ error: 'Incorrect email or password' });
    }
}

async function register(req, res) {
    const userData = req.body;

    try {
        const user = await models.users.create(userData);

        const userWithoutPassword = user.toJSON();
        delete userWithoutPassword.password;

        res.status(200).json(userWithoutPassword);
    } catch (error) {
        if (error.name === 'SequelizeUniqueConstraintError') {
            res.status(400).json({ error: 'Email is already in use' });
        } else if (error.name === 'SequelizeValidationError') {
            res.status(400).json({ error: 'Invalid email format' });
        }
    }
}

async function addContactInf(req, res) {
    const userId = req.params.id;
    const user = await models.users.findByPk(userId);
    
    const contactInfId = req.params.associationId;
    const nickname = req.body.nickname;

    const contactInf = await models.contact_inf.findByPk(contactInfId);

    if (!contactInf) {
        return res.status(404).json({ error: 'Contact information not found' });
    }

    const hasContact = await user.hasContact_infs(contactInf);

    if (hasContact) {
        return res.status(404).json({ error: 'User already has this contact information' });
    }

    await user.addContact_infs(contactInf, { through: { nickname: nickname } })

    res.status(200).json({ message: 'Contact information added successfully' });
}

module.exports = {
    login,
    register,
    addContactInf
};