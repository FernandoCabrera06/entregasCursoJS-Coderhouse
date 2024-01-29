const listaProductosSugeridos = document.querySelector(
  ".card-sugeridos-carrito"
);

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

/* ------- recibe los datos y renderiza ------- */
const renderListProducts = (list) => {
  if (list.length > 0) {
    listaProductosSugeridos.innerHTML = "";
    list.forEach((product) => {
      listaProductosSugeridos.innerHTML += `<div class="card-sugerida">
            <img src="${product.img}" />
            <p>
              ${product.description}
            </p>
            <h2>$${product.price}</h2>
            <div>
              <a id="${product.id}" class="btn-agregar-al-carrito" onclick="swalSuccess()" type="button">Agregar al carrito</a>
            </div>
          </div>`;
    });

    /* -------------- Agrege el escuchador de eventos a los botones ------------- */
    const btns = document.querySelectorAll(".btn-agregar-al-carrito");
    btns.forEach((btn) => {
      btn.addEventListener("click", agregarAlCarrito);
    });
  } else {
    listaProductosCatalogo.innerHTML = `<h2>¡No se encontraron productos disponibles!</h2>`;
  }
};

const agregarAlCarrito = (e) => {
  const id = e.target.id;
  const product = products.find((item) => item.id == id);

  carrito.agregarAlCarrito(product);
  contadorCarrito.innerText = carrito.getCount();
  carrito.getCount() == 1 && location.reload();
};

renderListProducts(products.filter((item) => item.suggested));
