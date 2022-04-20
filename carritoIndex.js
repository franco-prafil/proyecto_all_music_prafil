import { productos } from "./stock.js";

// let total = total + precio * cantidad;
let carritoDeCompras = [];

const existeProductoEnCarrito = (productoId) =>
  carritoDeCompras.some((x) => x.id === productoId);

const agregarProducto = (productoId) => {
  if (!existeProductoEnCarrito(productoId)) {
    let producto = productos.find((producto) => producto.id === productoId);
    if (producto) {
      carritoDeCompras.push(producto);
    }
    localStorage.setItem('carrito', JSON.stringify(carritoDeCompras));
    renderProductosCarrito();
  }
};

const eliminarProducto = (productoId) => {
      carritoDeCompras = carritoDeCompras.filter((producto) => producto.id !== productoId);
      localStorage.setItem('carrito', JSON.stringify(carritoDeCompras));
      renderProductosCarrito();
  };

const sumarRestarCantidad = (productoId, sumar = true) => {
  if (existeProductoEnCarrito(productoId)) {
    //aumentar su cantidad (la cantidad de ese item del objeto)
    for (let index = 0; index < carritoDeCompras.length; index++) {
      const elemento = carritoDeCompras[index];
      if (elemento.id === productoId) {
        // sumar ?
        // carritoDeCompras[index].cantidad++ :
        // carritoDeCompras[index].cantidad--

        if (sumar) {
          carritoDeCompras[index].cantidad++;
        } else {
          if (carritoDeCompras[index].cantidad > 1)
            carritoDeCompras[index].cantidad--;
        }
      }
    }
  }
  localStorage.setItem('carrito', JSON.stringify(carritoDeCompras));
  renderProductosCarrito();
};

const renderProductosCarrito = () => {
  const contenedorCarrito = document.getElementById("items");
  contenedorCarrito.innerHTML = "";
  carritoDeCompras.forEach((producto) => {
    let tr = document.createElement("tr");
    tr.classList.add("productoEnCarrito");
    tr.innerHTML = `
                            <td>${producto.nombre}</td>
                            <td id="cantidad${producto.id}">
                                <button style="button" id="minus_${
                                  producto.id
                                }" class="buttonMinus">-</button>
                                ${producto.cantidad}
                                <button style="button" id="plus_${
                                  producto.id
                                }" class="buttonPlus" >+</button>
                            </td>
                            <td>$${producto.precio}</td>
                            <td>$${producto.precio * producto.cantidad}</td>
                            <td><button style="button" id="delete_${
                              producto.id
                            }" class="iconoTrash"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                            <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                          </svg></button></td>
        `;
    contenedorCarrito.appendChild(tr);

    const botonPlus = document.getElementById(`plus_${producto.id}`);
    const botonMinus = document.getElementById(`minus_${producto.id}`);
    const botonDelete = document.getElementById(`delete_${producto.id}`);
    botonPlus.addEventListener("click", () => {
      sumarRestarCantidad(producto.id);
    });

    botonMinus.addEventListener("click", () => {
      sumarRestarCantidad(producto.id, false);
    });
    botonDelete.addEventListener("click", () => {
      eliminarProducto(producto.id);
    });
  });
};

const renderTotal = () =>{
    const imprimirTotal = document.getElementById("totalFooter").content;
    let tr = document.createElement("tr");
    { 
    const totalCantidad = Object.values(carritoDeCompras).reduce((acc, {cantidad}) => acc + cantidad ,0);
    const totalPrecio = Object.values(carritoDeCompras).reduce((acc, {cantidad, precio}) => acc + cantidad * precio,0);
    console.log(totalCantidad);

    imprimirTotal.querySelectorAll('td')[0].textContent = totalCantidad;
    imprimirTotal.querySelector('span').textContent = totalPrecio;
    }
    imprimirTotal.appendChild(tr)

    renderTotal()
}

let local = localStorage.getItem('carrito');
if(local){
    carritoDeCompras=JSON.parse(local);
    renderProductosCarrito();
}else{
    localStorage.setItem('carrito', JSON.stringify(carritoDeCompras));
}

export { agregarProducto, renderProductosCarrito };
