import { server } from '../../../@jest/setup';

describe('GET /ping', () => {
  test('returns ok', async () => {
    const res = await server.inject({
      method: 'GET',
      url: '/ping'
    });

    expect(res.statusCode).toBe(200);
    expect(JSON.parse(res.payload)).toEqual({ status: 'ok' });
  });
});
