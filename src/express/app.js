const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
var multer = require('multer');

const routes = {
	games: require('./routes/games'),
	rewards: require('./routes/rewards'),
	platforms: require('./routes/platforms'),
	posts: require('./routes/posts'),
	reviews: require('./routes/reviews'),
	tokens: require('./routes/tokens'),
	users: require('./routes/users'),
	modes: require('./routes/modes'),
	contact_inf: require('./routes/contact_inf')
	// Add more routes here...
	// items: require('./routes/items'),
};

// defining the Express app
const app = express();

// adding Helmet to enhance your Rest API's security
app.use(helmet());

// using bodyParser to parse JSON bodies into JS objects
app.use(bodyParser.json());

// permite aceptar solicitudes de cualquier origen
app.use(cors());

// adding morgan to log HTTP requests
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// We create a wrapper to workaround async errors not being transmitted correctly.
function makeHandlerAwareOfAsyncErrors(handler) {
	return async function (req, res, next) {
		try {
			await handler(req, res);
		} catch (error) {
			next(error);
		}
	};
}

var storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, './src/express/img/profiles')      //you tell where to upload the files,
	},
	filename: function (req, file, cb) {
		cb(null, file.fieldname + '-' + Date.now() + '.png')
	}
})

var upload = multer({ storage: storage });

app.post(`/api/imageupload`, upload.single('file'), function (req, res) {
	//req.file will now be available as a json object, save to mongodb, re: filename, path etc
	res.send(req.file)
})

app.get("/api/images/*", (req, res) => {
	const filepath = req.params[0];
	const imagePath = __dirname + '/img/' + filepath;
	res.sendFile(imagePath);
});

// We define the standard REST APIs for each route (if they exist).
for (const [routeName, routeController] of Object.entries(routes)) {
	// get all elements
	if (routeController.getAll) {
		app.get(
			`/api/${routeName}`,
			makeHandlerAwareOfAsyncErrors(routeController.getAll)
		);
	}
	// get specific objects which matches
	if (routeController.getSingle) {
		app.get(
			`/api/${routeName}/:id`,
			makeHandlerAwareOfAsyncErrors(routeController.getSingle)
		);
	}
	// create an object
	if (routeController.create) {
		app.post(
			`/api/${routeName}`,
			makeHandlerAwareOfAsyncErrors(routeController.create)
		);
	}
	// updates objects which matches
	// recive value and condition as json strings
	if (routeController.update) {
		app.put(
			`/api/${routeName}/:id`,
			makeHandlerAwareOfAsyncErrors(routeController.update)
		);
	}
	// remove objects which matches
	if (routeController.removeSingle) {
		app.delete(
			`/api/${routeName}/:id`,
			makeHandlerAwareOfAsyncErrors(routeController.removeSingle)
		);
	}

	// get specific objects which matches through intermediate table
	if (routeController.join) {
		app.get(
			`/api/${routeName}/:id/:associationName`,
			makeHandlerAwareOfAsyncErrors(routeController.join)
		);
	}
	// remove objects which matches through intermediate table
	if (routeController.joinDelete) {
		app.delete(
			`/api/${routeName}/:id/:associationName/:associationId`,
			makeHandlerAwareOfAsyncErrors(routeController.joinDelete)
		);
	}
	// update objects which matches through intermediate table
	if (routeController.joinUpdate) {
		app.put(
			`/api/${routeName}/:id/:associationName/:associationId`,
			makeHandlerAwareOfAsyncErrors(routeController.joinUpdate)
		);
	}
	// create objects through intermediate table
	if (routeController.joinPost) {
		app.post(
			`/api/${routeName}/:id/:associationName/:associationId`,
			makeHandlerAwareOfAsyncErrors(routeController.joinPost)
		);
	}

	if (routeController.login) {
		app.post(`/api/${routeName}/login`, makeHandlerAwareOfAsyncErrors(routeController.login));
	}

}

module.exports = app;