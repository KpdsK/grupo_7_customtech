window.onload = function(){
    const form = document.querySelector('form')
    const name = document.querySelector('#product-name')
    const description = document.querySelector('#product-description')
    const image = document.querySelector('product-image')
    const precio = document.querySelector('#product-price')
    const erroresLista = document.querySelector('#erroresLista')
   const objErrores = {
       nombre: "Llenar el campo"
   }
    name.addEventListener("blur",function(){
       name.value == "" ? objErrores.nombre = "Llenar el campo" : objErrores.nombre = null
       console.log(objErrores.nombre)
    })
   
   
       form.addEventListener('submit', async (e) => {
          e.preventDefault()
   
    
           let errores = []
   
           if (name.value == '') {
   
           errores.push('Debe llenar el campo')
               name.classList.add('is-invalid')
               name.classList.remove('is-valid') 
           } else {
               name.classList.remove('is-invalid')
               name.classList.add('is-valid')
           }
   
            if (errores.length > 0) {
               erroresLista.innerHTML =  ` `
               for (let error of errores) {
                   erroresLista.innerHTML += <li>${error}</li>
               }
           } else{
               erroresLista.innerHTML =  ` `
               /* form.submit() */
           }
   
       })
   
   }