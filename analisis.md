## Análisis técnico del proyecto – makavavi

El proyecto **makavavi** fue diseñado como una aplicación web modular, clara y mantenible,
siguiendo principios de separación de responsabilidades y buenas prácticas en JavaScript.

---

## Arquitectura y organización

La aplicación se divide en módulos JavaScript independientes:

- **main.js**  
  Punto de entrada de la aplicación. Inicializa el consumo de la API y el carrito.

- **api.js**  
  Responsable del consumo de la FakeStore API, manejo de asincronía y control de errores.

- **ui.js**  
  Gestiona el renderizado del DOM, filtros, búsqueda, ordenamientos, loader y mensajes visuales.
  También se encarga de la capa de presentación, traduciendo textos al español sin modificar
  los datos originales de la API.

- **cart.js**  
  Maneja toda la lógica del carrito de compras: agregar productos, cantidades, cálculos,
  persistencia en `localStorage` y simulación del proceso de compra.

Esta separación permite que el código sea más legible, escalable y fácil de mantener.

---

## Manejo de datos

- Los productos se obtienen desde una API externa en formato JSON.
- El carrito se representa como un objeto JavaScript donde cada clave corresponde al ID del producto.
- Se almacenan:
  - ID del producto
  - Nombre
  - Precio unitario
  - Cantidad
- El estado del carrito se guarda en `localStorage` para mantener la información entre recargas.

---

## Filtros y ordenamientos

Se implementaron filtros combinables para mejorar la experiencia del usuario:
- Búsqueda por texto (nombre y descripción)
- Filtro por categoría
- Ordenamiento por:
  - Nombre (A–Z y Z–A)
  - Precio (ascendente y descendente)

Todos los filtros se aplican dinámicamente sin recargar la página.

---

## Experiencia de usuario (UX/UI)

- Diseño responsive adaptable a distintos tamaños de pantalla.
- Carrito lateral fijo con contador visible en todo momento.
- Loader parcial mientras se cargan los productos.
- Mensajes visuales de confirmación, error y advertencia.
- Flujo completo de compra simulado hasta el mensaje final de éxito.

---


*************************************************
📌 main.js — Bootstrap de la aplicación
🎯 Responsabilidad

Inicializar la aplicación y orquestar los módulos.

🚫 No debe hacer

Manipular DOM

Lógica de negocio

Llamadas a API

🧩 Contenido típico
import { fetchProducts } from './api.js';
import { initCart } from './cart.js';

fetchProducts();
initCart();

🔄 Flujo

Se carga el archivo

Se inicializa la carga de productos

Se inicializa el estado del carrito

➕ Cómo extender

Agregar nuevas inicializaciones

Ejemplo: initAuth(), initReports()

📌 api.js — Capa de datos
🎯 Responsabilidad

Obtener datos desde servicios externos.

🚫 No debe hacer

Renderizar HTML

Manejar estado global

Guardar datos

🔌 Dependencias

Importa funciones visuales desde ui.js para feedback.

🧩 Función pública
export async function fetchProducts()

🧠 Flujo interno

Muestra loader

Llama a la API

Convierte respuesta a JSON

Envía datos a UI

Maneja errores

Oculta loader

➕ Cómo extender

Agregar nuevas funciones de API

Ejemplo:

export async function fetchCategories() {}

📌 ui.js — Capa de presentación
🎯 Responsabilidad

Renderizar elementos y mostrar feedback visual.

🚫 No debe hacer

Llamadas a API

Persistencia de datos

Lógica de negocio

🧩 Funciones públicas

renderProducts(products)

showLoader()

hideLoader()

showToast(message, type)

initFilters(products)

🔄 Flujo típico

Recibe datos

Genera HTML dinámico

Aplica clases CSS

Actualiza el DOM

➕ Cómo extender

Nuevos renders (ej. renderReports)

Nuevos mensajes UI

📌 cart.js — Dominio del carrito
🎯 Responsabilidad

Gestionar productos seleccionados y su estado.

🚫 No debe hacer

Llamar APIs

Dibujar productos

