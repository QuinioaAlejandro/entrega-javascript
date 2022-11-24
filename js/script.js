// BASICO 
const compra = (clave, valor) => localStorage.setItem(clave, valor);
let carrito = JSON.parse(localStorage.getItem("listaProductos")) || [];

// OBJETOS Y ARRAYS //

class Zapatillas{
constructor(precio, marca, modelo, genero, img){
this.precio = precio;
this.marca = marca;
this.modelo = modelo;
this.genero = genero;
this.img = img;
}
SumaIva() {
  this.precio + this.precio * 1.21;
  console.log(this.precio);
}
}

const productos = [];

productos.push (new Zapatillas(57199, "nike", "Air Force 1", "hombre", "./img/adidas.jpeg"));
productos.push (new Zapatillas(20999, "le cost sportif", "r1000", "mujer", "./img/le coq sportif 2.jpeg"));
productos.push (new Zapatillas(28799, "Adidas", "multix", "hombre", "./img/adidas.jpeg"));
productos.push (new Zapatillas(35699, "puma", "rs-fast limiter", "mujer", "./img/puma.jpeg"));
productos.push (new Zapatillas(57199, "nike", "airmax 90", "hombre", "./img/nike2.jpeg"));
productos.push (new Zapatillas(21499, "Converse", "chuk taylor all star ox", "mujer", "./img/converse.jpeg"));
productos.push (new Zapatillas(30800, "Converse", "chuk taylor all star lift hi", "mujer", "./img/converse2.jpeg"));
productos.push (new Zapatillas(24199, "Fila", "rush", "mujer", "./img/fila.jpeg"));
productos.push (new Zapatillas(57199, "nike", "airmax 97 se", "hombre", "./img/nike air.jpeg"));
productos.push (new Zapatillas(20000, "le cost sportif", "lcs r850", "mujer", "./img/le coq sportif.jpeg"));


// LLAMAR SHOP

let shop = document.getElementById("ShopZapatillas");

productos.forEach((el) => {

  // SUMA IVA
  el.SumaIva();

  // CREAR SHOP
  let productoShop = document.createElement("div");
  productoShop.className = "cards"

 productoShop.innerHTML = `
 <img src="${el.img}">
 <p class="textito">${el.marca} $${el.precio}</p>
 `
shop.append(productoShop);

// COMPRAR 
let comprar = document.createElement("button");
comprar.innerText = "comprar";

productoShop.append(comprar);

comprar.addEventListener("click", () => {
  carrito.push({
    marca: el.marca,
    precio: el.precio,
    img: el.img,
    genero: el.genero,
    modelo: el.modelo
  })
  abrirCarrito();

 
})

})

// CARRITO 

let carritoBoton = document.getElementById("carritoBoton");
let carritoContent = document.getElementById("carritoContent");

carritoBoton.addEventListener("click", abrirCarrito);

function abrirCarrito() {
  carrito.forEach((el) => {

    let carritoContentP = document.createElement("div");
    carritoContentP.className = "carritoProducto";

    carritoContentP.innerHTML = `
    <img src="${el.img}">
    <p class="textito">${el.marca} $${el.precio}
    ${el.genero}
    ${el.modelo}</p>
    `

    carritoContent.append(carritoContentP);

    let borrar = document.createElement("button");
    borrar.innerText = "X";

    carritoContentP.appendChild(borrar);

    borrar.addEventListener("click", eliminar);

  })

  let finalizarBoton = document.createElement("div");
  carritoContent.append(finalizarBoton);
  finalizarBoton.innerHTML = '<a href="./pages/checkout.html"><button> Finalizar </button></a>';

  cantidadProductos.innerText = (carrito.length)

  compra("listaProductos", JSON.stringify(carrito))

  
}

const eliminar = () => {
  const found = carrito.find((el) => el.nombre);
  carrito = carrito.filter((carritoId) => {
    return carritoId != found;
    abrirCarrito();
  });

};

// CANTIDAD DE PRODUCTOS EN CARRITO

let cantidadProductos = document.getElementById("cantidadProductos")
cantidadProductos.innerText = (carrito.length)

// SUBMIT EN FORMS 

let form = document.getElementById("form");
form.addEventListener("click", validar);

function validar (e) {
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