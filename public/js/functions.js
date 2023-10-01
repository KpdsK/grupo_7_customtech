function sumar(inputId, id, precio, idUser) {
    const input = document.getElementById(inputId + id);
    var value = input.value;
    const label = document.getElementsByClassName("subtotal-" + id)[0];
    value++;
    input.value = value;
    label.innerHTML = "$" + value * precio;
    calcularTotal()
    modificarCantidadProductoEnCarrito(input.value, id, idUser)
}

function recargaDatosWishCart(idUsuario) {
    fetch(`http://localhost:3007/api/users/getDataWishAndCart/${idUsuario}`, {
        method: 'GET',
        headers: { "Content-type": "application/json; charset=UTF-8" }
    })
        .then(response => response.json())
        .then(obj => {
            recargarDatosCarrito(obj.data.total_cart,obj.data.cantidad_cart);
            recargarDatosWish(obj.data.wish_data)
        }).catch(err => console.log(err));
}

function recargarDatosCarrito(total_cart, cart_data) {
    const cartdata = document.getElementById('cartdata');
    // cartdata.innerText = `Carrito  ${cart_data} total ${total_cart}`
    cartdata.innerText = `${total_cart}`
}

function recargarDatosWish(wish_data) {
    const wishdata = document.getElementById('wishdata');
    wishdata.innerText = ` ${wish_data}`
}

function calcularTotal() {
    const subtotales = [...document.getElementsByClassName("subtotal")];
    const total = document.getElementById('total');

    let totales = subtotales.reduce((tot, ele) => tot + parseFloat(ele.textContent.replace('$', '')), 0)
    total.innerHTML = '$' + totales;
}

function restar(inputId, id, precio, idUser) {
    const input = document.getElementById(inputId + id);
    var value = input.value;
    const label = document.getElementsByClassName("subtotal-" + id)[0];
    if (value > 1) {
        value--;
    }
    input.value = value;
    label.innerHTML = "$" + value * precio;
    calcularTotal()
    modificarCantidadProductoEnCarrito(input.value, id, idUser)
}

function quitarProducto(claseElementoAEliminar, sectionToRemove, message, idUser) {
    const element = document.getElementsByClassName(claseElementoAEliminar);
    element[0].remove();
    if (document.getElementsByClassName("tarjeta-producto").length === 0) {
        document.getElementsByClassName(sectionToRemove)[0].remove();
        document.getElementsByClassName("tarjetas-productos")[0].innerHTML = `<div><p>${message} Vacio</p></div>`;
        document.getElementsByClassName("tarjetas-productos")[0].style.flexFlow = "row";
        document.getElementsByClassName("tarjetas-productos")[0].style.fontSize = "24px"
    } 
    let _datos = {
        id_product: claseElementoAEliminar,
    }
    if (message=="Carrito") {
        calcularTotal()
        fetchToSite("productCart", "DELETE", _datos, idUser)
    } else {
        fetchToSite("productWishList", "DELETE", _datos, idUser)
    }
}

function agregarProductoACarritoDesdeWishList(idProd, idUser) {
    quitarProductoWhislist(idProd, idUser);
    agregarProductoACarrito(idProd, idUser)
}

function modificarCantidadProductoEnCarrito(amount, idProd, idUser) {
    let _datos = {
        id_product: idProd,
        amount: amount
    }
    fetchToSite("productCart", "PUT", _datos, idUser)
}

function agregarProductoACarrito(idProd, idUser) {
    let _datos = {
        id_product: idProd,
        amount: 1
    }
    fetchToSite("productCart", "POST", _datos, idUser);
}

function irALogin() {
    fetch('http://localhost:3007/login', {
        method: 'GET',
    })
}

function agregarProductoAWishList(idProd, idUser) {
    let _datos = {
        id_product: idProd
    }
    fetchToSite("productWishList", "POST", _datos, idUser);
}

function fetchToSite(endpoint, method, _datos, id) {
    fetch('http://localhost:3007/'+endpoint, {
        method: method,
        body: JSON.stringify(_datos),
        headers: { "Content-type": "application/json; charset=UTF-8" }
    })
        .then(response => response.json())
        .then(json => recargaDatosWishCart(id))
        .catch(err => console.log(err));
}

function quitarProductoCarrito(claseElementoAEliminar, idUser) {
    quitarProducto(claseElementoAEliminar, "carrito-total-section", "Carrito", idUser);
}

function quitarProductoWhislist(claseElementoAEliminar, idUser) {
    quitarProducto(claseElementoAEliminar, "whislist-agregar-section", "Whislist", idUser);
}

function agregarTodoAlCarrito(idUser) {
    [...document.getElementsByClassName("tarjeta-producto")].forEach(element => {agregarProductoACarrito(element.classList[1],idUser);quitarProductoWhislist(element.classList[1],idUser)});
    document.getElementsByClassName("whislist-agregar-section")[0].remove();
    document.getElementsByClassName("tarjetas-productos")[0].innerHTML = `<div><p>Whislist Vacio</p></div>`;
    document.getElementsByClassName("tarjetas-productos")[0].style.flexFlow = "row";
    document.getElementsByClassName("tarjetas-productos")[0].style.fontSize = "24px"
}