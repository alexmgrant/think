import {
  hasPayload,
  isNumber,
  isNegativeNumber,
  handlePayloadError,
} from '../lib/utils.js';
import * as Idenifier from '../models/identifier.model.js';

export const path = '/identifier';
export const bodyErrorMessage = 'Expected body of type {intiger: number}';
const { getNextIdentifier, getIdentifier, updateIdentifier } = Idenifier;

export const readNext = async (req, res) => {
  const nextInteger = getNextIdentifier();

  res.status(200).json(nextInteger);
};

export const read = (req, res) => {
  const identifier = getIdentifier();

  res.status(200).json(identifier);
};

export const update = (req, res) => {
  const { intiger } = req.body;

  if (!hasPayload(intiger) || !isNumber(intiger) || isNegativeNumber(intiger)) {
    return handlePayloadError(res)(bodyErrorMessage);
  }

  updateIdentifier(intiger);

  res.json(intiger);
};
