const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
var multer = require('multer');

const routes = {
	games: require('./routes/games'),
	genres: require('./routes/genres'),
	rewards: require('./routes/rewards'),
	platforms: require('./routes/platforms'),
	posts: require('./routes/posts'),
	reviews: require('./routes/reviews'),
	tokens: require('./routes/tokens'),
	users: require('./routes/users'),
	modes: require('./routes/modes'),
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

var storage = multer.diskStorage({
	destination: function (req, file, cb) {
	  cb(null, './uploads')      //you tell where to upload the files,
	},
	filename: function (req, file, cb) {
	  cb(null, file.fieldname + '-' + Date.now() + '.png')
	}
  })

var upload = multer({storage: storage});

app.post(`/api/imageupload`,upload.single('file'),function(req,res){
    //req.file will now be available as a json object, save to mongodb, re: filename, path etc
	console.log(req.file)
    res.send(req.file)
})

app.get(
	`/api/reviews/avg`,
	makeHandlerAwareOfAsyncErrors(routes.reviews.getAvg)
);

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

	// get specific objects which matches through intermediate table
	if (routeController.join) {
		app.get(
			`/api/${routeName}/join`,
			makeHandlerAwareOfAsyncErrors(routeController.join)
		);
	}
	// remove objects which matches through intermediate table
	if (routeController.joinDelete) {
		app.delete(
			`/api/${routeName}/join`,
			makeHandlerAwareOfAsyncErrors(routeController.joinDelete)
		);
	}
	// update objects which matches through intermediate table
	if (routeController.joinUpdate) {
		app.put(
			`/api/${routeName}/join`,
			makeHandlerAwareOfAsyncErrors(routeController.joinUpdate)
		);
	}
}

module.exports = app;