export const hasPayload = (body) => body !== undefined;
export const isNumber = (body) => typeof body === 'number';
export const isNegativeNumber = (number) =>
  isNumber(number) && Math.sign(number) !== 1 && Math.sign(number) !== 0;

export const handleRes = (status) => (res) => res.status(status);
export const handle400 = handleRes(400);

export const handlePayloadError = (res) => (message) =>
  handle400(res).json(message);
