const { models } = require('../../sequelize/index');
const path = require('path');
const fs = require('fs');

models.games.belongsToMany(models.platforms, { through: 'platforms_games', foreignKey: 'id_game' });

async function getSingle(req, res) {
    const filepath = req.params[0];
    let imagePath;

    // Check if filepath starts with "profiles"
    if (filepath.startsWith('profiles/')) {
        // Construct imagePath with the specified directory structure
        imagePath = path.join('/tmp/img', filepath);

        // Check if the file exists
        fs.access(imagePath, fs.constants.F_OK, (err) => {
            if (err) {
                // If file doesn't exist, set imagePath to the default profile image
                imagePath = path.join(__dirname, '../img/profiles/default.png');

                fs.access(imagePath, fs.constants.F_OK, (err) => {
                    if (err) {
                        // If default profile image doesn't exist, return 404
                        return res.status(404).send('404 - Not found');
                    }

                    // If default profile image exists, send it
                    res.sendFile(path.resolve(imagePath)); // Use path.resolve() to get absolute path
                });
                return; // Return to avoid sending the response multiple times
            }

            // If the requested image file exists, send it
            res.sendFile(path.resolve(imagePath)); // Use path.resolve() to get absolute path
        });
    } else {
        // Construct imagePath with the default directory structure
        imagePath = path.join(__dirname, '../img', filepath);

        // Check if the file exists
        fs.access(imagePath, fs.constants.F_OK, (err) => {
            if (err) {
                // If file doesn't exist, return 404
                return res.status(404).send('404 - Not found');
            }

            // If the requested image file exists, send it
            res.sendFile(imagePath);
        });
    }
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