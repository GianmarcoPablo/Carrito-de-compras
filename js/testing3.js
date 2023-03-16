const carrito = document.querySelector("#carrito")
const contenedorCarrito = document.querySelector("#lista-carrito tbody")
const vaciarCarritoBtn = document.querySelector("#vaciar-carrito")
const listaCursos = document.querySelector("#lista-cursos")
let articulosCarrito = [];

cargarEventListeners()
function cargarEventListeners(){
    listaCursos.addEventListener("click",agregarCurso)
    carrito.addEventListener("click",eliminarCurso)
    vaciarCarritoBtn.addEventListener("click",()=>{
        articulosCarrito = []
        limpiarHTML()
    })
}

function agregarCurso(e){
    e.preventDefault()
    if(e.target.classList.contains("agregar-carrito")){
        const cursoSeleccionado = e.target.parentElement.parentElement
        leerDatosCurso(cursoSeleccionado)
        console.log(cursoSeleccionado)
    }
}

function eliminarCurso(e){
    if(e.target.classList.contains("borrar-curso")){
        const cursoId = e.target.getAttribute("data-id")
        const cursoAEliminar = articulosCarrito.find(curso=>curso.id === cursoId)
        if(cursoAEliminar.cantidad > 1){
            cursoAEliminar.cantidad --
        }else{
            articulosCarrito = articulosCarrito.filter(curso=>curso.id !== cursoId)

        }
        carritoHtml()
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
                curso.cantidad ++
                return curso
            }else{
                return curso
            }
        })
        articulosCarrito = [...cursos]
    }else{
        articulosCarrito = [...articulosCarrito, infoCursos]
    }
    console.log(articulosCarrito)
    carritoHtml()
}

function carritoHtml(){
    limpiarHTML()
    articulosCarrito.forEach(curso=>{
        const {imagen,titulo,precio,od,cantidad} = curso
        const row = document.createElement("tr")
        row.innerHTML = `
            <td>
                <img src="${imagen}" width="100">
            </td>
            <td>${titulo}</td>
            <td>${precio}</td>
            <td>${cantidad}</td>
            <td>
                <a href=# class="borrar-curso" data-id="${curso.id}">X</a>
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