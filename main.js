import {agregarProducto} from "./carritoIndex.js";
import {getData} from "./getData.js";


const hero = document.getElementById ("hero");
const div = document.createElement("div");
div.innerHTML += `<div class="pricing-header p-3 pb-md-4 mx-auto text-center">
<h1 class="display-4 fw-normal">Catálogo</h1>
<p class="fs-5 text-muted">Los mejores instrumentos, las mejores marcas al mejor precio posible las encontras en All Music</p>
</div>
`
hero.appendChild(div);



// CLASE CONSTRUCTORA
// class Producto{
//     constructor(id, nombre, precio){
//         this.id = id;
//         this.nombre = nombre;
//         this.precio = parseInt(precio);
//     }
// }

// const productos1 = []
// productos1.push(new Producto (1, 'Bajo Jazz Bass ', 80000));
// productos1.push(new Producto (2, 'Guitarra Telecaster', 70000));
// productos1.push(new Producto (3, 'Teclado Nord Stage', 120000));
// productos1.push(new Producto (4, 'Bateria', 150000)); 


const mostrarProductos = async () => {
    const contenedorProductos = document.getElementById("producto-contenedor");
    const productos = await getData();

    productos.forEach(producto => {
        const div = document.createElement('div');
        div.classList.add('card');
        div.innerHTML += `
                        <div class="row row-cols-1 row-cols-md-3 text-center">
                            <div class="col">
                                <div class="card" style="width: 18rem;">
                                    <img src=${producto.img} class="card-img-top img-thumbnail" alt="bajo_fender_crop_1">
                                    <div class="card-body">
                                        <h5 class="card-title">${producto.nombre}</h5>
                                        <p class="card-text">${producto.desc}</p>
                                        <p>Color: ${producto.color}</p>
                                        <p>Precio: $${producto.precio}</p>
                                        <a href="#carrito-contenedor" class="btn btn-success align-items-center" id=boton${producto.id}>Agregar al carrito  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-cart4" viewBox="0 0 16 16">
                                        <path d="M0 2.5A.5.5 0 0 1 .5 2H2a.5.5 0 0 1 .485.379L2.89 4H14.5a.5.5 0 0 1 .485.621l-1.5 6A.5.5 0 0 1 13 11H4a.5.5 0 0 1-.485-.379L1.61 3H.5a.5.5 0 0 1-.5-.5zM3.14 5l.5 2H5V5H3.14zM6 5v2h2V5H6zm3 0v2h2V5H9zm3 0v2h1.36l.5-2H12zm1.11 3H12v2h.61l.5-2zM11 8H9v2h2V8zM8 8H6v2h2V8zM5 8H3.89l.5 2H5V8zm0 5a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0zm9-1a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0z"/>
                                      </svg></a>
                                    </div>
                                </div>
                            </div>
                            `
    contenedorProductos.appendChild(div);

    const boton = document.getElementById(`boton${producto.id}`);
    boton.addEventListener('click', () => {
        agregarProducto(producto.id);
    })
    });
};

mostrarProductos();
