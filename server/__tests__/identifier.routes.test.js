import request from 'supertest';

import app from '../app.js';

import {
  path as ROOT_PATH,
  bodyErrorMessage,
} from '../routes/routes.identifier';
import { clearIdentifier } from '../models/identifier.model.js';

const putCurrentResp = async (payload) =>
  await request(app).put(`${ROOT_PATH}/current`).send(payload).expect(400);

describe('/identifier routes', () => {
  beforeEach(() => clearIdentifier());
  it('PUT /current updates current Identifier', async () => {
    const result = 21;
    const response = await request(app)
      .put(`${ROOT_PATH}/current`)
      .send({ intiger: result })
      .expect(200);
    const { body } = response;

    expect(body).toBe(result);
  });

  describe('invalid body type', () => {
    test.each([
      [{ intiger: '0' }, bodyErrorMessage],
      [{ intiger: -1 }, bodyErrorMessage],
      [{ intiger: -12.33 }, bodyErrorMessage],
      [undefined, bodyErrorMessage],
    ])('update(%s) - %s', async (payload, result) => {
      const response = await putCurrentResp(payload);
      const { body } = response;

      expect(body).toBe(result);
    });
  });

  it('GET /next returns next Indentifier', async () => {
    const response = await request(app).get(`${ROOT_PATH}/next`).expect(200);
    const { body } = response;

    expect(body).toBe(1);
  });

  test('GET /current returns current identifier', async () => {
    const response = await request(app).get(`${ROOT_PATH}/current`).expect(200);
    const { body } = response;

    expect(body).toBe(0);
  });
});
