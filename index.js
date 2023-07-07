// Card dei prodotti
function generateProductCard(product) {
    const { _id, name, description, brand, imageUrl, price } = product;
  
    const card = document.createElement('div');
    card.classList.add('col-sm-6', 'col-md-6', 'mb-4');
  
    card.innerHTML = `
    <div id="cardProd" class="card bg-danger product-card h-100">
    <div class="row g-0">
      <div class="col-md-4">
        <img src="${imageUrl}" class="card-img-top" alt="${name}">
      </div>
      <div class="col-md-8">
        <div class="card-body">
          <h5 class="card-title text-black">${name}</h5>
          <p class="card-text">${description}</p>
          <p class="card-text">Marca: ${brand}</p>
          <p class="card-text">Prezzo: ${price}</p>
          <a href="back-office.html" class="btn btn-dark btn-sm">Modifica</a>
        </div>
      </div>
    </div>
  </div>
  
    `;
  
    return card;
  }
  
  // homepage con card 
  function updateHomepage(products) {
    const productList = document.getElementById('productList');
    productList.innerHTML = '';
  
    products.forEach(product => {
      const card = generateProductCard(product);
      productList.appendChild(card);
    });
  
    // listner di modifica
    const editBtns = document.querySelectorAll('.editBtn');
    editBtns.forEach(btn => btn.addEventListener('click', editProduct));
  
    // listener  di eliminazione
    const deleteBtns = document.querySelectorAll('.deleteBtn');
    deleteBtns.forEach(btn => btn.addEventListener('click', deleteProduct));
  }
  
  // fetch dei prodotti
  function fetchProducts() {
    fetch('https://striveschool-api.herokuapp.com/api/product/', {
      headers: {
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NGE3YjM4YjEyYjUwYzAwMTQ5ZTRlZWEiLCJpYXQiOjE2ODg3MzEyNzQsImV4cCI6MTY4OTk0MDg3NH0.9NLl1-KiEg58sQ_CfnMT-8t-BdQYZGsgJW8YVii4ibA'
      }
    })
    .then(response => response.json())
    .then(data => {
      updateHomepage(data);
    })
    .catch(error => console.log(error));
  }
  
  // caricamento  pagina
  fetchProducts();
  