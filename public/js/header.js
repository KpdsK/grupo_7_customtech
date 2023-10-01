
  const headerLogin = document.querySelector('.image-header-login');
  const modalHeader = document.querySelector('.modal-header')
  const hidden = document.querySelector('.menu-hidden');
  const burger = document.querySelector('.burger-menu');
  const login = document.querySelector('.login-burger');
  const modal = document.querySelector('.login-modal');
  const cart = document.querySelector('.cart');
  const cartdata = document.querySelector('#cartdata');
  console.log(cartdata)
  
  burger.addEventListener('click' , () => {
    hidden.classList.toggle('show')

  })
  headerLogin.addEventListener('click', () => {
    modalHeader.classList.toggle('mirar')
  })

  if(login != null) {
    login.addEventListener('click', () => {
      modal.classList.toggle('mirar');
    })
  }
  
  // if(cart && cartdata  != null) {
  //   cart.addEventListener('mouseover', () => {
  //     console.log(cartdata)
  //     cartdata.classList.add('mirar')
  //   }) 
  //   cart.addEventListener('mouseout', () => {
  //     cartdata.classList.remove('mirar')
  //   })
  // }



