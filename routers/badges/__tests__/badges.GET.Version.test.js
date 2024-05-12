/* Dependencies */
import request from "supertest";

/* Tests */
describe("GET /badges/version", () => {
  const server = global.__SERVER__;

  it('sending no project', async () => {
    const response = await request(server)
    .get(`/badges/version`)

    expect(response.statusCode).toBe(500);
  })

  it('sending invalid project', async () => {
    const response = await request(server)
    .get(`/badges/version`)
    .query({ 
      project: 'non-existent-project'
    })

    expect(response.statusCode).toBe(500);
  })

  it('sending valid project', async () => {
    const response = await request(server)
    .get(`/badges/version`)
    .query({ 
      project: 'jest-demo-project'
    })

    expect(response.statusCode).toBe(200);
  })

  it('sending valid project with custom_key', async () => {
    const response = await request(server)
    .get(`/badges/version`)
    .query({ 
      project: 'jest-demo-project',
      custom_key: 'custom-key'
    })

    expect(response.statusCode).toBe(200);
  })
});