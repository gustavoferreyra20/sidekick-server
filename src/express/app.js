const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
var multer = require('multer');
const { handleAsyncErrors } = require('./middleware/errorHandler');
const { auth } = require('./middleware/auth');

// Routes
const authRouter = require('./routers/authRouter');
const contact_infRouter = require('./routers/contact_infRouter');
const gamesRouter = require('./routers/gamesRouter');
const modesRouter = require('./routers/modesRouter');
const platformsRouter = require('./routers/platformsRouter');
const postsRouter = require('./routers/postsRouter');
const rewardsRouter = require('./routers/rewardsRouter');
const reviewsRouter = require('./routers/reviewsRouters');
const paymentsRouter = require('./routers/paymentsRouter');
const notificationsRouter = require('./routers/notificationsRouter');

const routes = {
	users: require('./routes/users'),
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

app.use('/api/auth', authRouter);
app.use('/api/contact_inf', auth, contact_infRouter);
app.use('/api/games', auth, gamesRouter);
app.use('/api/modes', auth, modesRouter);
app.use('/api/platforms', auth, platformsRouter);
app.use('/api/posts', auth, postsRouter);
app.use('/api/rewards', auth, rewardsRouter);
app.use('/api/reviews', auth, reviewsRouter);
app.use('/api/payments', auth, paymentsRouter);
app.use('/api/notifications', auth, notificationsRouter);

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