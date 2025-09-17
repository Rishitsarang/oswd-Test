// public/js/products.js

const apiCategories = 'http://localhost:3000/api/categories';
const apiProducts = 'http://localhost:3000/api/products';

async function loadCategories() {
  const res = await fetch(apiCategories);
  const categories = await res.json();
  const select = document.getElementById('productCategory');
  select.innerHTML = '';
  categories.forEach(cat => {
    const option = document.createElement('option');
    option.value = cat._id;
    option.textContent = cat.name;
    select.appendChild(option);
  });
}

async function loadProducts() {
  const res = await fetch(apiProducts);
  const products = await res.json();
  const tbody = document.querySelector('#productsTable tbody');
  tbody.innerHTML = '';

  products.forEach(prod => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${prod.name}</td>
      <td>${prod.price}</td>
      <td>${prod.category ? prod.category.name : ''}</td>
      <td>
        <button onclick="editProduct('${prod._id}', '${prod.name}', ${prod.price}, '${prod.category ? prod.category._id : ''}')">Edit</button>
        <button onclick="deleteProduct('${prod._id}')">Delete</button>
      </td>
    `;
    tbody.appendChild(tr);
  });
}

function editProduct(id, name, price, categoryId) {
  document.getElementById('productId').value = id;
  document.getElementById('productName').value = name;
  document.getElementById('productPrice').value = price;
  document.getElementById('productCategory').value = categoryId;
}

async function saveProduct() {
  const id = document.getElementById('productId').value;
  const name = document.getElementById('productName').value;
  const price = document.getElementById('productPrice').value;
  const category = document.getElementById('productCategory').value;

  if (!name || !price || !category) return alert('Fill all fields');

  if (id) {
    // Update
    await fetch(`${apiProducts}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, price, category })
    });
  } else {
    // Create
    await fetch(apiProducts, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, price, category })
    });
  }

  document.getElementById('productId').value = '';
  document.getElementById('productName').value = '';
  document.getElementById('productPrice').value = '';
  loadProducts();
}

async function deleteProduct(id) {
  if (!confirm('Are you sure?')) return;
  await fetch(`${apiProducts}/${id}`, { method: 'DELETE' });
  loadProducts();
}
