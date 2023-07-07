// Funzione per fetch dei prodotti
function fetchProducts() {
  fetch('https://striveschool-api.herokuapp.com/api/product/', {
    headers: {
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NGE3YjM4YjEyYjUwYzAwMTQ5ZTRlZWEiLCJpYXQiOjE2ODg3MzEyNzQsImV4cCI6MTY4OTk0MDg3NH0.9NLl1-KiEg58sQ_CfnMT-8t-BdQYZGsgJW8YVii4ibA'
    }
  })
  .then(response => response.json())
  .then(data => {
    const productList = document.getElementById('productList');
    productList.innerHTML = '';

    data.forEach(product => {
      const { _id, name, description, brand, imageUrl, price } = product;

      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${name}</td>
        <td>${description}</td>
        <td>${brand}</td>
        <td><img src="${imageUrl}" alt="${name}" style="max-height: 50px;"></td>
        <td>${price}</td>
        <td>
          <button class="btn btn-primary btn-sm editBtn" data-id="${_id}">Modifica</button>
          <button class="btn btn-danger btn-sm deleteBtn" data-id="${_id}">Elimina</button>
        </td>
      `;

      productList.appendChild(row);
    });

    // Aggiungi event listener per i pulsanti di modifica
    const editBtns = document.querySelectorAll('.editBtn');
    editBtns.forEach(btn => btn.addEventListener('click', editProduct));

    // Aggiungi event listener per i pulsanti di eliminazione
    const deleteBtns = document.querySelectorAll('.deleteBtn');
    deleteBtns.forEach(btn => btn.addEventListener('click', deleteProduct));
  })
  .catch(error => console.log(error));
}

// Funzione per creare un nuovo prodotto
function createProduct(event) {
  event.preventDefault();

  const name = document.getElementById('name').value;
  const description = document.getElementById('description').value;
  const brand = document.getElementById('brand').value;
  const imageUrl = document.getElementById('imageUrl').value;
  const price = document.getElementById('price').value;

  const payload = {
    name,
    description,
    brand,
    imageUrl,
    price
  };

  fetch('https://striveschool-api.herokuapp.com/api/product/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NGE3YjM4YjEyYjUwYzAwMTQ5ZTRlZWEiLCJpYXQiOjE2ODg3MzEyNzQsImV4cCI6MTY4OTk0MDg3NH0.9NLl1-KiEg58sQ_CfnMT-8t-BdQYZGsgJW8YVii4ibA'
    },
    body: JSON.stringify(payload)
  })
  .then(response => response.json())
  .then(data => {
    console.log('Prodotto creato:', data);
    document.getElementById('productForm').reset();
    fetchProducts();
  })
  .catch(error => console.log(error));
}

// Funzione per eliminare un prodotto
function deleteProduct(event) {
  const productId = event.target.dataset.id;

  fetch(`https://striveschool-api.herokuapp.com/api/product/${productId}`, {
    method: 'DELETE',
    headers: {
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NGE3YjM4YjEyYjUwYzAwMTQ5ZTRlZWEiLCJpYXQiOjE2ODg3MzEyNzQsImV4cCI6MTY4OTk0MDg3NH0.9NLl1-KiEg58sQ_CfnMT-8t-BdQYZGsgJW8YVii4ibA'
    }
  })
  .then(response => {
    console.log('Prodotto eliminato:', productId);
    fetchProducts();
  })
  .catch(error => console.log(error));
}

// Funzione per modificare un prodotto
function editProduct(event) {
  const productId = event.target.dataset.id;

  // Implementa qui la logica per modificare un prodotto
  console.log('Modifica prodotto:', productId);
}

// Event listener per il submit del form
document.getElementById('productForm').addEventListener('submit', createProduct);

// Event listener per il pulsante di reset
document.getElementById('resetBtn').addEventListener('click', function() {
  document.getElementById('productForm').reset();
});

// Recupera i prodotti al caricamento della pagina
fetchProducts();
