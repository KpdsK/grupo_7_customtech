function agregarFavIcon(){
    let enlaceHead = document.createElement("link");
    enlaceHead.href = "/images/favicon.ico";
    enlaceHead.rel = "icon";
    enlaceHead.type = "image/x-icon";
    let title = document.createElement("title");
    title.text = "CustomTech";
    document.head.appendChild(enlaceHead);
    document.head.appendChild(title);
}

function paginas() {
    return [['Home','/'], ['Login', 'login'], ['Register', 'register'], ['ProductoCart', 'productCart'], ['ProductDetail', 'productDetail'], ['ProductWhisList','productWhisList']];
}

function crearEnlace(elemento){
    let elem = document.createElement('a');
    elem.style.margin="20px"
    elem.href = elemento[1];
    elem.text = elemento[0];
    document.body.appendChild(elem);
}


function crearEnlaces() {
    paginas().forEach(elem => crearEnlace(elem))
}

agregarFavIcon();
// crearEnlaces();