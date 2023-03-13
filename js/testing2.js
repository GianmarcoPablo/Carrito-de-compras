const carrito = document.querySelector("#carrito")
const contenedorCarrito = document.querySelector("#lista-carrito tbody")
const vaciarCarritoBtn = document.querySelector("#vaciar-carrito")
const listaCursos = document.querySelector("#lista-cursos")
let articulosCarrito = [];

cargarEventListeners()
function cargarEventListeners(){
    listaCursos.addEventListener("click",agregarCurso)
}

function agregarCurso(e){
    e.preventDefault()
    if(e.target.classList.contains("agregar-carrito")){
        const cursoSeleccionado = e.target.parentElement.parentElement
        leerDatosCurso(cursoSeleccionado)
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

    const existe = articulosCarrito.some(curso=>curso.id === infoCursos.id)
    if(existe){
        const cursos = articulosCarrito.map(curso=>{
            if(curso.id === infoCursos.id){
                curso.cantidad++
                return curso
            }else{
                return curso
            }
        })
        articulosCarrito = [...cursos]
    }else{
        articulosCarrito = [...articulosCarrito,infoCursos]
    }
    carritoHTML()
}

function carritoHTML(){

    limpiarHTML()
    articulosCarrito.forEach(curso=>{
        const {imagen,titulo,precio,id,cantidad} = curso
        const row = document.createElement("tr")
        row.innerHTML = `
            <td>
                <img src=${imagen} width = 100>
            </td>
            <td>${titulo}</td>
            <td>${precio}</td>
            <td>${id}</td>
            <td>${cantidad}</td>
            <td>
                <a href="#" class="borrar-curso" data-id="${id}"> X </a> 
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