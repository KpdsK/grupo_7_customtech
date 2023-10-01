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
    cartdata.innerText = `Carrito cantidad ${cart_data} total ${total_cart}`
}

function recargarDatosWish(wish_data) {
    const wishdata = document.getElementById('wishdata');
    wishdata.innerText = `Wish ${wish_data}`
}
