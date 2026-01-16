import { renderProducts, showLoader, hideLoader, showToast, initFilters } from './ui.js';

const API='https://fakestoreapi.com/products';

export async function fetchProducts(){
  showLoader();
  try{
    const res=await fetch(API);
    const data=await res.json();
    initFilters(data);
    renderProducts(data);
    showToast('Productos cargados correctamente', 'success');
  }catch{
    showToast('Error al cargar los productos', 'error');
  }finally{
    hideLoader();
  }
}
