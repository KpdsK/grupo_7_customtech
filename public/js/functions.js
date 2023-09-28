function sumar(inputId, id, precio) {
    const input = document.getElementById(inputId + id);
    var value = input.value;
    const label = document.getElementsByClassName("subtotal-" + id)[0];
    value++;
    input.value = value;
    label.innerHTML = "$" + value * precio;
    calcularTotal()
    modificarCantidadProductoEnCarrito(input.value, id)
}

function calcularTotal() {
    const subtotales = document.getElementsByClassName("subtotal");
    const total = document.getElementById('total');
    let totales = 0;
    for (let i of subtotales) {
        totales += parseFloat(i.textContent.replace('$', ''));
    }
    total.innerHTML = '$' + totales;
}

function restar(inputId, id, precio) {
    console.log(precio);
    const input = document.getElementById(inputId + id);
    var value = input.value;
    const label = document.getElementsByClassName("subtotal-" + id)[0];
    if (value > 1) {
        value--;
    }
    input.value = value;
    label.innerHTML = "$" + value * precio;
    calcularTotal()
    modificarCantidadProductoEnCarrito(input.value, id)
}

function quitarProducto(claseElementoAEliminar, sectionToRemove, message) {
    const element = document.getElementsByClassName(claseElementoAEliminar);
    element[0].remove();
    if (document.getElementsByClassName("tarjeta-producto").length === 0) {
        document.getElementsByClassName(sectionToRemove)[0].remove();
        document.getElementsByClassName("tarjetas-productos")[0].innerHTML = `<div><p>${message} Vacio</p></div>`;
        document.getElementsByClassName("tarjetas-productos")[0].style.flexFlow = "row";
        document.getElementsByClassName("tarjetas-productos")[0].style.fontSize = "24px"
    } else if(message=="Carrito") {
        calcularTotal()
    }
    let _datos = {
        id_product: claseElementoAEliminar,
    }
    if (message=="Carrito") {
        fetchToSite("productCart", "DELETE", _datos)
    } else {
        fetchToSite("productWishList", "DELETE", _datos)
    }
}

function agregarProductoACarritoDesdeWishList(idProd) {
    quitarProductoWhislist(idProd);
    agregarProductoACarrito(idProd)
}

function modificarCantidadProductoEnCarrito(amount, idProd) {
    let _datos = {
        id_product: idProd,
        amount: amount
    }
    console.log(_datos)
    fetchToSite("productCart", "PUT", _datos)
}

function agregarProductoACarrito(idProd) {
    let _datos = {
        id_product: idProd,
        amount: 1
    }
    fetchToSite("productCart", "POST", _datos)
}

function agregarProductoAWishList(idProd) {
    let _datos = {
        id_product: idProd
    }
    fetchToSite("productWishList", "POST", _datos)
}

function fetchToSite(endpoint, method, _datos) {
    fetch('http://192.168.100.170:3007/'+endpoint, {
        method: method,
        body: JSON.stringify(_datos),
        headers: { "Content-type": "application/json; charset=UTF-8" }
    })
        .then(response => response.json())
        .then(json => console.log(json))
        .catch(err => console.log(err));
}

function quitarProductoCarrito(claseElementoAEliminar) {
    quitarProducto(claseElementoAEliminar, "carrito-total-section", "Carrito");
}

function quitarProductoWhislist(claseElementoAEliminar) {
    quitarProducto(claseElementoAEliminar, "whislist-agregar-section", "Whislist");
}

function agregarTodoAlCarrito() {
    console.log(document.getElementsByClassName("tarjeta-producto"));
    [...document.getElementsByClassName("tarjeta-producto")].forEach(element => {agregarProductoACarrito(element.classList[1]);quitarProductoWhislist(element.classList[1])});
    document.getElementsByClassName("whislist-agregar-section")[0].remove();
    document.getElementsByClassName("tarjetas-productos")[0].innerHTML = `<div><p>Whislist Vacio</p></div>`;
    document.getElementsByClassName("tarjetas-productos")[0].style.flexFlow = "row";
    document.getElementsByClassName("tarjetas-productos")[0].style.fontSize = "24px"
}