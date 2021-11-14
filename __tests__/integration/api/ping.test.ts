import { server } from '../../../@jest/setup';

const PATH = '/api/ping'

describe(`GET ${PATH}`, () => {
  test('returns ok', async () => {
    const res = await server.inject({
      method: 'GET',
      url: PATH
    });

    expect(res.statusCode).toBe(200);
    expect(JSON.parse(res.payload)).toEqual({ status: 'ok' });
  });
});
