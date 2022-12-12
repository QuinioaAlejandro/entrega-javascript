

// BASICO
const compra = (clave, valor) => localStorage.setItem(clave, valor);
let carrito = JSON.parse(localStorage.getItem("listaProductos")) || [];



let shop = document.getElementById("ShopZapatillas");

const recovery = async () => {
    const reply = await fetch("./json/data.json");
    const productos = await reply.json()


    // LLAMAR SHOP

    productos.forEach((el) => { 
      
      // SUMA IVA
        el.precio = parseInt(el.precio*1.21);

        // CREAR SHOP
        let productoShop = document.createElement("div");
        productoShop.className = "cards"
        productoShop.innerHTML = `
 <img src="${
            el.img
        }">
 <p class="textito">${
            el.marca
        } $${
            el.precio
        }</p>
 `
        shop.append(productoShop);

        // COMPRAR
        let comprar = document.createElement("button");
        comprar.innerText = "comprar";

        productoShop.append(comprar);

        comprar.addEventListener("click", () => {
          
          // busca un producto para no repetirlo //

// let found = el.modelo;
// console.log (found)
// const elementoCarrito = carrito.find((el)=> el.modelo === found);
// console.log (elementoCarrito)
// if (elementoCarrito){
//   elementoCarrito.cantidad ++;
//   elementoCarrito.precio = el.precio*elementoCarrito.cantidad;
//   abrirCarrito();

//   console.log (elementoCarrito)
//   compra("listaProductos", JSON.stringify(carrito));

// }else {
  carrito.push({
    marca: el.marca,
    precio: el.precio,
    img: el.img,
    genero: el.genero,
    modelo: el.modelo,
    cantidad:1
})
abrirCarrito();
console.log ("no encontrado")
compra("listaProductos", JSON.stringify(carrito));
// }

          
        })
    })
} 
recovery();


// CARRITO

let carritoBoton = document.getElementById("carritoBoton");
let carritoContent = document.getElementById("carritoContent");

carritoBoton.addEventListener("click", abrirCarrito);

function abrirCarrito() {

  carritoContent.style.display = "block"

    let carritoCerrar = document.createElement("div")
    carritoContent.className = "carritoCerrar"
    carritoContent.append(carritoCerrar)
    carritoCerrar.innerHTML = 'x'

    carritoCerrar.addEventListener("click", cerrar)

let container = document.createElement("div")
container.className = "carritoContainer"
carritoContent.append(container)
    carrito.forEach((el) => {

        let carritoContentP = document.createElement("div");
        carritoContentP.className = "carritoProducto";

        carritoContentP.innerHTML = `
    <img src="${
            el.img
        }">
    <p class="textito">${
            el.marca
        } $${
            el.precio
        }
    ${
            el.genero
        }
    ${
            el.modelo
        }</p>
    `

        container.append(carritoContentP);

        let borrar = document.createElement("button");
        borrar.innerText = "X";

        carritoContentP.appendChild(borrar);

        borrar.addEventListener("click", eliminar(el));

    })



    let finalizarBoton = document.createElement("div");
    carritoContent.append(finalizarBoton);
    finalizarBoton.innerHTML = '<a href="./pages/checkout.html"><button> Finalizar </button></a>';

    cantidadProductos.innerText = (carrito.length);

    compra("listaProductos", JSON.stringify(carrito));

    console.log (carrito);

}

function eliminar (producto){
let filter = carrito.filter((el)=> el.nombre != producto.nombre)
carrito = filter
abrirCarrito()
cantidadProductos.innerText = (carrito.length)
};

// CANTIDAD DE PRODUCTOS EN CARRITO

let cantidadProductos = document.getElementById("cantidadProductos")
cantidadProductos.innerText = (carrito.length)

// SUBMIT EN FORMS

let form = document.getElementById("form");
form.addEventListener("click", validar);

function validar(e) {
    let email = document.getElementById("email");
    if (email.value == "") {
        let cajita = document.createElement("div");
        cajita.className = "cajita";


        cajita.innerText = "no completo";
        form.append(cajita);
        e.preventDefault();
    } else {
        e.preventDefault();
    }
}


// funcion cerrar//

function cerrar(){
  carritoContent.style.display = "none"
}