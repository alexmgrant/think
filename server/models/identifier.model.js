export const IDENTIFIER_KEY = 'intiger';
const IDENTIFIER = new Map();

export const getNextIdentifier = () => {
  let intiger = getIdentifier() ?? 0;

  intiger = ++intiger;
  updateIdentifier(intiger);

  return Number(intiger);
};

export const getIdentifier = () => {
  const identifier = IDENTIFIER.get(IDENTIFIER_KEY);

  return identifier;
};

export const updateIdentifier = (integer) => {
  IDENTIFIER.set(IDENTIFIER_KEY, integer);
};

export const clearIdentifier = () => {
  IDENTIFIER.clear();
  IDENTIFIER.set(IDENTIFIER_KEY, 0);
};
