// public/js/categories.js

const apiUrl = 'http://localhost:3000/api/categories';

async function loadCategories() {
  const res = await fetch(apiUrl);
  const categories = await res.json();
  const tbody = document.querySelector('#categoriesTable tbody');
  tbody.innerHTML = '';

  categories.forEach(cat => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${cat.name}</td>
      <td>
        <button onclick="editCategory('${cat._id}', '${cat.name}')">Edit</button>
        <button onclick="deleteCategory('${cat._id}')">Delete</button>
      </td>
    `;
    tbody.appendChild(tr);
  });
}

function editCategory(id, name) {
  document.getElementById('categoryId').value = id;
  document.getElementById('categoryName').value = name;
}

async function saveCategory() {
  const id = document.getElementById('categoryId').value;
  const name = document.getElementById('categoryName').value;
  if (!name) return alert('Enter category name');

  if (id) {
    // Update
    await fetch(`${apiUrl}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name })
    });
  } else {
    // Create
    await fetch(apiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name })
    });
  }

  document.getElementById('categoryId').value = '';
  document.getElementById('categoryName').value = '';
  loadCategories();
}

async function deleteCategory(id) {
  if (!confirm('Are you sure?')) return;
  await fetch(`${apiUrl}/${id}`, { method: 'DELETE' });
  loadCategories();
}
