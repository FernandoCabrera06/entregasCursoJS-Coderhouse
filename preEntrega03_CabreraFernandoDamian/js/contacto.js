const contadorCarrito = document.querySelector("#contadorCarrito");
const carritoHTML = document.querySelector("#carrito");
const listaCarrito = JSON.parse(localStorage.getItem("carrito")) || [];

const carrito = new Carrito(listaCarrito);
if (carrito.getCount()) {
  contadorCarrito.innerText = carrito.getCount();
} else {
  contadorCarrito.remove();
  carritoHTML.style.marginTop = 0;
}
