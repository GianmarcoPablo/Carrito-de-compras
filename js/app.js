//variables
const carrito = document.querySelector("#carrito")
const contenedorCarrito = document.querySelector("#lista-carrito tbody")
const vaciarCarritoBtn = document.querySelector("#vaciar-carrito")
const listaCursos = document.querySelector("#lista-cursos")
let articulosCarrito = [];

cargarEventListeners()
function cargarEventListeners(){
    listaCursos.addEventListener("click", agregarCurso) 
    carrito.addEventListener("click",eliminarCurso)
}

function agregarCurso(e){
    e.preventDefault()
    if(e.target.classList.contains("agregar-carrito")){
        const cursoSeleccionado = e.target.parentElement.parentElement
        leerDatosCurso(cursoSeleccionado)
    }
}

function eliminarCurso(e){
    if(e.target.classList.contains(".borrar-curso")){
        const cursoId = e.target.getAttribute("data-id")
        articulosCarrito = articulosCarrito.filter(curso=>curso.id === cursoId)
        carritoHTML()
    }
}

function leerDatosCurso(curso){
    const infoCursos = {
        imagen: curso.querySelector("img").src,
        titulo: curso.querySelector("h4").textContent,
        precio: curso.querySelector(".precio span").textContent,
        id: curso.querySelector("a").getAttribute("data-id"),
        cantidad: 1
    }

    //revisa si un elemento ya existe en el carrito
    //some te permite iterar en un arreglo de objetos y verificar rsi un elemento exite en el
    const existe = articulosCarrito.some(curso=> curso.id === infoCursos.id)
    if(existe){
        //actualizamos la cantidad
        const cursos = articulosCarrito.map(curso=>{
            if(curso.id === infoCursos.id){
                curso.cantidad++
                return curso //retorna el objecto actualizado
            }else{
                return curso //los objetos que no son los duplicados
            }
        })
        articulosCarrito = [...cursos]
    }else{
        articulosCarrito = [...articulosCarrito, infoCursos]
    }
    carritoHTML()
}

function carritoHTML(){
    limpiarHTML()
    articulosCarrito.forEach(curso=>{
        const {imagen,titulo,precio,cantidad,id} = curso
        const row = document.createElement("tr")
        row.innerHTML = `
            <td>
                <img src="${imagen}" width="100"> 
            </td>
            <td>${titulo}</td>
            <td>${precio}</td>
            <td>${cantidad}</td>
            <td>
                <a href="#" class="borrar-curso" data-id="${id}">X</a>
            </td>
        `
        contenedorCarrito.appendChild(row)
    })
}


function limpiarHTML(){
    while(contenedorCarrito.firstChild){
        contenedorCarrito.removeChild(contenedorCarrito.firstChild)
    }
}
