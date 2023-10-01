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
    // const totalcartdata = document.getElementById('totalcartdata');
    // cartdata.innerText = `Carrito  ${cart_data} total ${total_cart}`
    cartdata.innerText = `${cart_data}`
    // totalcartdata.innerText = `${total_cart}`
}

function recargarDatosWish(wish_data) {
    const wishdata = document.getElementById('wishdata');
    wishdata.innerText = `${wish_data}`
}
