# makavavi

**makavavi** es una aplicación web tipo tienda virtual desarrollada con **HTML, CSS y JavaScript puro**.  
Consume la API pública **FakeStore API** para mostrar productos de forma dinámica y permite al usuario
buscar, filtrar, ordenar y simular una compra mediante un carrito con persistencia en `localStorage`.

El proyecto está enfocado en demostrar dominio de JavaScript, manipulación del DOM, consumo de APIs,
manejo de eventos y buenas prácticas de organización del código, sin el uso de frameworks o librerías externas.

---

## 🚀 Funcionalidades principales

- Consumo de API pública con `fetch`
- Renderizado dinámico de productos en el DOM
- Buscador por nombre y descripción
- Filtro por múltiples categorías
- Ordenamiento por nombre y precio (ascendente y descendente)
- Carrito de compras lateral siempre accesible
- Manejo de cantidades por producto
- Cálculo de subtotales y total general
- Persistencia del carrito usando `localStorage`
- Simulación de compra con mensaje de confirmación
- Interfaz completamente en español
- Precios mostrados en pesos colombianos (COP)
- Diseño responsive para móvil, tablet y escritorio
- Feedback visual con loaders y mensajes (toasts)

---

## 🛠 Tecnologías utilizadas

- HTML5
- CSS3
- JavaScript (ES Modules)
- FakeStore API

---

## ▶️ Ejecución del proyecto

1. Clona o descarga el repositorio.
2. Abre el archivo `index.html` en tu navegador.
3. No requiere instalación de dependencias ni servidor adicional.

---

## 📂 Estructura del proyecto

proyecto_javascript/
│
├── index.html
├── css/
│ └── styles.css
├── js/
│ ├── main.js
│ ├── api.js
│ ├── ui.js
│ └── cart.js
├── README.md
└── analisis.md


******************************************************************************
🔹 1. Reset global de estilos
*{
  margin:0;
  padding:0;
  box-sizing:border-box;
  font-family:Arial
}

🧠 Qué hace

* selecciona TODOS los elementos HTML

Elimina márgenes y rellenos por defecto del navegador

Establece un modelo de caja consistente

Define una fuente global

📌 Por qué es importante

Evita comportamientos distintos entre navegadores

Hace que los tamaños sean predecibles

🧩 Concepto clave
box-sizing: border-box


👉 El ancho y alto incluyen padding y borde
👉 Evita cálculos manuales

🔹 2. Estilo base del body
body{
  background-color:whitesmoke
}

🧠 Qué hace

Cambia el color de fondo general de la página

📌 Por qué

Mejora contraste

Permite que las tarjetas blancas resalten

🔹 3. Encabezado principal (.header)
.header{
  background-color:steelblue;
  color:white;
  padding:1rem;
  display:flex;
  justify-content:space-between;
  align-items:center;
}

🧠 Qué hace paso a paso

Fondo azul

Texto blanco

Espaciado interno

Usa Flexbox

Separa elementos a los extremos

Centra verticalmente

📌 Resultado visual

📦 Logo a la izquierda
🛒 Botón del carrito a la derecha

🔹 4. Botón del carrito
#cartButton{
  font-size:1.4rem;
  background:none;
  border:none;
  color:white;
  cursor:pointer;
}

🧠 Qué hace

Aumenta tamaño del ícono/texto

Elimina fondo y borde

Cambia el cursor a “mano”

📌 Por qué

Hace que parezca un ícono interactivo

Mejora la experiencia de usuario

🔹 5. Controles de búsqueda y filtros
.controls{
  display:flex;
  gap:.5rem;
  padding:1rem;
  background-color:white;
}

🧠 Qué hace

Coloca los controles en fila

Espacio entre ellos

Fondo blanco separado del body

.controls input,.controls select{
  padding:.5rem;
}

🧠 Qué hace

Aplica padding a inputs y selects

Mejora legibilidad y clicabilidad

🔹 6. Contenedor de productos (Grid)
.products{
  display:grid;
  grid-template-columns:repeat(auto-fill,minmax(220px,1fr));
  gap:1rem;
  padding:1rem;
}

🧠 Qué hace

Usa CSS Grid

Crea columnas automáticas

Cada tarjeta mide mínimo 220px

Se adapta al ancho del dispositivo

📌 Responsive real

👉 Este es el núcleo del responsive
👉 Funciona en:

móvil

tablet

desktop

🔹 7. Tarjeta de producto
.product-card{
  background-color:white;
  padding:1rem;
  border-radius:8px;
  transition:transform .2s ease;
}

🧠 Qué hace

Fondo blanco

Bordes redondeados

Animación suave al transformarse

.product-card:hover{
  transform:scale(1.02)
}

🧠 Qué hace

Aumenta ligeramente el tamaño al pasar el mouse

Feedback visual

.product-card img{
  width:100%;
  height:150px;
  object-fit:contain
}

🧠 Qué hace

Imagen ocupa todo el ancho

Altura fija

Mantiene proporciones

🔹 8. Botón “Agregar al carrito”
.product-card button{
  margin-top:.5rem;
  background-color:steelblue;
  color:white;
  border:none;
  padding:.5rem;
  cursor:pointer;
}

🧠 Qué hace

Separación del contenido

Botón visible y clicable

Misma identidad visual del header

🔹 9. Loader (cargando)
.loader{
  display:none;
  text-align:center;
  padding:1rem;
  font-weight:bold
}

🧠 Qué hace

Oculta el loader por defecto

Lo centra y resalta el texto

.loader.active{
  display:block
}

🧠 Qué hace

Cuando JS agrega la clase active, aparece

📌 Interacción CSS + JS

🔹 10. Contenedor de notificaciones (toast)
#toastContainer{
  position:fixed;
  top:1rem;
  left:1rem;
  z-index:2000;
}

🧠 Qué hace

Posición fija

Siempre visible

Encima de todo

.toast{
  padding:.75rem;
  color:white;
  margin-bottom:.5rem;
  border-radius:5px
}

🧠 Qué hace

Estilo base de mensajes

.toast-success{background-color:green}
.toast-error{background-color:crimson}
.toast-warning{background-color:orange}

🧠 Qué hace

Colores según tipo de mensaje

Feedback visual inmediato

🔹 11. Carrito lateral (off-canvas)
.cart{
  position:fixed;
  right:-420px;
  top:0;
  width:380px;
  height:100%;
  background:white;
  padding:1rem;
  transition:right .3s ease;
  z-index:1500;
}

🧠 Qué hace

Carrito oculto fuera de pantalla

Altura completa

Animación al entrar

body.cart-open .cart{
  right:0
}

🧠 Qué hace

Cuando JS agrega cart-open al body

El carrito se desliza hacia dentro

📌 CSS controlado por JS

🔹 12. Overlay (fondo oscuro)
#overlay{
  position:fixed;
  inset:0;
  background:rgba(0,0,0,.4);
  display:none;
}

🧠 Qué hace

Cubre toda la pantalla

Oscurece el fondo

Evita clics atrás

body.cart-open #overlay{
  display:block
}

🧠 Qué hace

Se activa junto con el carrito

🔹 13. Ítems del carrito
.cart-item{
  display:grid;
  grid-template-columns:1fr auto auto;
  gap:.5rem;
  margin-bottom:.5rem;
}

🧠 Qué hace

Organiza:

nombre

cantidad

precio

Distribución limpia y clara