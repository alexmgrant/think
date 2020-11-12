export const IDENTIFIER_KEY = 'integer';
const IDENTIFIER = new Map();

export const getNextIdentifier = () => {
  let integer = getIdentifier();

  integer = ++integer;
  updateIdentifier(integer);

  return Number(integer);
};

export const getIdentifier = () => {
  const identifier = IDENTIFIER.get(IDENTIFIER_KEY) ?? 0;

  return identifier;
};

export const updateIdentifier = (integer) => {
  IDENTIFIER.set(IDENTIFIER_KEY, integer);
};

export const clearIdentifier = () => {
  IDENTIFIER.clear();
  IDENTIFIER.set(IDENTIFIER_KEY, 0);
};
