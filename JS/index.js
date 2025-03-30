let listProducts = []; // Variable global para almacenar los productos
let $slider = document.querySelector('.slider'); // Contenedor del slider
let $nextBtn = document.getElementById('next'); // Botón para avanzar al siguiente producto
let $prevBtn = document.getElementById('prev'); // Botón para retroceder al producto anterior

// SLIDER
$nextBtn.onclick = () => {
  $slider.append($slider.querySelector('.slider-item:first-child'));
}

$prevBtn.onclick = () => {
  $slider.prepend($slider.querySelector('.slider-item:last-child'));
}

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
                            <!-- <h4>Precio: $${product.price.toFixed(3)}</h4> -->
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


// INFINITY SLIDER

document.addEventListener('DOMContentLoaded', () => {
  const track = document.getElementById('carouselTrack');
  const images = Array.from(track.children);
  let currentIndex = 0;

  function createInfiniteCarousel() {
    // Clonar el primer elemento al final
    const firstImageClone = images[0].cloneNode(true);
    track.appendChild(firstImageClone);
  }

  function moveCarousel() {
    currentIndex++;
    track.style.transform = `translateX(-${currentIndex * 100}%)`;

    // Cuando llegue a la última imagen (incluyendo la clonada)
    if (currentIndex >= images.length) {
      setTimeout(() => {
        // Desactivar transición para un cambio instantáneo
        track.style.transition = 'none';
        track.style.transform = 'translateX(0)';
        currentIndex = 0;

        // Restaurar transición después del reset
        setTimeout(() => {
          track.style.transition = 'transform 0.5s ease';
        }, 50);
      }, 500);
    }
  }

  // Crear el efecto infinito
  createInfiniteCarousel();

  // Cambiar imagen cada 3 segundos
  setInterval(moveCarousel, 7000);
});


// Cargar los productos al iniciar
loadProducts();
