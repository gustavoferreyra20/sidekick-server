const multer = require('multer');
const path = require('path');
const fs = require('fs');

const destinationDirectory = path.join('/tmp/img/profiles');

// Create the destination directory if it doesn't exist
if (!fs.existsSync(destinationDirectory)) {
    try {
        fs.mkdirSync(destinationDirectory, { recursive: true });
        console.log('Destination directory created');
    } catch (error) {
        console.error('Error creating destination directory:', error);
        // Handle error appropriately
    }
}

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, destinationDirectory);
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + '.png');
    }
});

const upload = multer({ storage: storage });

module.exports = {
    upload: upload,
};