const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
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
const usersRouter = require('./routers/usersRouter');
const imagesRouter = require('./routers/imagesRouter');

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

app.use('/api/images', imagesRouter);
app.use('/api/auth', authRouter);
app.use('/api/contact_inf', contact_infRouter);
app.use('/api/games', auth, gamesRouter);
app.use('/api/modes', auth, modesRouter);
app.use('/api/platforms', auth, platformsRouter);
app.use('/api/posts', auth, postsRouter);
app.use('/api/rewards', auth, rewardsRouter);
app.use('/api/reviews', auth, reviewsRouter);
app.use('/api/payments', paymentsRouter);
app.use('/api/notifications', auth, notificationsRouter);
app.use('/api/users', usersRouter);

module.exports = app;