function crearEnlace(elemento){
    let elem = document.createElement('a');
    elem.style.margin="20px"
    elem.href = elemento[1];
    elem.text = elemento[0];
    document.body.appendChild(elem);
}

function paginas() {
    return [['Home','/'], ['Login', 'login'], ['Register', 'register'], ['ProductoCart', 'productCart'], ['ProductDetail', 'productDetail'], ['ProductWhisList','productWhisList']];
}
function crearEnlaces() {
    paginas().forEach(elem => crearEnlace(elem))
}

crearEnlaces()