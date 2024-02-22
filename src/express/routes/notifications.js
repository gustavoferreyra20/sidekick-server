const { models } = require('../../sequelize/index');
const isAdmin = require('../utils/isAdmin');
const { Op } = require('sequelize');
const sendEmail = require('../utils/sendEmail');

async function getAll(req, res) {
    const adminStatus = await isAdmin(req);
    const currentUser = req.auth;

    if (adminStatus) {
        const notifications = await models.notifications.findAll();
        res.status(200).json(notifications);
    } else {
        const notifications = await models.notifications.findAll({ where: { id_user: currentUser.id_user } });
        res.status(200).json(notifications);
    }
}

async function getSingle(req, res) {
    const notificationId = req.params.id;
    const adminStatus = await isAdmin(req);

    if (adminStatus) {
        const notification = await models.notifications.findByPk(notificationId);

        if (notification) {
            res.status(200).json(notification);
        } else {
            res.status(404).send('404 - Not found');
        }
    } else {
        res.status(401).json({ error: 'Unauthorized' });
    }
}

async function create(req, res) {
    const notificationData = req.body;
    const user = await models.users.findByPk(notificationData.id_user);

    const notification = await models.notifications.create(notificationData);
    sendEmail(user.email, notificationData.title, notificationData.message);
    res.status(200).json(notification);
}

async function update(req, res) {
    const notificationId = req.params.id;
    const notificationData = req.body;

    const [updatedRows] = await models.notifications.update(notificationData, {
        where: { id_notification: notificationId },
    });

    if (updatedRows > 0) {
        res.status(200).json({ message: 'Updated successfully' });
    } else {
        res.status(404).send('404 - Not found');
    }
}

async function bulkUpdate(req, res) {
    const notificationData = req.body;
    const currentUser = req.auth;

    const updatedRows = await models.notifications.update(notificationData, {
        where: { id_user: currentUser.id_user, status: { [Op.ne]: notificationData.status } },
    });

    if (updatedRows > 0) {
        res.status(200).json({ message: 'Bulk update successful' });
    } else {
        res.status(200).send({ message: 'No notifications found for bulk update' });
    }
}

async function removeSingle(req, res) {
    const notificationId = req.params.id;
    const adminStatus = await isAdmin(req);
    const notification = await models.notifications.findByPk(notificationId);
    const currentUser = req.auth;

    if (!notification) {
        return res.status(404).send('404 - Not found');
    }

    if (adminStatus) {
        await notification.update({ deleted: 1 });
        res.status(200).json({ message: 'Deleted successfully' });
    } else if (notification.id_user == currentUser.id_user) {
        await notification.update({ deleted: 1 });
        res.status(200).json({ message: 'Deleted successfully' });
    } else {
        res.status(401).json({ error: 'Unauthorized' });
    }

}

module.exports = {
    getAll: getAll,
    getSingle: getSingle,
    create: create,
    update: update,
    bulkUpdate: bulkUpdate,
    removeSingle: removeSingle,
};