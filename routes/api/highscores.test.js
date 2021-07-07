// Hämta samtliga scores(GET / api / scores)
// Returnerar 200 OK samt lista med score (tom lista om det inte finns några)
// Lägga till ett nytt score (POST /api/scores)
// Returnerar 201 Created samt resursen, om det gick att skapa, samt sätt Location headern att peka på nya resursen.
// Returnerar 400 Bad Request om någon information saknas eller är felaktig, t.ex. spelets titel saknas.
// Radera ett score (DELETE /api/score/{id})
// Returnerar 204 No Content (oavsett om det resurs raderas eller inte (dvs. den fanns inte).
