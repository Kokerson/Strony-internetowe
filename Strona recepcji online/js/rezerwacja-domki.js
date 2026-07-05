/*
 Dynamiczne wypełnianie listy domków w formularzu rezerwacji (Fetch API)
 */
document.addEventListener('DOMContentLoaded', function () {
    var select = document.getElementById('domek');

    if (!select) {
        return;
    }

    fetch('dane/domki.json')
        .then(function (odpowiedz) {
            return odpowiedz.json();
        })
        .then(function (domki) {
            select.innerHTML = '<option value="" selected disabled>Wybierz z listy...</option>';

            domki.forEach(function (domek) {
                var opcja = document.createElement('option');
                opcja.value = domek.nazwa;
                opcja.textContent = domek.nazwa + ' (' + domek.pojemnosc + '-osobowy, od ' + domek.cena + ' zł/noc)';
                select.appendChild(opcja);
            });
        })
        .catch(function () {
            select.innerHTML =
                '<option value="" selected disabled>Błąd ładowania listy domków</option>' +
                '<option value="Szept Lasu">Szept Lasu (2-osobowy)</option>' +
                '<option value="Mleczna Droga">Mleczna Droga (4-osobowy)</option>' +
                '<option value="Leśna Przystań">Leśna Przystań (6-osobowy)</option>';
        });
});
