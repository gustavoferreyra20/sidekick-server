const { models } = require('../../sequelize/index');
const path = require('path');
const fs = require('fs');

models.games.belongsToMany(models.platforms, { through: 'platforms_games', foreignKey: 'id_game' });

async function getSingle(req, res) {
    const filepath = req.params[0];
    const imagePath = path.join(__dirname, '../img', filepath);

    // Check if the file exists
    fs.access(imagePath, fs.constants.F_OK, (err) => {
        if (err) {
            return res.status(404).send('404 - Not found');
        }

        res.sendFile(imagePath);
    });
}

async function uploadProfileImage(req, res) {
    const userId = req.params.id_user;
    const userData = {
        img: `profiles/${req.file.filename}`,
    };

    const user = await models.users.findByPk(userId);

    try {
        if (user) {
            await user.update(userData);
            res.status(200).send("Image uploaded successfully");
        } else {
            res.status(404).send('404 - Not found');
        }
    } catch (error) {
        console.error(error);
        res.status(500).send("Error updating user");
    }
}



module.exports = {
    getSingle: getSingle,
    uploadProfileImage: uploadProfileImage
};