import request from "supertest";
import {app} from "../../app"

describe("GET /api/infraction-types", () => {
  it("should return a list of infraction types", async () => {
    const response = await request(app).get("/api/infraction-types");

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body.data)).toBe(true);
    expect(response.body.meta).toBeDefined();
  });

  it("should respect pagination parameters", async () => {
    const response = await request(app)
      .get("/api/infraction-types?page=1&limit=1");
  
    expect(response.status).toBe(200);
    expect(response.body.data.length).toBe(1);
    expect(response.body.meta.limit).toBe(1);
  });

  it("should return data with correct structure", async () => {
    const response = await request(app).get("/api/infraction-types");
  
    const infraction = response.body.data[0];
  
    expect(infraction).toHaveProperty("id");
    expect(infraction).toHaveProperty("code");
    expect(infraction).toHaveProperty("description");
    expect(infraction).toHaveProperty("severity");
    expect(infraction).toHaveProperty("points");
  });

  it("should return 400 if limit is zero", async () => {
    const response = await request(app)
      .get("/api/infraction-types?limit=0");
  
    expect(response.status).toBe(400);
    expect(response.body.message).toBe("Invalid query parameters");
    expect(response.body.errors.limit).toBeDefined();
  });

  it("should return 400 if page is negative", async () => {
    const response = await request(app)
      .get("/api/infraction-types?page=-1");
  
    expect(response.status).toBe(400);
  });
  
});