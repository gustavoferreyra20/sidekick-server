const { models } = require('../../sequelize/index');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const generateRandomString = require('../utils/generateRandomString');
const sendEmail = require('../utils/sendEmail');
const sequelize = require("../../sequelize/index");
const { activationEmailTemplate, resetPasswordEmailTemplate } = require('../utils/emailTemplates');
const crypto = require('crypto');

async function validate(req, res) {
    const { token } = req.body;

    if (!token) {
        res.status(400).json({ error: 'Token is missing' });
        return;
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        res.status(200).json({ message: 'Token is valid' });
    } catch (error) {
        res.status(401).json({ error: 'Token is invalid or has expired' });
    }
}

async function login(req, res) {
    const { email, password } = req.body;
    const user = await models.users.findOne({
        where: { email },
    });

    if (!user) {
        res.status(404).json({ error: 'Incorrect email or password' });
        return;
    }

    if (!user.enabled) {
        return res.status(403).json({ error: 'Account is disabled' });
    }

    if (bcryptjs.compareSync(password, user.password)) {
        const userWithoutPassword = { ...user.toJSON() };
        delete userWithoutPassword.password;
        const token = jwt.sign(userWithoutPassword, process.env.JWT_SECRET, { expiresIn: process.env.JWT_TIME_EXPIRES });
        res.status(200).json({ token: token, id: userWithoutPassword.id_user });
    } else {
        res.status(401).json({ error: 'Incorrect email or password' });
    }
}

async function resetPassword(req, res) {
    const { email } = req.body;

    try {
        const user = await models.users.findOne({ where: { email: email } });

        if (user === null) {
            return res.status(200).json();
        }

        const newPassword = generateRandomString(8);

        await user.update({ password: newPassword });

        // Send the new password by email
        await sendEmail(user.email, "Recuperar contraseña SideKick", resetPasswordEmailTemplate(user.name, newPassword));

        return res.status(200).json({ message: 'Password reset successful. Check your email for the new password.' });
    } catch (error) {
        console.error('Error resetting password:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}

async function register(req, res) {
    const userData = req.body;
    const t = await sequelize.transaction();

    try {
        const token = crypto.randomBytes(32).toString('hex');

        const user = await models.users.create({
            ...userData,
            activation_token: token,
        }, { transaction: t });

        const activationLink = `${process.env.FRONTEND_URL}/activate.php?token=${token}`;
        const html = activationEmailTemplate(user.name, activationLink);

        await sendEmail(user.email, "Activa tu cuenta SideKick", html);

        await t.commit();

        const userWithoutPassword = user.toJSON();
        delete userWithoutPassword.password;
        delete userWithoutPassword.activation_token;

        return res.status(200).json(userWithoutPassword);
    } catch (error) {
        await t.rollback();
        console.error('Error in registration:', error);

        if (error.name === 'SequelizeUniqueConstraintError') {
            return res.status(409).json({ error: 'Email is already in use' });
        } else if (error.name === 'SequelizeValidationError') {
            return res.status(400).json({ error: 'Invalid email format' });
        } else {
            return res.status(500).json({ error: 'Internal server error' });
        }
    }
}

async function addContactInf(req, res) {
    const userId = req.params.id;
    const user = await models.users.findByPk(userId);

    const contactInfId = req.params.id_contact_inf;
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

async function storeToken(req, res) {
    const { sessionId, token } = req.body;

    try {
        const query = `
            INSERT INTO tokens (id_user, token)
            VALUES ($id_user, $token)
            ON CONFLICT (id_user) DO UPDATE
            SET token = $token
            RETURNING *
        `;
        const result = await sequelize.query(query, {
            bind: {
                id_user: sessionId,
                token: token
            },
            type: sequelize.QueryTypes.INSERT
        });

        // If token is successfully stored, send a success response
        res.status(200).json({ message: 'Token stored successfully', data: result[0] });
    } catch (error) {
        // If an error occurs, send an error response
        console.error('Error storing token:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

async function activateAccount(req, res) {
    const { token } = req.query;

    if (!token) {
        return res.status(400).json({ message: 'Token is required' });
    }

    try {
        const user = await models.users.findOne({ where: { activation_token: token } });

        if (!user) {
            return res.status(400).json({ message: 'Invalid token' });
        }

        user.enabled = true;
        user.activation_token = null;
        await user.save();

        return res.status(200).json({
            message: 'Account successfully activated',
            user: {
                id: user.id,
                email: user.email,
                enabled: user.enabled
            }
        });
    } catch (error) {
        console.error('Error activating account:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}

module.exports = {
    validate,
    login,
    resetPassword,
    register,
    addContactInf,
    storeToken,
    activateAccount
};