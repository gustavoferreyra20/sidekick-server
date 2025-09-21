const { models } = require('../../sequelize/index');
const path = require('path');
const fs = require('fs');
const { put } = require('@vercel/blob');

models.games.belongsToMany(models.platforms, { through: 'platforms_games', foreignKey: 'id_game' });

async function getSingle(req, res) {
    const filepath = req.params[0];
    
    // Check if this is a Vercel Blob URL (for profiles stored in blob)
    if (filepath.startsWith('https://') && filepath.includes('vercel-storage.com')) {
        // This is a Vercel Blob URL, redirect to it
        return res.redirect(filepath);
    }
    
    // For non-profile images, serve from local storage only
    // Construct imagePath with the default directory structure
    const imagePath = path.join(__dirname, '../img', filepath);

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

async function uploadProfileImage(req, res) {
    const userId = req.params.id_user;

    try {
        if (!req.file) {
            return res.status(400).send('No file uploaded');
        }

        const user = await models.users.findByPk(userId);
        if (!user) {
            return res.status(404).send('User not found');
        }

        // Create filename for the blob
        const filename = `profile-${userId}-${Date.now()}.${req.file.originalname.split('.').pop()}`;
        
        // Upload to Vercel Blob following the example pattern
        const blob = await put(filename, req.file.buffer, {
            access: 'public',
            token: process.env.BLOB_READ_WRITE_TOKEN,
        });

        // Update user with blob URL
        const userData = {
            img: blob.url,
        };

        await user.update(userData);
        
        res.status(200).json({
            message: "Image uploaded successfully",
            url: blob.url
        });
        
    } catch (error) {
        console.error('Error uploading profile image:', error);
        res.status(500).send("Error uploading image");
    }
}



module.exports = {
    getSingle: getSingle,
    uploadProfileImage: uploadProfileImage
};