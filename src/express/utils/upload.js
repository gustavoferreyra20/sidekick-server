const multer = require('multer');
const path = require('path');
const fs = require('fs');

const destinationDirectory = path.join(__dirname, '/tmp/img/profiles');

// Create the destination directory if it doesn't exist
if (!fs.existsSync(destinationDirectory)) {
    fs.mkdirSync(destinationDirectory, { recursive: true });
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