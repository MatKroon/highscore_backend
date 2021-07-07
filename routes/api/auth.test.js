const app = require("../../app");
const request = require("supertest");

describe("POST /api/auth", () => {
  describe("when sending valid credentials", () => {
    test("should return status code 200 OK", async () => {
      const credentials = {
        username: "mattias",
        password: "123",
      };

      const response = await request(app).post("/api/auth").send(credentials);

      expect(response.statusCode).toBe(200);
    });

    test("should return JWT token", async () => {
      const credentials = {
        username: "mattias",
        password: "123",
      };

      const response = await request(app).post("/api/auth").send(credentials);

      expect(response.body).toHaveProperty("token");
    });
  });

  describe("when sending invalid credentials", () => {
    test("should return status code 401 Unauthorized", async () => {
      const credentials = {
        username: "ufhurhfy",
        password: "frfrf",
      };

      const response = await request(app).post("/api/auth").send(credentials);

      expect(response.statusCode).toBe(401);
    });
  });
});
