import express from 'express';
import passport from 'passport';
import passportLocal from 'passport-local';
import passportGithub from 'passport-github';
import passportHttpBearer from 'passport-http-bearer';
import session from 'express-session';
import morgan from 'morgan';
import dotenv from 'dotenv';

import routes from './routes/index.js';

dotenv.config();
const LocalStrategy = passportLocal.Strategy;
const GitHubStrategy = passportGithub.Strategy;
const PassportBearerStrategy = passportHttpBearer.Strategy;
const {
  HOST,
  GITHUB_CLIENT_ID,
  GITHUB_CLIENT_SECRET,
  GITHUB_REDIRECT,
} = process.env;
let accessToken;

passport.use(
  new LocalStrategy(
    { usernameField: 'email', passwordField: 'password' },
    (username, password, cb) => {
      accessToken = Math.random();

      cb(null, accessToken);
    }
  )
);

passport.use(
  new PassportBearerStrategy((token, cb) => {
    accessToken == token ? cb(null, token) : cb('Not Authenticated');
  })
);

passport.use(
  new GitHubStrategy(
    {
      clientID: GITHUB_CLIENT_ID,
      clientSecret: GITHUB_CLIENT_SECRET,
      callbackURL: `${HOST}${GITHUB_REDIRECT}`,
    },
    (_accessToken, refreshToken, profile, cb) => {
      const {
        _json: { name },
      } = profile;
      accessToken = _accessToken;

      return cb(null, { name, accessToken });
    }
  )
);

passport.serializeUser((auth, cb) => {
  cb(null, auth);
});

passport.deserializeUser((auth, cb) => {
  cb(null, auth);
});

const app = express();

app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
  session({
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: true,
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(routes);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send(err.message);
});

export default app;
