/*
 Asynchroniczne ładowanie cennika z pliku JSON (Fetch API)
 Reszta strony oferty pozostaje statyczna w HTML.
 */
document.addEventListener('DOMContentLoaded', function () {
    var kontener = document.getElementById('cennik-kontener');
    var loader = document.getElementById('loader-cennik');
    var blad = document.getElementById('blad-cennik');

    if (!kontener) {
        return;
    }

    fetch('dane/domki.json')
        .then(function (odpowiedz) {
            if (!odpowiedz.ok) {
                throw new Error('Nie udało się pobrać cennika.');
            }
            return odpowiedz.json();
        })
        .then(function (domki) {
            loader.classList.add('d-none');

            domki.forEach(function (domek) {
                var kolumna = document.createElement('div');
                kolumna.className = 'col';
                kolumna.innerHTML =
                    '<div class="card h-100 text-center border-0 shadow-sm">' +
                        '<div class="card-body p-4">' +
                            '<h3 class="h5 card-title">' + domek.nazwa + '</h3>' +
                            '<p class="display-6 fw-bold cena-kolor mb-1">' + domek.cena + ' zł</p>' +
                            '<p class="text-muted small mb-3">za noc · do ' + domek.pojemnosc + ' osób</p>' +
                            '<a href="rezerwacja.html" class="btn btn-primary btn-sm">Rezerwuj</a>' +
                        '</div>' +
                    '</div>';
                kontener.appendChild(kolumna);
            });
        })
        .catch(function (error) {
            loader.classList.add('d-none');
            blad.textContent = 'Błąd ładowania cennika: ' + error.message;
            blad.classList.remove('d-none');
        });
});
