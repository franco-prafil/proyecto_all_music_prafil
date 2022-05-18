let carritoDeCompras = [];

const existeProductoEnCarrito = (productoId) =>
  carritoDeCompras.some((x) => x.id === productoId);

const agregarProducto = (productoId, productos) => {
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
    for (let index = 0; index < carritoDeCompras.length; index++) {
      const elemento = carritoDeCompras[index];
      if (elemento.id === productoId) {
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
  let totalCantidad = 0;
  let totalPrecio = 0;
  const contenedorCarrito = document.getElementById("items");
  contenedorCarrito.innerHTML = "";
  carritoDeCompras.forEach((producto) => {
    let tr = document.createElement("tr");
    
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
                            <td>$${producto.precio.toLocaleString("es-AR")}</td>
                            <td>$${(producto.precio * producto.cantidad).toLocaleString("es-AR")}</td>
                            <td><button style="button" id="delete_${
                              producto.id
                            }" class="iconoTrash"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                            <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                          </svg></button></td>
        `;
    contenedorCarrito.appendChild(tr);
    
    totalCantidad += producto.cantidad;
    totalPrecio += producto.precio * producto.cantidad;
    
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
  console.log(totalPrecio);

  document.getElementById("totalCantidad").innerText = totalCantidad;
  document.getElementById("totalPrecio").innerText = totalPrecio.toLocaleString("es-AR");
  
};

const botonPago = document.getElementById(`botonPago`);
    botonPago.addEventListener('click', () => {
    setInterval("location.reload()",3000);
    Swal.fire({
      title: 'Ir a Pagar',
      html: 'Te redireccionaremos a la pagina para que puedas abonar',
      timer: 3000,
      showConfirmButton: false,
      timerProgressBar: true,
    })
    agregarProducto(producto.id, productos);
})

let local = localStorage.getItem('carrito');
if(local){
    carritoDeCompras=JSON.parse(local);
    renderProductosCarrito();
}else{
    localStorage.setItem('carrito', JSON.stringify(carritoDeCompras));
}

export { agregarProducto, renderProductosCarrito };
