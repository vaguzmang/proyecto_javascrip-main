import { fetchProducts } from './api.js';
import { initCart } from './cart.js';
import { initReports } from './ui.js';

fetchProducts();
initCart();
initReports();
