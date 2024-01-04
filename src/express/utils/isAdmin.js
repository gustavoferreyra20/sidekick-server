const { models } = require('../../sequelize/index');

async function isAdmin(req) {
    const currentUser = req.auth;

    try {
        const adminRole = await models.roles.findOne({
            where: {
                name: "ADMIN"
            }
        });

        return !(!adminRole || currentUser.role !== adminRole.id_role);

    } catch (error) {
        console.error("Error while checking admin role:", error);
        return false;
    }
}

module.exports = isAdmin;