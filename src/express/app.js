const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
var multer = require('multer');
const { handleAsyncErrors } = require('./middleware/errorHandler');
const { auth } = require('./middleware/auth');

const routes = {
	auth: require('./routes/auth'),
	games: require('./routes/games'),
	rewards: require('./routes/rewards'),
	platforms: require('./routes/platforms'),
	posts: require('./routes/posts'),
	reviews: require('./routes/reviews'),
	users: require('./routes/users'),
	modes: require('./routes/modes'),
	contact_inf: require('./routes/contact_inf'),
	payment: require('./routes/payment'),
	notifications: require('./routes/notifications')
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

var storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, './src/express/img/profiles')      //you tell where to upload the files,
	},
	filename: function (req, file, cb) {
		cb(null, file.fieldname + '-' + Date.now() + '.png')
	}
})

var upload = multer({ storage: storage });

app.post(`/api/imageupload`, upload.single('file'), async function (req, res) {
	const userId = req.body.userId;
	const userData = {
		img: `profiles/${req.file.filename}`
	};

	try {
		await routes.users.update({ params: { id: userId }, body: userData }, res);
	} catch (error) {
		console.error(error);
		res.status(500).send("Error updating user");
	}
});

app.get("/api/images/*", (req, res) => {
	const filepath = req.params[0];
	const imagePath = __dirname + '/img/' + filepath;
	res.sendFile(imagePath);
});

app.get(
	`/api/contact_inf`,
	handleAsyncErrors(routes.contact_inf.getAll)
);

app.post(
	`/api/auth/validate`,
	handleAsyncErrors(routes.auth.validate)
);

app.post(
	`/api/auth/login`,
	handleAsyncErrors(routes.auth.login)
);

app.post(
	`/api/auth/register`,
	handleAsyncErrors(routes.auth.register)
);

app.post(
	`/api/auth/:id/contact_inf/:associationId`,
	handleAsyncErrors(routes.auth.addContactInf)
);

// We define the standard REST APIs for each route (if they exist).
for (const [routeName, routeController] of Object.entries(routes)) {
	// get all elements
	if (routeController.getAll) {
		app.get(
			`/api/${routeName}`, auth,
			handleAsyncErrors(routeController.getAll)
		);
	}
	// get specific objects which matches
	if (routeController.getSingle) {
		app.get(
			`/api/${routeName}/:id`, auth,
			handleAsyncErrors(routeController.getSingle)
		);
	}
	// create an object
	if (routeController.create) {
		app.post(
			`/api/${routeName}`, auth,
			handleAsyncErrors(routeController.create)
		);
	}
	// updates objects which matches
	// recive value and condition as json strings
	if (routeController.update) {
		app.put(
			`/api/${routeName}/:id`, auth,
			handleAsyncErrors(routeController.update)
		);
	}
	// remove objects which matches
	if (routeController.removeSingle) {
		app.delete(
			`/api/${routeName}/:id`, auth,
			handleAsyncErrors(routeController.removeSingle)
		);
	}

	// get specific objects which matches through intermediate table
	if (routeController.join) {
		app.get(
			`/api/${routeName}/:id/:associationName`, auth,
			handleAsyncErrors(routeController.join)
		);
	}
	// remove objects which matches through intermediate table
	if (routeController.joinDelete) {
		app.delete(
			`/api/${routeName}/:id/:associationName/:associationId?`, auth,
			handleAsyncErrors(routeController.joinDelete)
		);
	}
	// update objects which matches through intermediate table
	if (routeController.joinUpdate) {
		app.put(
			`/api/${routeName}/:id/:associationName/:associationId?`, auth,
			handleAsyncErrors(routeController.joinUpdate)
		);
	}
	// create objects through intermediate table
	if (routeController.joinPost) {
		app.post(
			`/api/${routeName}/:id/:associationName/:associationId?`, auth,
			handleAsyncErrors(routeController.joinPost)
		);
	}

}

module.exports = app;