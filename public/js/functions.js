function sumar(inputId) {
    console.log(inputId);
    const input = document.getElementById(inputId);
    var value = input.value;
    value++;
    input.value = value;
}

function restar(inputId) {
    console.log(inputId);
    const input = document.getElementById(inputId);
    var value = input.value;
    if (value > 1) {
        value--;
    }
    input.value = value;
}

function quitarProducto(claseElementoAEliminar, sectionToRemove, message) {
    const element = document.getElementsByClassName(claseElementoAEliminar);
    console.log(claseElementoAEliminar);
    console.log(claseElementoAEliminar[0]);
    element[0].remove();
    if (document.getElementsByClassName("tarjeta-producto").length === 0) {
        document.getElementsByClassName(sectionToRemove)[0].remove();
        document.getElementsByClassName("tarjetas-productos")[0].innerHTML = `<div><p>${message} Vacio</p></div>`;
        document.getElementsByClassName("tarjetas-productos")[0].style.flexFlow = "row";
        document.getElementsByClassName("tarjetas-productos")[0].style.fontSize = "24px"
    }
}

function quitarProductoCarrito(claseElementoAEliminar) {
    quitarProducto(claseElementoAEliminar, "carrito-total-section", "Carrito");
}

function quitarProductoWhislist(claseElementoAEliminar) {
    quitarProducto(claseElementoAEliminar, "whislist-agregar-section", "Whislist");
}

function agregarTodoAlCarrito() {
    console.log(document.getElementsByClassName("tarjeta-producto"));
    [...document.getElementsByClassName("tarjeta-producto")].forEach(element => element.remove());
    document.getElementsByClassName("whislist-agregar-section")[0].remove();
    document.getElementsByClassName("tarjetas-productos")[0].innerHTML = `<div><p>Whislist Vacio</p></div>`;
    document.getElementsByClassName("tarjetas-productos")[0].style.flexFlow = "row";
    document.getElementsByClassName("tarjetas-productos")[0].style.fontSize = "24px"
}