const listaProductosCatalogo = document.querySelector("#catalogo-container");
const contadorCarrito = document.querySelector("#contadorCarrito");
const carritoHTML = document.querySelector("#carrito");

const listaCarrito = JSON.parse(localStorage.getItem("carrito")) || [];
const carrito = new Carrito(listaCarrito);

const params = new URLSearchParams(location.search);
const brand = params.get("brand");
const category = params.get("category");
console.log("url parameters: " + brand + " " + category);

if (carrito.getCount()) {
  contadorCarrito.innerText = carrito.getCount();
} else {
  contadorCarrito.remove();
  carritoHTML.style.marginTop = 0;
}

/* ------- recibe los datos y renderiza ------- */
const renderListProducts = (list) => {
  if (list.length > 0) {
    listaProductosCatalogo.innerHTML = "";
    list.forEach((product) => {
      listaProductosCatalogo.innerHTML += `<div class="card-catalogo">
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

if (brand) {
  const productos = products.filter((item) =>
    item.brand.toLocaleLowerCase().includes(brand.toLocaleLowerCase())
  );
  renderListProducts(productos);
}

if (category) {
  const productos = products.filter(
    (item) => item.category.toLocaleLowerCase() === category.toLocaleLowerCase()
  );
  renderListProducts(productos);
}

if (!brand && !category) renderListProducts(products);
