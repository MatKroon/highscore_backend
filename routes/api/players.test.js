// Hämta samtliga spelare (GET /api/player)
// Returnerar 200 OK samt lista med spelare (tom lista om det inte finns några)
// Lägga till ny spelare (POST /api/player)
// Returnerar 201 Created om det gick att skapa spelare, samt Location headern är satt att peka på nya resursen.
// Returnerar 400 Bad Request om någon information saknas eller är felaktig, t.ex. email saknas.
// Uppdatera spelare (PUT eller PATCH /api/player/{id})
// Returnerar 204 No Content om det gick att uppdatera/ersätta.
// Returnerar 404 Not Found om spelare inte fanns.
// Radera spelare (DELETE /api/player/{id})
// Returnerar 204 No Content (oavsett om det resurs raderas eller inte (dvs. den fanns inte).

describe("GET /api/players", () => {
  describe("when retriving all players", () => {
    test("should return status code 200 OK", async () => {
      const token = generateJwtToken();

      const response = await request(app)
        .post("/api/players")
        .set("Authorization", "Bearer " + token)
        .send();

      expect(response.statusCode).toBe(200);
    });

    test("should return an array", async () => {
      const token = generateJwtToken();

      const response = await request(app)
        .post("/api/players")
        .set("Authorization", "Bearer " + token)
        .send();

      expect(Array.isArray(response.body)).toBe(true);
    });
  });
});

describe("POST /api/players", () => {
  describe("when retriving all players", () => {
    test("should return status code 200 OK", async () => {
      const token = generateJwtToken();

      const response = await request(app)
        .post("/api/players")
        .set("Authorization", "Bearer " + token)
        .send();

      expect(response.statusCode).toBe(200);
    });

    test("should return an array", async () => {
      const token = generateJwtToken();

      const response = await request(app)
        .post("/api/players")
        .set("Authorization", "Bearer " + token)
        .send();

      expect(Array.isArray(response.body)).toBe(true);
    });
  });
});

async function generateJwtToken() {
  const credentials = {
    username: "mattias",
    password: "123",
  };

  const response = await request(app).post("/api/auth").send(credentials);

  return response;
}

//when retriving all players
// should return status code 200 OK
// Should return an array
// Should return players with objects etc.. a
//when retriving one players (skip not part of exercse)
//when adding a player
//When
