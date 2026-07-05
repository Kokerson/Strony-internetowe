/*
 Asynchroniczne ładowanie opinii gości z pliku JSON (Fetch API)
 */
document.addEventListener('DOMContentLoaded', function () {
    var kontener = document.getElementById('opinie-kontener');
    var loader = document.getElementById('loader-opinie');

    if (!kontener) {
        return;
    }

    fetch('dane/opinie.json')
        .then(function (odpowiedz) {
            if (!odpowiedz.ok) {
                throw new Error('Błąd pobierania opinii');
            }
            return odpowiedz.json();
        })
        .then(function (opinie) {
            loader.classList.add('d-none');
            kontener.innerHTML = '';
// gwiazdki
            opinie.forEach(function (opinia) {
                var gwiazdki = '';
                for (var i = 0; i < 5; i++) {
                    gwiazdki += i < opinia.ocena
                        ? '<i class="bi bi-star-fill text-warning"></i> '
                        : '<i class="bi bi-star text-warning"></i> ';
                }

                var karta = document.createElement('div');
                karta.className = 'col-md-4 mb-4';
                karta.innerHTML =
                    '<div class="card h-100 border-0 shadow-sm">' +
                        '<div class="card-body p-4">' +
                            '<div class="mb-2">' + gwiazdki + '</div>' +
                            '<p class="card-text fst-italic">"' + opinia.tresc + '"</p>' +
                            '<footer class="blockquote-footer mt-3">' + opinia.autor + ', ' + opinia.domek + '</footer>' +
                        '</div>' +
                    '</div>';

                kontener.appendChild(karta);
            });
        })
        .catch(function () {
            loader.classList.add('d-none');
            kontener.innerHTML = '<div class="col-12"><p class="text-muted text-center">Nie udało się załadować opinii gości.</p></div>';
        });
});
