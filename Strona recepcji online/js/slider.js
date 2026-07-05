/*
 Slider zdjęć na stronie głównej (jQuery)
 */
$(document).ready(function () {
    var slides = $('#slideshow img');
    var kropki = $('.kropka');

    if (slides.length === 0) {
        return;
    }

    var currentIndex = 0;
    var slideInterval;
//funkcja pokazania wybranego slajdu
    function showSlide(index) {
        slides.removeClass('active');
        slides.eq(index).addClass('active');
        kropki.removeClass('active');
        kropki.eq(index).addClass('active');
        currentIndex = index;
    }

    function nextSlide() {
        showSlide((currentIndex + 1) % slides.length);
    }

    function startSlider() {
        slideInterval = setInterval(nextSlide, 4000);
    }

    function stopSlider() {
        clearInterval(slideInterval);
    }

    kropki.on('click', function () {
        showSlide(parseInt($(this).data('index'), 10));
        stopSlider();
        startSlider();
    });

    showSlide(0);
    startSlider();
});
