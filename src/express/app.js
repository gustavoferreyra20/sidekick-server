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

app.use('/sidekick/images', imagesRouter);
app.use('/sidekick/auth', authRouter);
app.use('/sidekick/contact_inf', contact_infRouter);
app.use('/sidekick/games', auth, gamesRouter);
app.use('/sidekick/modes', auth, modesRouter);
app.use('/sidekick/platforms', auth, platformsRouter);
app.use('/sidekick/posts', auth, postsRouter);
app.use('/sidekick/rewards', auth, rewardsRouter);
app.use('/sidekick/reviews', auth, reviewsRouter);
app.use('/sidekick/payments', paymentsRouter);
app.use('/sidekick/notifications', auth, notificationsRouter);
app.use('/sidekick/users', usersRouter);

module.exports = app;