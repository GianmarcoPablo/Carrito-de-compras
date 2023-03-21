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
        limpiarCarrito()
    })
}

function agregarCurso(e){
    e.preventDefault()
    if(e.target.classList.contains("agregar-carrito")){
        const cursoSeleccionado = e.target.parentElement.parentElement
        leerDatosCurso(cursoSeleccionado)
    }
}

function eliminarCurso(e){
    if(e.target.classList.contains("borrar-curso")){
        console.log(e.target.getAttribute("data-id"))
        const cursoId = e.target.getAttribute("data-id")
        const cursoAEliminar =  articulosCarrito.find(curso=>curso.id === cursoId)
        if(cursoAEliminar.cantidad > 1){
            cursoAEliminar.cantidad --
        }else{
            articulosCarrito = articulosCarrito.filter(curso=>curso.id !== cursoId)
        }
        carritoHTML()
    }
}

function leerDatosCurso(curso){
    const infoCurso = {
        imagen: curso.querySelector("img").src,
        titulo: curso.querySelector("h4").textContent,
        precio: curso.querySelector(".precio span").textContent,
        id: curso.querySelector("a").getAttribute("data-id"),
        cantidad: 1
    }
    const exite = articulosCarrito.some(curso=>curso.id === infoCurso.id)
    if(exite){
        const cursos = articulosCarrito.map(curso=>{
            if(curso.id === infoCurso.id){
                curso.cantidad ++
                return curso
            }else{
                return curso
            }
        })
        articulosCarrito = [...cursos]
    }else{
        articulosCarrito = [...articulosCarrito,infoCurso]
    }
    carritoHTML()
    console.log(articulosCarrito)
}

function carritoHTML(){
    limpiarCarrito()
    articulosCarrito.forEach(curso=>{
        const {imagen,titulo,precio,id,cantidad} = curso
        const row = document.createElement("tr")
        row.innerHTML = `
            <td>
                <img src="${imagen}" width="100">
            </td>
            <td>${titulo}</td>
            <td>${precio}</td>
            <td>${cantidad}</td>
            <td>
                <a href="#" class="borrar-curso" data-id="${id}"> X </a>
            </td>
        `
        contenedorCarrito.appendChild(row)
    })
}

function limpiarCarrito(){
    while(contenedorCarrito.firstChild){
        contenedorCarrito.removeChild(contenedorCarrito.firstChild)
    }
}