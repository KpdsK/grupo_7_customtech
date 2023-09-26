
window.onload  =() => {

  const hidden = document.querySelector('.menu-hidden');
  const burger = document.querySelector('.burger-menu');
  const login = document.querySelector('.login-menu-list');
  const modal = document.querySelector('.login-modal')

  burger.addEventListener('click' , () => {
    hidden.classList.toggle('show')
  })

  login.addEventListener('click', () => {
    modal.classList.toggle('mirar')
  })

  var slideIndex = 1;
  
  function plusSlides(n) {
    showSlides(slideIndex += n);
  }

  function currentSlide(n) {
    showSlides(slideIndex = n);
  }

  function showSlides(n) {
    var i;
    var slides = document.getElementsByClassName("mySlides");
    var dots = document.getElementsByClassName("dot");
    if (n > slides.length) { slideIndex = 1; }
    if (n < 1) { slideIndex = slides.length; }
    for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
    }
    for (i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(" active", "");
    }
    slides[slideIndex - 1].style.display = "block";
    dots[slideIndex - 1].className += " active";
  }

  // Cambiar automáticamente las imágenes cada 2 segundos
  setInterval(function () {
    plusSlides(1);
  }, 2000);

  // Mostrar la primera imagen al cargar la página
  showSlides(slideIndex);
  

  

}