import supertest from 'supertest';

import app from '../app.js';

import {
  path as ROOT_PATH,
  bodyErrorMessage,
} from '../routes/routes.identifier';
import { clearIdentifier } from '../models/identifier.model.js';

const hook = (accesssToken) => (method = 'get') => (args) => (
  payload
) => async (status = 200) =>
  await supertest(app)
    [method](args)
    .send(payload)
    .set('Authorization', `Bearer ${accesssToken}`)
    .expect(status);

let request;

describe('/identifier routes', () => {
  beforeAll(async () => {
    const response = await supertest(app)
      .post('/auth/local')
      .send({ email: 'email', password: 'password' })
      .expect(200);
    const { body: accessToken } = response;

    const authRequest = hook(accessToken);

    request = {
      putCurrent: authRequest('put')(`${ROOT_PATH}/current`),
      getCurrent: authRequest('get')(`${ROOT_PATH}/current`)(),
      getNext: authRequest('get')(`${ROOT_PATH}/next`)(),
    };
  });

  beforeEach(() => clearIdentifier());

  it('POST /auth/local get accessToken', async () => {});

  it('PUT /current updates current Identifier', async () => {
    const result = 21;
    const response = await request.putCurrent({ integer: result })();
    const { body } = response;

    expect(body).toBe(result);
  });

  describe('PUT /current invalid body type', () => {
    test.each([
      [{ integer: '0' }, bodyErrorMessage],
      [{ integer: -1 }, bodyErrorMessage],
      [{ integer: -12.33 }, bodyErrorMessage],
      [undefined, bodyErrorMessage],
    ])('update(%s) - %s', async (payload, result) => {
      const response = await request.putCurrent(payload)(400);
      const { body } = response;

      expect(body).toBe(result);
    });
  });

  it('GET /next returns next Indentifier', async () => {
    const response = await request.getNext();
    const { body } = response;

    expect(body).toBe(1);
  });

  test('GET /current returns current identifier', async () => {
    const response = await request.getCurrent();
    const { body } = response;

    expect(body).toBe(0);
  });
});
