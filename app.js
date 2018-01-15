const express = require('express');
const logger = require('morgan');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const methodOverride = require('method-override');
const cookieParser = require('cookie-parser');
var cookieSession = require('cookie-session');
const session = require('express-session');
const passport = require('passport');
const flash = require('connect-flash');

const app = express();

app.use(cors());

require('dotenv').config();

app.use(cors());
app.use(logger('dev'));
app.use(express.static('client/build'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(cookieParser());
app.use(
  cookieSession({
    name: 'session',
    keys: [process.env.SECRET_KEY],
    maxAge: 24 * 60 * 60 * 1000
  }),
);
app.use(flash());
/* app.use(
  session({
    key: process.env.SECRET_KEY,
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: true,
  }),
); */
app.use(passport.initialize());
app.use(passport.session());

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`listening on port ${PORT}!`));

// app.get('/', (req, res) => {
//     res.send('hello world')
// });

const eventRoutes = require('./routes/event-routes');
app.use('/event', eventRoutes);

const profileRoutes = require('./routes/profile-routes');
app.use('/profile', profileRoutes);

const resultsRoutes = require('./routes/results-routes');
app.use('/results', resultsRoutes);

const authRoutes = require('./routes/auth-routes');
app.use('/auth', authRoutes);

app.get('/favicon.ico', (req, res) => res.status(204));

app.get('*', (req, res) => res.send('404error'));
