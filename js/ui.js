import { addToCart } from './cart.js';

const productsContainer=document.getElementById('productsContainer');
const loader=document.getElementById('loader');
const toastContainer=document.getElementById('toastContainer');
let allProducts=[];

const CATEGORY_ES={
  "electronics":"Electrónica",
  "jewelery":"Joyería",
  "men's clothing":"Ropa masculina",
  "women's clothing":"Ropa femenina"
};

export function showLoader(){loader.classList.add('active')}
export function hideLoader(){loader.classList.remove('active')}

export function showToast(msg,type){
  const d=document.createElement('div');
  d.className=`toast toast-${type}`;
  d.textContent=msg;
  toastContainer.appendChild(d);
  setTimeout(()=>d.remove(),3000);
}

export function initFilters(products){
  allProducts=products;
  const cats=[...new Set(products.map(p=>p.category))];
  const sel=document.getElementById('categoryFilter');

  cats.forEach(c=>{
    const o=document.createElement('option');
    o.value=c;
    o.textContent=CATEGORY_ES[c] || c;
    sel.appendChild(o);
  });

  document.getElementById('searchInput').oninput=applyFilters;
  sel.onchange=applyFilters;
  document.getElementById('sortFilter').onchange=applyFilters;
}

function applyFilters(){
  let f=[...allProducts];
  const s=document.getElementById('searchInput').value.toLowerCase();
  const c=document.getElementById('categoryFilter').value;
  const o=document.getElementById('sortFilter').value;

  if(s)f=f.filter(p=>p.title.toLowerCase().includes(s)||p.description.toLowerCase().includes(s));
  if(c!=='all')f=f.filter(p=>p.category===c);

  if(o==='az')f.sort((a,b)=>a.title.localeCompare(b.title));
  if(o==='za')f.sort((a,b)=>b.title.localeCompare(a.title));
  if(o==='price-asc')f.sort((a,b)=>a.price-b.price);
  if(o==='price-desc')f.sort((a,b)=>b.price-a.price);

  renderProducts(f);
}

export function renderProducts(products){
  productsContainer.innerHTML='';
  products.forEach(p=>{
    const card=document.createElement('article');
    card.className='product-card';
    card.innerHTML=`
      <img src="${p.image}">
      <h3>${p.title}</h3>
      <p>$ ${(p.price*4200).toLocaleString('es-CO')} COP</p>
      <button>Agregar al carrito</button>
    `;
    card.querySelector('button').onclick=()=>addToCart(p);
    productsContainer.appendChild(card);
  });
}
