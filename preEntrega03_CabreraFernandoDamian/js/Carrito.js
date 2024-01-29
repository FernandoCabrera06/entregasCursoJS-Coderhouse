class Carrito {
  constructor(list = []) {
    this.carrito = list;
  }

  agregarAlCarrito({ id, description, price }) {
    // Busco si existe el producto
    const index = this.carrito.findIndex((product) => product.id == id);
    if (index == -1) {
      this.carrito.push({ id, description, price, units: 1 });
    } else {
      // Ya esta en el carrito entonces incremento la cantidad'
      this.carrito[index].units += 1;
    }

    localStorage.setItem("carrito", JSON.stringify(this.carrito));
  }

  getProducts() {
    return this.carrito;
  }

  getCount() {
    const count = this.carrito.reduce((cant, product) => {
      return cant + product.units;
    }, 0);
    return count;
  }

  getSum() {
    return this.carrito.reduce((acum, product) => {
      return acum + product.units * product.price;
    }, 0);
  }
}
