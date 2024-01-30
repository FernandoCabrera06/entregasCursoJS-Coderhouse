class Carrito {
  constructor(list = []) {
    this.carrito = list;
  }

  agregarAlCarrito({ id, img, description, price }) {
    // Busco si existe el producto
    const index = this.carrito.findIndex((product) => product.id == id);
    if (index == -1) {
      this.carrito.push({ id, img, description, price, units: 1 });
    } else {
      // Ya esta en el carrito entonces incremento la cantidad'
      this.carrito[index].units += 1;
    }
    localStorage.setItem("carrito", JSON.stringify(this.carrito));
  }

  quitarAlCarrito({ id, img, description, price }) {
    // Busco si existe el producto
    const index = this.carrito.findIndex((product) => product.id == id);
    if (index != -1) {
      if (this.carrito[index].units > 1) {
        this.carrito[index].units -= 1;
      } else {
        this.carrito.splice(index, 1);
      }
    }
    localStorage.setItem("carrito", JSON.stringify(this.carrito));
  }

  productosCarrito() {
    return this.carrito;
  }

  contarUnidades() {
    const count = this.carrito.reduce((cant, product) => {
      return cant + product.units;
    }, 0);
    return count;
  }

  sumatoriaTotalCarrito() {
    return this.carrito.reduce((acum, product) => {
      return acum + product.units * product.price;
    }, 0);
  }

  vaciarCarrito({ id, description, price }) {
    this.carrito = [];
    localStorage.setItem("carrito", JSON.stringify(this.carrito));
    location.reload();
  }
}
