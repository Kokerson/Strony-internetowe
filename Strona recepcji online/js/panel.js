/*
 Panel zarządzania rezerwacjami — odczyt, edycja i usuwanie z localStorage
 */
document.addEventListener('DOMContentLoaded', function () {
    var tabelaBody = document.getElementById('tabela-rezerwacji-body');
    var brakDanych = document.getElementById('brak-danych');
    var formularzEdycji = document.getElementById('formularz-edycji');
    var edycjaModal = document.getElementById('edycjaModal');
    var modalBootstrap = edycjaModal ? new bootstrap.Modal(edycjaModal) : null;

    function pobierzRezerwacje() {
        return JSON.parse(localStorage.getItem('rezerwacje')) || [];
    }

    function zapiszRezerwacje(rezerwacje) {
        localStorage.setItem('rezerwacje', JSON.stringify(rezerwacje));
    }

    function formatujDate(data) {
        if (!data) {
            return '—';
        }
        return new Date(data).toLocaleDateString('pl-PL');
    }

    function wyswietlRezerwacje() {
        var rezerwacje = pobierzRezerwacje();

        tabelaBody.innerHTML = '';

        if (rezerwacje.length === 0) {
            brakDanych.classList.remove('d-none');
            return;
        }

        brakDanych.classList.add('d-none');

        rezerwacje.forEach(function (rezerwacja) {
            var wiersz = document.createElement('tr');
            wiersz.innerHTML =
                '<td>' + rezerwacja.imie + ' ' + rezerwacja.nazwisko + '</td>' +
                '<td>' +
                    '<div class="small">' + rezerwacja.email + '</div>' +
                    '<div class="small text-muted">' + rezerwacja.telefon + '</div>' +
                '</td>' +
                '<td>' + rezerwacja.domek + '</td>' +
                '<td>' + formatujDate(rezerwacja.dataPrzyjazdu) + ' – ' + formatujDate(rezerwacja.dataWyjazdu) + '</td>' +
                '<td>' + rezerwacja.iloscOsob + '</td>' +
                '<td>' + (rezerwacja.platnosc || '—') + '</td>' +
                '<td>' +
                    '<button type="button" class="btn btn-sm btn-outline-primary me-1 btn-edytuj" data-id="' + rezerwacja.id + '">' +
                        '<i class="bi bi-pencil"></i> Edytuj' +
                    '</button>' +
                    '<button type="button" class="btn btn-sm btn-outline-danger btn-usun" data-id="' + rezerwacja.id + '">' +
                        '<i class="bi bi-trash"></i> Usuń' +
                    '</button>' +
                '</td>';

            tabelaBody.appendChild(wiersz);
        });
    }

    tabelaBody.addEventListener('click', function (e) {
        var przyciskEdytuj = e.target.closest('.btn-edytuj');
        var przyciskUsun = e.target.closest('.btn-usun');

        if (przyciskEdytuj) {
            var idEdycji = parseInt(przyciskEdytuj.dataset.id, 10);
            var rezerwacja = pobierzRezerwacje().find(function (r) {
                return r.id === idEdycji;
            });

            if (rezerwacja) {
                document.getElementById('edycja-id').value = rezerwacja.id;
                document.getElementById('edycja-domek').value = rezerwacja.domek;
                document.getElementById('edycja-od').value = rezerwacja.dataPrzyjazdu;
                document.getElementById('edycja-do').value = rezerwacja.dataWyjazdu;
                modalBootstrap.show();
            }
        }

        if (przyciskUsun) {
            var idUsuniecia = parseInt(przyciskUsun.dataset.id, 10);

            if (confirm('Czy na pewno chcesz usunąć tę rezerwację?')) {
                var poUsunieciu = pobierzRezerwacje().filter(function (r) {
                    return r.id !== idUsuniecia;
                });
                zapiszRezerwacje(poUsunieciu);
                wyswietlRezerwacje();
            }
        }
    });

    formularzEdycji.addEventListener('submit', function (e) {
        e.preventDefault();

        var id = parseInt(document.getElementById('edycja-id').value, 10);
        var dataOd = document.getElementById('edycja-od').value;
        var dataDo = document.getElementById('edycja-do').value;

        if (new Date(dataDo) <= new Date(dataOd)) {
            alert('Data wyjazdu musi być późniejsza niż data przyjazdu.');
            return;
        }

        var rezerwacje = pobierzRezerwacje().map(function (r) {
            if (r.id === id) {
                return {
                    id: r.id,
                    imie: r.imie,
                    nazwisko: r.nazwisko,
                    email: r.email,
                    telefon: r.telefon,
                    domek: document.getElementById('edycja-domek').value,
                    dataPrzyjazdu: dataOd,
                    dataWyjazdu: dataDo,
                    iloscOsob: r.iloscOsob,
                    platnosc: r.platnosc
                };
            }
            return r;
        });

        zapiszRezerwacje(rezerwacje);
        modalBootstrap.hide();
        wyswietlRezerwacje();
    });

    wyswietlRezerwacje();
});
