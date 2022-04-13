import { productos } from "./stock.js";

// let total = total + precio * cantidad;
let carritoDeCompras = [];

export const carritoIndex = (productoId) => {
    const contenedorCarrito = document.getElementById('carrito-contenedor');

    const renderProductosCarrito = () => {
        let producto = productos.find( producto => producto.id == productoId );
        carritoDeCompras.push(producto);

        producto.cantidad = 1;

        let div = document.createElement('div');
        div.classList.add('productoEnCarrito');
        div.innerHTML = `<table class="table">
                
                    
                                
                                    <th>${producto.nombre}</th>
                                    <th id="cantidad${producto.id}"> ${producto.cantidad}</th>
                                    <th>$${producto.precio}</th>
                                    <th>$${producto.precio*producto.cantidad}</th>
                                
                
        </table>
                        `
    contenedorCarrito.appendChild(div);

    }
    
    renderProductosCarrito();
}

