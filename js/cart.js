import { showToast } from './ui.js';

let cart=JSON.parse(localStorage.getItem('cart'))||{};
let purchases=JSON.parse(localStorage.getItem('purchases'))||[];
const items=document.getElementById('cartItems');
const totalEl=document.getElementById('cartTotal');
const countEl=document.getElementById('cartCount');

document.getElementById('cartButton').onclick=()=>document.body.classList.add('cart-open');
document.getElementById('closeCart').onclick=()=>document.body.classList.remove('cart-open');
document.getElementById('overlay').onclick=()=>document.body.classList.remove('cart-open');

document.getElementById('checkoutButton').onclick=()=>{
  if(Object.keys(cart).length===0){
    showToast('El carrito está vacío', 'warning');
    return;
  }
  
  // Guardar compras
  Object.values(cart).forEach(p=>{
    const existing=purchases.find(purchase=>purchase.id===p.id);
    if(existing){
      existing.qty+=p.qty;
    }else{
      purchases.push({id:p.id,title:p.title,qty:p.qty,price:p.price});
    }
  });
  localStorage.setItem('purchases',JSON.stringify(purchases));
  
  cart={};
  save();
  renderCart();
  document.body.classList.remove('cart-open');
  showToast('Compra realizada con éxito. Tus productos llegarán a tu domicilio.', 'success');
};

export function initCart(){renderCart()}

export function addToCart(p){
  cart[p.id]=cart[p.id]?{...cart[p.id],qty:cart[p.id].qty+1}:{...p,qty:1};
  save();renderCart();
  showToast('Producto agregado al carrito','success');
}

function renderCart(){
  items.innerHTML='';
  let total=0,qty=0;

  Object.values(cart).forEach(p=>{
    total+=p.price*p.qty;
    qty+=p.qty;
    const d=document.createElement('div');
    d.className='cart-item';
    d.innerHTML=`
      <span>${p.title}</span>
      <span>${p.qty}</span>
      <span>$ ${(p.price*p.qty*4200).toLocaleString('es-CO')} COP</span>
    `;
    items.appendChild(d);
  });

  totalEl.textContent=`Total: $ ${ (total*4200).toLocaleString('es-CO') } COP`;
  countEl.textContent=`${Object.keys(cart).length} / ${qty}`;
}

function save(){localStorage.setItem('cart',JSON.stringify(cart))}

export function getPurchases(){
  return purchases.sort((a,b)=>b.qty-a.qty);
}
