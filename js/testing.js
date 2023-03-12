//variables
const carrito = document.querySelector("#carrito")
const contenedorCarrito = document.querySelector("#lista-carrito tbody")
const vaciarCarritoBtn = document.querySelector("#vaciar-carrito")
const listaCursos = document.querySelector("#lista-cursos")
let articulosCarrito = [];

cargarEventListener()
function cargarEventListener(){
    listaCursos.addEventListener("click",AgregarCurso) //agrega curso con click
}

//funciones
function AgregarCurso(e){
    e.preventDefault()
    if(e.target.classList.contains("agregar-carrito")){
        const cursoSeleccionado = e.target.parentElement.parentElement
        leerDatosCurso(cursoSeleccionado)
    }
}

function leerDatosCurso(curso){ //lee los datos al curso que dimos click  

    //creamos un objeto con la informacion del curso actual
    const infoCurso = {
        imagen: curso.querySelector("img").src,
        titulo: curso.querySelector("h4").textContent,
        precio: curso.querySelector(".precio span").textContent,
        id: curso.querySelector("a").getAttribute("data-id"),
        cantidad: 1
    }
    
    //agrega elementos al arreglo de carrito
    
    articulosCarrito = [...articulosCarrito, infoCurso]
    console.log(articulosCarrito)

    carritoHTML()
}

//muestra el carrito en html

function carritoHTML(){

    //limpiar el html

    limpiarHTML()
    //rrecorre el carrito y genera el html
    articulosCarrito.forEach((curso)=>{
        const row =  document.createElement("tr")
        row.innerHTML = `
            <td>
                ${curso.titulo}
            </td>
        `
        //agrega el html del carrito en el tb body
        contenedorCarrito.appendChild(row)
    })
}

function limpiarHTML(){

    while(contenedorCarrito.firstChild){
        contenedorCarrito.removeChild(contenedorCarrito.firstChild)
    }
}