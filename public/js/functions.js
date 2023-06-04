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

function quitarProducto(claseElementoAEliminar) {
    console.log("entre");
    const element = document.getElementsByClassName(claseElementoAEliminar);
    console.log(claseElementoAEliminar);
    console.log(claseElementoAEliminar[0]);
    element[0].remove();
    if(document.getElementsByClassName("tarjeta-producto").length === 0) {
        document.getElementsByClassName("carrito-total-section")[0].remove();
        document.getElementsByClassName("tarjetas-productos")[0].innerHTML = "<div><p>Carrito Vacio</p></div>";
        document.getElementsByClassName("tarjetas-productos")[0].style.flexFlow = "row";
        document.getElementsByClassName("tarjetas-productos")[0].style.fontSize = "24px"
    }
}