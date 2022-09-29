const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');

const routes = {
	games: require('./routes/games'),
	genres: require('./routes/genres'),
	medals: require('./routes/medals'),
	platforms_games: require('./routes/platforms_games'),
	platforms: require('./routes/platforms'),
	posts: require('./routes/posts'),
	reviews: require('./routes/reviews'),
	tokens: require('./routes/tokens'),
	users: require('./routes/users')
	// Add more routes here...
	// items: require('./routes/items'),
};

// defining the Express app
const app = express();

// adding Helmet to enhance your Rest API's security
app.use(helmet());

// using bodyParser to parse JSON bodies into JS objects
app.use(bodyParser.json());

// enabling CORS for all requests
app.use(cors());

// adding morgan to log HTTP requests
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
app.use(express.json());

// We create a wrapper to workaround async errors not being transmitted correctly.
function makeHandlerAwareOfAsyncErrors(handler) {
	return async function(req, res, next) {
		try {
			await handler(req, res);
		} catch (error) {
			next(error);
		}
	};
}

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
	if (routeController.getBo) {
		app.get(
			`/api/${routeName}/bo`,
			makeHandlerAwareOfAsyncErrors(routeController.getBo)
		);
	}
	// get specific objects which matches
	if (routeController.join) {
		app.get(
			`/api/${routeName}/join`,
			makeHandlerAwareOfAsyncErrors(routeController.join)
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
			`/api/${routeName}`,
			makeHandlerAwareOfAsyncErrors(routeController.update)
		);
	}
	// remove objects which matches
	if (routeController.removeBo) {
		app.delete(
			`/api/${routeName}/bo`,
			makeHandlerAwareOfAsyncErrors(routeController.removeBo)
		);
	}
}

module.exports = app;