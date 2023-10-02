function recargaDatosWishCart() {
    let productosCart = JSON.parse(localStorage.getItem("carrito"));
    let productosWish = JSON.parse(localStorage.getItem("wish"));
    let totalCart = productosCart.reduce((t, p) => t + (p.precio * p.cantidad), 0)
    let cantProdCart = productosCart.reduce((t, p) => t + p.cantidad, 0)
    recargarDatosCarrito(totalCart, cantProdCart);
    recargarDatosWish(productosWish.length)
}

function recargarDatosCarrito(total_cart, cart_data) {
    const cartdata = document.getElementById('cartdata');
    const totalcartdata = document.getElementById('totalcartdata');
    // console.log(totalcartdata);
    cartdata.innerText = `${cart_data}`
    // totalcartdata.innerText = `${total_cart}`
}

function recargarDatosWish(wish_data) {
    const wishdata = document.getElementById('wishdata');
    // if(wishdata != null) {
    //     if(wishdata.textContent.trim() == '0' && wishData.textContent == null){
    //         console.log(wishdata.textContent) 
    //         wishdata.style.display = 'none'
    //     } else {
    //         wishdata.style.display = 'block'
    //     }
    //   }
    wishdata.innerText = `${wish_data}`
}

function irALogin() {
    location.replace("http://localhost:3007/login")
  }
