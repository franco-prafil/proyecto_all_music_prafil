
// CLASE CONSTRUCTORA
class Producto{
    constructor(id, nombre, precio){
        this.id = id;
        this.nombre = nombre;
        this.precio = parseInt(precio);
    }
}

const productos1 = []
productos1.push(new Producto (1, 'Bajo Jazz Bass ', 80000));
productos1.push(new Producto (2, 'Guitarra Telecaster', 70000));
productos1.push(new Producto (3, 'Teclado Nord Stage', 120000));
productos1.push(new Producto (4, 'Bateria', 150000)); 



let total = 0;

// FUNCION PARA LA COMPRA

function agregarAlCarrito (){
    let otroProducto;
    do{
        let producto = parseInt(prompt("1 - Bajo Jazz Bass Fender\n2 - Guitarra Telecaster Fender\n3 - Teclado Nord Stage 3\n4 - Bateria DW\n5 - Salir"));
        let cantidad = parseInt(prompt("Cantidad?", 0));
        let precio;
        if(producto == 5){
            alert("Gracias por visitarnos");
            break
        }

        switch(producto){
            case productos1[0].id:
                precio = productos1[0].precio;
                break;
            case productos1[1].id:
                precio = productos1[1].precio;
                break;
            case productos1[2].id:
                precio = productos1[2].precio;
                break;
            case productos1[3].id:
                precio = productos1[3].precio;
                break;
            default:
                precio = 0;
                cantidad = 0;
                alert("Algunos de los datos ingresados no son correctos");
                break;
        }

        total = total + precio * cantidad;
        otroProducto = confirm("Queres agregar otro producto?")

    } while (otroProducto);
}


// FUNCION PARA METODO DE PAGO

function metodoDePago() {
    let pago = parseInt(prompt("1 - Efectivo\n2 - Tarjeta Credito o Debito en 1 Pago"));

        switch (pago) {
            case 1:
                total = total*0.90;
                alert("Tenes un 10% de descuento por pago en Efectivo");
                break;
            case 2:
                total = total;
                alert("Has Elegido Pago con Tarjeta de Credito o Debito");
                break;
            default:
                alert("No has elegido un medio de pago");
                break;
        }
        
    
    return total;
}

// FUNCION PARA EL ENVIO

function calcularEnvio() {
    let confirmacion = confirm("¿Querés envío a domicilio?");

    if (confirmacion && total >= 50000) {
        alert("Tenés envio gratis. El total de tu compra es $" + total);
    } else if (confirmacion && total < 50000 && total != 0) {
        total = total + 1200;
        alert("El envío cuesta $700. El total de tu compra es $" + total);
    } else {
        alert("El total de tu compra es $" + total);
    }

    return total;
    
}

// console.log(total);

agregarAlCarrito();
metodoDePago();
calcularEnvio(total);
// console.log(total);
