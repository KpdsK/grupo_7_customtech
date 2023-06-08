function sumar(inputId, id, precio) {
    const input = document.getElementById(inputId+id);
    var value = input.value;
    const label = document.getElementsByClassName("subtotal-"+id)[0];
    const subtotales = document.getElementsByClassName("subtotal");
    const total = document.getElementById('total');
    value++;
    input.value = value;
    label.innerHTML = "$" + value * precio;
    let totales=0;
    for (let i of subtotales) {
        totales += parseFloat(i.textContent.replace('$', ''));
    }
    total.innerHTML = '$'+totales;
}

function restar(inputId, id, precio) {
    console.log(precio);
    const input = document.getElementById(inputId+id);
    var value = input.value;
    const label = document.getElementsByClassName("subtotal-"+id)[0];
    const subtotales = document.getElementsByClassName("subtotal");
    const total = document.getElementById('total');
    if (value > 1) {
        value--;
    }
    input.value = value;
    label.innerHTML = "$" + value * precio ;
    let totales=0;
    for (let i of subtotales) {
        totales += parseFloat(i.textContent.replace('$', ''));
    }
    total.innerHTML = '$'+totales;
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