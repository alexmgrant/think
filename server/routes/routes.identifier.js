import {
  hasPayload,
  isNumber,
  isNegativeNumber,
  handlePayloadError,
} from '../lib/utils.js';
import * as Idenifier from '../models/identifier.model.js';

export const path = '/identifier';
export const bodyErrorMessage = 'Expected body of type {integer: number}';
const { getNextIdentifier, getIdentifier, updateIdentifier } = Idenifier;

export const readNext = (req, res) => {
  const nextInteger = getNextIdentifier();

  res.status(200).json(nextInteger);
};

export const read = (req, res) => {
  const identifier = getIdentifier();

  res.status(200).json(identifier);
};

export const update = (req, res) => {
  const { integer } = req.body;

  if (!hasPayload(integer) || !isNumber(integer) || isNegativeNumber(integer)) {
    return handlePayloadError(res)(bodyErrorMessage);
  }

  updateIdentifier(integer);

  res.json(integer);
};