Manejar autenticación

🧠 Estado interno
let cart = {}


Persistido en localStorage.

🧩 Funciones públicas

initCart()

addToCart(product)

🔄 Flujo típico

Se agrega producto

Se actualiza cantidad

Se recalculan totales

Se guarda estado

Se renderiza carrito

➕ Cómo extender

Descuentos

IVA

Historial de compras

🔗 Comunicación entre módulos
Origen	Destino	Motivo
main.js	api.js	Inicialización
api.js	ui.js	Mostrar datos
ui.js	cart.js	Acciones del usuario
cart.js	ui.js	Renderizado

📌 Comunicación siempre mediante imports/exports
📌 No acceder directamente a variables internas




+++++++++++++++++++++++++++++++++++++++++++++++++++++
HERRAMEINTAS

HERRAMIENTA A — LOGIN BÁSICO

Qué hace:
Guarda el usuario actual que está usando la aplicación.

Archivo a modificar:
main.js

/* ================================
   HERRAMIENTA: LOGIN BÁSICO
   Archivo: main.js
   ================================ */

// Escucha el botón de login (si existe)
document.getElementById('loginBtn')?.addEventListener('click', () => {

  // Se crea el objeto usuario
  const user = {
    name: document.getElementById('loginName').value,
    date: new Date().toLocaleString()
  };

  // Se guarda el usuario activo
  localStorage.setItem('currentUser', JSON.stringify(user));
});

🧩 HERRAMIENTA B — REGISTRO DE COMPRA

Qué hace:
Guarda cada compra realizada con fecha y valor total.

Archivo a modificar:
cart.js

/* ================================
   HERRAMIENTA: REGISTRO DE COMPRA
   Archivo: cart.js
   ================================ */

function saveSale(total) {

  // Objeto que representa una venta
  const sale = {
    date: new Date().toLocaleString(),
    total: total
  };

  // Se obtiene el historial o se crea vacío
  const sales = JSON.parse(localStorage.getItem('sales')) || [];

  // Se agrega la venta
  sales.push(sale);

  // Se guarda el historial actualizado
  localStorage.setItem('sales', JSON.stringify(sales));
}


Uso (una sola línea):

saveSale(total);

🧩 HERRAMIENTA C — INFORME GENERAL DE VENTAS

Qué hace:
Obtiene todas las ventas registradas.

Archivo a modificar:
ui.js

/* ================================
   HERRAMIENTA: INFORME GENERAL
   Archivo: ui.js
   ================================ */

export function getSalesReport() {

  // Retorna las ventas o un arreglo vacío
  return JSON.parse(localStorage.getItem('sales')) || [];
}

🧩 HERRAMIENTA D — INFORME POR USUARIO

Qué hace:
Filtra las ventas por nombre de usuario.

Archivo a modificar:
ui.js

/* ================================
   HERRAMIENTA: INFORME POR USUARIO
   Archivo: ui.js
   ================================ */

export function getSalesByUser(userName) {

  const sales = JSON.parse(localStorage.getItem('sales')) || [];

  // Se filtran las ventas por usuario
  return sales.filter(sale => sale.user === userName);
}

🧩 HERRAMIENTA E — APLICACIÓN DE IVA

Qué hace:
Calcula el total con IVA incluido.

Archivo a modificar:
cart.js

/* ================================
   HERRAMIENTA: CÁLCULO DE IVA
   Archivo: cart.js
   ================================ */

function applyIVA(total) {

  const IVA = 0.19;

  // Retorna el total con IVA aplicado
  return total + (total * IVA);
}


Uso:

const totalFinal = applyIVA(total);

🧩 HERRAMIENTA F — COMPROBANTE DE COMPRA

Qué hace:
Muestra un comprobante simple de la compra.

Archivo a modificar:
cart.js

/* ================================
   HERRAMIENTA: COMPROBANTE
   Archivo: cart.js
   ================================ */

function showReceipt(total) {

  alert(`
    COMPRA REALIZADA
    Fecha: ${new Date().toLocaleString()}
    Total: ${total}
  `);
}