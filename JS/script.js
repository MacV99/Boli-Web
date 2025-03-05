let listProducts = []; // Variable global para almacenar los productos

// Cargar productos desde JSON
async function loadProducts() {
  try {
    const response = await fetch('./JSON/products.json');
    listProducts = await response.json(); // Almacenar los productos en la variable global

    const container = document.getElementById("productsContainer");
    container.innerHTML = '';

    listProducts.forEach(product => {
      const productElement = document.createElement("div");
      productElement.classList.add("pro");
      productElement.setAttribute('id', product.id);

      productElement.innerHTML = `
                          <img src="${product.image}" alt="${product.name}">
                          <div class="des">
                            <h5>${product.name}</h5>
                            <div class="star">
                              <i class="bi bi-star-fill"></i>
                              <i class="bi bi-star-fill"></i>
                              <i class="bi bi-star-fill"></i>
                              <i class="bi bi-star-fill"></i>
                              <i class="bi bi-star-fill"></i>
                            </div>
                            <h4>Precio: $${product.price.toFixed(3)}</h4>
                          </div>
                    `;

      productElement.addEventListener('click', () => showProductDetails(product.id)); // Evento para ver detalles

      container.appendChild(productElement);
    });

  } catch (error) {
    console.error("Error cargando los productos:", error);
  }
}

// Función para mostrar los detalles del producto seleccionado
function showProductDetails(productId) {
  const product = listProducts.find(p => p.id == productId); // Buscar el producto en el array

  if (product) {
    const $vProduct = document.getElementById('v-product'); // Contenedor de la vista del producto

    // Actualizar contenido con los detalles del producto
    $vProduct.querySelector('img').src = product.image;
    $vProduct.querySelector('.product-name').textContent = product.name;
    $vProduct.querySelector('p').textContent = product.details;
    $vProduct.querySelector('.product-price').textContent = `$${product.price.toFixed(3)}`;


    // Mostrar la vista del producto
    $vProduct.style.display = 'flex';

    // Agregar evento para cerrar la vista
    document.getElementById('close-pro').addEventListener('click', () => {
      $vProduct.style.display = 'none';
    });
  } else {
    console.error("Producto no encontrado");
  }
}

// Cargar los productos al iniciar
loadProducts();
