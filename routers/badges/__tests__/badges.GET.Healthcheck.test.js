/* Dependencies */
import request from "supertest";

/* Tests */
describe("GET /badges/healthcheck", () => {
  const server = global.__SERVER__;

  it('sending no url', async () => {
    const response = await request(server)
    .get(`/badges/healthcheck`)

    expect(response.statusCode).toBe(500);
  })

  it('sending invalid url', async () => {
    const response = await request(server)
    .get(`/badges/healthcheck`)
    .query({ 
      url: 'invalid_url'
    })

    expect(response.statusCode).toBe(500);
  })

  it('sending offline url', async () => {
    const response = await request(server)
    .get(`/badges/healthcheck`)
    .query({ 
      url: 'https://srigjhrsw9ghrsiughrsighb.com'
    })

    expect(response.statusCode).toBe(200);
  })

  it('sending valid url', async () => {
    const response = await request(server)
    .get(`/badges/healthcheck`)
    .query({ 
      url: 'https://google.com'
    })

    expect(response.statusCode).toBe(200);
  })

  it('sending valid url with custom_key', async () => {
    const response = await request(server)
    .get(`/badges/healthcheck`)
    .query({ 
      url: 'https://google.com', 
      custom_key: 'custom-key'
    })

    expect(response.statusCode).toBe(200);
  })
});