// console.log('hola mundo')  testeo
// console.log(document.querySelector('.header-img'));
window.onload  =() => {

  const hidden = document.querySelector('.menu-hidden');
  const burger = document.querySelector('.burger-menu');
  const login = document.querySelector('.login');
  const modal = document.querySelector('.login-modal')

  burger.addEventListener('click' , () => {
    hidden.classList.toggle('show')
  })

  login.addEventListener('click', () => {
    modal.classList.toggle('mirar')
  })

  
  

  

}