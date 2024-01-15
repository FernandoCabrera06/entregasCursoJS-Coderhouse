/* 
    Calculadora de impuestos y descuentos de una lista de productos.

    - Ingresar cantidad de productos a cargar.
    - Validar nombre y precio de los productos.
    - Hacer sumatoria de todo los productos ingresados.
    - Calcular y acumular descuentos si hay.
    - Aplicar impuestos y sumar al total.
    - Mostrar resultados.
    - Cargar opciones de filtrado y busqueda.
*/

//------------- Constantes de impuestos y descuentos ---------------
const IVA = 21;
const DESCUENTO = 15;

//------------------- Funciones -------------------
function validarNombreProducto(producto) {
  return producto != "" && producto.length >= 3;
}

function validarNumero(numero) {
  return !isNaN(numero) && numero > 0;
}

function calcularIVA(monto) {
  return (IVA / 100) * monto;
}

function calcularDescuentos(monto) {
  return (DESCUENTO / 100) * monto;
}

function comprobarDescuentos(codigoIngresado) {
  return codigoIngresado.toUpperCase() == "SI";
}

function filtrarConDescuentos(listadoProductos) {
  return listadoProductos.filter((producto) => producto.discount);
}

function buscarPorId(listadoProductos, id) {
  let producto = listadoProductos.find(
    (producto) => producto.idProducto === parseInt(id)
  );
  console.log(producto);
  return producto;
}

function buscarPorNombre(listadoProductos, textoAbuscar) {
  return listadoProductos.filter((producto) =>
    producto.name.toLowerCase().includes(textoAbuscar.toLowerCase())
  );
}

// ------------------- Inicializo variables -------------------
let descuentosAcumulados = 0;
let listadoProductos = [];
let listado = "*****Listado de productos*****\n\n";

// ------------------- Ingreso y validación de datos -------------------

cantidadIngresada = prompt(
  "###### Calcular impuestos y descuentos de lista de productos ######\n\n" +
    "Ingrese cantidad de productos que quiere cargar: "
);
while (!validarNumero(cantidadIngresada)) {
  cantidadIngresada = prompt(
    "⚠️ El numero ingresado es Incorrecto! Ingrese otra cantidad: "
  );
}

// ------------------- Carga de productos al listado -------------------
for (
  let cantidadProductos = 0;
  cantidadProductos < cantidadIngresada;
  cantidadProductos++
) {
  nombreProducto = prompt(
    "Ingrese nombre de producto " + (cantidadProductos + 1) + ":"
  );

  while (!validarNombreProducto(nombreProducto)) {
    nombreProducto = prompt(
      "⚠️ Nombre Incorrecto, Ingrese nombre de producto " +
        (cantidadProductos + 1) +
        ":"
    );
  }

  precio = prompt("Ingrese precio " + nombreProducto + ":");

  while (!validarNumero(precio)) {
    precio = prompt(
      "⚠️ Precio Incorrecto, Ingrese Precio " + nombreProducto + ":"
    );
  }

  tieneDescuento = prompt(nombreProducto + " tiene descuento?  SI/NO:");
  if (comprobarDescuentos(tieneDescuento))
    descuentosAcumulados = descuentosAcumulados + calcularDescuentos(precio);

  // ------  Agrego Objeto al array de productos ---------

  listadoProductos.push({
    idProducto: listadoProductos.length + 1,
    name: nombreProducto,
    price: parseFloat(precio),
    discount: comprobarDescuentos(tieneDescuento),
  });
}

// -------------------  Mostrar resultados -------------------

listado = listadoProductos.map(
  (producto) =>
    (listado =
      producto.name +
      " $" +
      producto.price +
      (producto.discount ? " (*producto con descuento)\n" : "\n"))
);

let preciosAcumulados = listadoProductos.reduce(
  (acumulador, producto) => acumulador + producto.price,
  0
);

let impuestosSobreElTotal = calcularIVA(
  listadoProductos.reduce(
    (acumulador, producto) => acumulador + producto.price,
    0
  )
);

alert(
  listado +
    "\nTotal en productos : $" +
    preciosAcumulados.toFixed(2) +
    "\n" +
    "Descuentos : $" +
    descuentosAcumulados.toFixed(2) +
    "\n" +
    "Impuestos sobre el total : $" +
    impuestosSobreElTotal.toFixed(2) +
    "\n---------------------\nTotal a pagar: $" +
    (preciosAcumulados - descuentosAcumulados + impuestosSobreElTotal).toFixed(
      2
    ) +
    "\n"
);

let opcion = "";
while (opcion != 4) {
  opcion = prompt(
    "Ingrese una opcion: \n" +
      " [1] Filtrar listado a solo productos con descuento \n" +
      " [2] Buscar por id de producto\n" +
      " [3] Buscar por nombre de producto\n" +
      " [4] Salir"
  );

  switch (opcion) {
    case "1":
      alert(
        "Productos con descuentos: " +
          filtrarConDescuentos(listadoProductos).map(
            (producto) => producto.name
          ) +
          "\n"
      );
      break;
    case "2":
      let id = prompt("Ingrese el id del producto a buscar: ");
      let producto = buscarPorId(listadoProductos, id);
      alert(
        "producto para el id ingresado: " +
          producto.name +
          " $" +
          producto.price +
          "\n"
      );
      break;
    case "3":
      let textoAbuscar = prompt("Ingrese el id del producto a buscar: ");
      alert(
        "productos para el nombre ingresado: " +
          buscarPorNombre(listadoProductos, textoAbuscar).map(
            (producto) => producto.name + " $" + producto.price
          ) +
          "\n"
      );
      break;
    case "4":
      alert("Programa Finalizado!");
      break;
  }
}
