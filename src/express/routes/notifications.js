const { models } = require('../../sequelize/index');

async function getAll(req, res) {
    const adminStatus = await isAdmin(req);

    if (adminStatus) {
        const notifications = await models.notifications.findAll();
        res.status(200).json(notifications);
    } else {
        res.status(401).json({ error: 'Unauthorized' });
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

    const notification = await models.notifications.create(notificationData);
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

async function removeSingle(req, res) {
    const notificationId = req.params.id;
    const notification = await models.notifications.findByPk(notificationId);

    if (notification) {
        await notification.destroy();
        res.status(200).json({ message: 'Deleted successfully' });
    } else {
        res.status(404).send('404 - Not found');
    }
}

module.exports = {
    getAll: getAll,
    getSingle: getSingle,
    create: create,
    update: update,
    removeSingle: removeSingle,
};