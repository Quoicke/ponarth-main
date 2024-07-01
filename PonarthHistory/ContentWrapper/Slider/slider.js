document.addEventListener('DOMContentLoaded', function () {
    const swiper = new Swiper('.swiper-container', {
      loop: true,
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
    });
  
    const slides = document.querySelectorAll('.swiper-slide');
  
    slides.forEach((slide, index) => {
      slide.addEventListener('click', () => {
        swiper.slideToLoop(index);
      });
    });
  });
  