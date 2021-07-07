// Hämta samtliga spel (GET /api/games)
// Returnerar 200 OK samt lista med spel (tom lista om det inte finns några)
// Söka efter spel (GET /api/games?title={title})
// Returnerar 200 OK samt lista med spel (tom lista om det inte finns några)
// Lägga till nytt spel (POST /api/games)
// Returnerar 201 Created om det gick att skapa spelet, samt Location headern är satt att peka på nya resursen.
// Returnerar 400 Bad Request om någon information saknas eller är felaktig, t.ex. spelets titel saknas.
// Uppdatera spel (PUT eller PATCH /api/games/{urlslug})
// Returnerar 204 No Content om det gick att uppdatera/ersätta.
// Returnerar 404 Not Found om spelet inte fanns.
// Radera spel (DELETE /api/games/{urlslug})
// Returnerar 204 No Content (oavsett om det resurs raderas eller inte (dvs. den fanns inte).
