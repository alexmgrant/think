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

router.get(`${identPath}/next`, identReadNext);
router.get(`${identPath}/current`, identRead);
router.put(`${identPath}/current`, identUpdate);

router.get('/auth/github', passport.authenticate('github'));
router.get(
  process.env.GITHUB_REDIRECT,
  passport.authenticate('github', { failureRedirect: '/login' }),
  (req, res) => {
    res.redirect('/');
  }
);

export default router;
