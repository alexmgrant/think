import express from 'express';
import passport from 'passport';
import passportGithub from 'passport-github';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import dotenv from 'dotenv';

import routes from './routes/index.js';

dotenv.config();
const GitHubStrategy = passportGithub.Strategy;
const {
  HOST,
  PORT,
  GITHUB_CLIENT_ID,
  GITHUB_CLIENT_SECRET,
  GITHUB_REDIRECT,
} = process.env;
console.log(GITHUB_REDIRECT);

passport.use(
  new GitHubStrategy(
    {
      clientID: GITHUB_CLIENT_ID,
      clientSecret: GITHUB_CLIENT_SECRET,
      callbackURL: `${HOST}:${PORT}${GITHUB_REDIRECT}`,
    },
    (accessToken, refreshToken, profile, cb) =>
      User.findOrCreate({ githubId: profile.id }, (err, user) => cb(err, ser))
  )
);

passport.serializeUser(function (user, cb) {
  cb(null, user);
});

passport.deserializeUser(function (obj, cb) {
  cb(null, obj);
});

const app = express();

app.use(morgan('dev'));
// app.use(cookieParser());
// app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(routes);
app.use(passport.initialize());
app.use(passport.session());

app.use((req, res) => res.status(404).send('Not found'));

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send(err.message);
});

export default app;
