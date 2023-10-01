
const headerLogin = document.querySelector('.image-header-login');
const modalHeader = document.querySelector('.modal-header')
const hidden = document.querySelector('.menu-hidden');
const burger = document.querySelector('.burger-menu');
const login = document.querySelector('.login-burger');
const modal = document.querySelector('.login-modal')



burger.addEventListener('click', () => {
  hidden.classList.toggle('show')

})
headerLogin.addEventListener('click', () => {
  modalHeader.classList.toggle('mirar')
})

if (login != null) {
  login.addEventListener('click', () => {
    modal.classList.toggle('mirar');
  })
}
