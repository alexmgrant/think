import express from 'express';
import * as identifier from './routes.identifier.js';

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

export default router;
