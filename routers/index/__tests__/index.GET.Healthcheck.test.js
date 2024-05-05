/* Dependencies */
import request from "supertest";

/* Tests */
describe("GET /", () => {
  const server = global.__SERVER__;

  it('sending healthcheck', async () => {
    const response = await request(server)
      .get(`/healthcheck`)

    expect(response.statusCode).toBe(200);
  });
});