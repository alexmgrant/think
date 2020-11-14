import express from 'express';
import passport from 'passport';
import dotenv from 'dotenv';

import * as identifier from './routes.identifier.js';

dotenv.config();
const router = express.Router();
const {
  path: identPath,
  readNext: identReadNext,
  read: identRead,
  update: identUpdate,
} = identifier;

router.all(
  '/identifier/*',
  (req, res, next) => (req.isAuthenticated() ? next('route') : next()),
  passport.authenticate('bearer'),
  (req, res, next) =>
    req.isAuthenticated() ? next() : res.json('Not Authenticated!')
);

router.get(`${identPath}/next`, identReadNext);
router.get(`${identPath}/current`, identRead);
router.put(`${identPath}/current`, identUpdate);

router.post('/auth/local', passport.authenticate('local'), (req, res) => {
  const accessToken = req.user;

  res.json(accessToken);
});

router.get('/auth/github', passport.authenticate('github'), (req, res) => {
  const { accessToken } = req.user;

  res.json(accessToken);
});

router.get('/login', (req, res) => {
  res.send("<a href='/auth/github'>Sign in With GitHub</a>");
});

router.get(
  `/${process.env.GITHUB_REDIRECT}`,
  passport.authenticate('github'),
  (req, res) => {
    const { name, accessToken } = req.user;

    res.json(`Hey 👋 ${name} ${accessToken}`);
    res.redirect('https://think-client.herokuapp.com/');
  }
);

export default router;
