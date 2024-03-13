document.addEventListener("DOMContentLoaded", function() {
    var swiper = new Swiper(".slider", {
        loop: true,
        speed: 2000,
        autoplay: {
            delay: 5000,
            disableOnInteraction: false,
        },
        pagination: {
            el: ".swiper-pagination",
            dynamicBullets: true,
        },
    });
});