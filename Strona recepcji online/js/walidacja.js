/*
 Walidacja formularza rezerwacji 
 Zapis danych w localStorage w formacie JSON
 */
$(document).ready(function () {
    var formularz = $('#formularz-rezerwacji');

    if (formularz.length === 0) {
        return;
    }

    formularz.on('submit', function (e) {
        e.preventDefault();

        var formJestPoprawny = true;

        formularz.find('.form-control, .form-select, .form-check-input').removeClass('is-invalid');
        $('#blad-platnosc').addClass('d-none');

        formularz.find('input, select').each(function () {
            if (!this.checkValidity()) {
                $(this).addClass('is-invalid');
                formJestPoprawny = false;
            }
        });

        if ($('input[name="platnosc"]:checked').length === 0) {
            $('#blad-platnosc').removeClass('d-none');
            formJestPoprawny = false;
        }

        var dataPrzyjazdu = $('#data-przyjazdu').val();
        var dataWyjazdu = $('#data-wyjazdu').val();

        if (dataPrzyjazdu && dataWyjazdu) {
            var dataStart = new Date(dataPrzyjazdu);
            var dataKoniec = new Date(dataWyjazdu);

            if (dataKoniec <= dataStart) {
                $('#data-wyjazdu').addClass('is-invalid');
                $('#blad-daty-wyjazdu').text('Błąd! Data wyjazdu musi być późniejsza niż data przyjazdu.');
                formJestPoprawny = false;
            }
        }

        if (!formJestPoprawny) {
            return;
        }

        var nowaRezerwacja = {
            id: Date.now(),
            imie: $('#imie').val().trim(),
            nazwisko: $('#nazwisko').val().trim(),
            email: $('#email').val().trim(),
            telefon: $('#telefon').val().trim(),
            domek: $('#domek').val(),
            dataPrzyjazdu: dataPrzyjazdu,
            dataWyjazdu: dataWyjazdu,
            iloscOsob: parseInt($('#ilosc-osob').val(), 10),
            platnosc: $('input[name="platnosc"]:checked').val()
        };

        var zapisaneRezerwacje = JSON.parse(localStorage.getItem('rezerwacje')) || [];
        zapisaneRezerwacje.push(nowaRezerwacja);
        localStorage.setItem('rezerwacje', JSON.stringify(zapisaneRezerwacje));

        $('#sukces-komunikat').removeClass('d-none');
        formularz[0].reset();

        setTimeout(function () {
            $('#sukces-komunikat').addClass('d-none');
        }, 5000);
    });
});
