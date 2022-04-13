import {carritoIndex} from "./carritoIndex.js";
import {productos} from "./stock.js";


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


const mostrarProductos = (productos) => {
    const contenedorProductos = document.getElementById("producto-contenedor");
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
                                        <a href="#carrito-contenedor" class="btn btn-primary" id=boton${producto.id}>Agregar al carrito</a>
                                    </div>
                                </div>
                            </div>
                            `
    contenedorProductos.appendChild(div);

    const boton = document.getElementById(`boton${producto.id}`);
    boton.addEventListener('click', () => {
        carritoIndex(producto.id);
    })
    });
};

mostrarProductos(productos);
