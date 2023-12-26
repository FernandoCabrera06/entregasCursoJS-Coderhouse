/* 
    Calculadora de impuestos sobre 3 productos.

    - Ingresar 3 productos.
    - Validar nombre y precio de los productos.
    - Hacer sumatoria de todo los productos ingresados.
    - Calcular y acumular descuentos si hay.
    - Aplicar impuestos y sumar al total.
    - Mostrar resultados.
*/

//------------- Constantes de impuestos y descuentos ---------------
const IVA = 21;
const DESCUENTO = 15;

//------------------- Funciones -------------------
function validarNombreProducto(producto) {
  return producto != "" && producto.length >= 3;
}

function validarPrecio(precio) {
  return !isNaN(precio) && precio > 0;
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

// ------------------- Inicializo variables -------------------
let preciosAcumulados = 0;
let descuentosAcumulados = 0;
let listadoProductos = "*****Listado de productos*****\n\n";

// ------------------- Ingreso y validación de datos -------------------
for (let cantidadProductos = 0; cantidadProductos <= 2; cantidadProductos++) {
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

  while (!validarPrecio(precio)) {
    precio = prompt(
      "⚠️ Precio Incorrecto, Ingrese Precio " + nombreProducto + ":"
    );
  }

  tieneDescuento = prompt(nombreProducto + " tiene descuento?  SI/NO:");
  if (comprobarDescuentos(tieneDescuento))
    descuentosAcumulados = descuentosAcumulados + calcularDescuentos(precio);

  preciosAcumulados = preciosAcumulados + parseFloat(precio);

  if (comprobarDescuentos(tieneDescuento)) {
    listadoProductos =
      listadoProductos +
      nombreProducto +
      " $" +
      precio +
      " (*producto con descuento)\n";
  } else {
    listadoProductos = listadoProductos + nombreProducto + " $" + precio + "\n";
  }
}

let impuestosSobreElTotal = calcularIVA(preciosAcumulados);

// -------------------  Mostrar resultados -------------------
alert(
  listadoProductos +
    "\nTotal en productos : $" +
    preciosAcumulados +
    "\n" +
    "Descuentos : $" +
    descuentosAcumulados +
    "\n" +
    "Impuestos sobre el total : $" +
    impuestosSobreElTotal +
    "\n---------------------\nTotal a pagar: $" +
    (preciosAcumulados - descuentosAcumulados + impuestosSobreElTotal)
);
