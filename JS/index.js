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
    container.innerHTML = `
                            <div class="arrows flex-row">
                              <i class="bi bi-arrow-left-circle-fill flex-row"></i>
                              <i class="bi bi-arrow-right-circle-fill flex-row"></i>
                            </div>
                          `;

    listProducts.forEach(product => {
      const productElement = document.createElement("div");
      productElement.classList.add("pro", "flex-column");
      productElement.setAttribute('id', product.id);

      productElement.innerHTML = `                          
                          <img src="${product.image}" alt="${product.name}">
                          <div class="des flex-column">
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

      productElement.addEventListener('click', () => {
        // Redirigir a la página de detalles del producto
        window.location.href = `./HTML/shop.html`;
      }); // Evento para ver detalles

      container.appendChild(productElement);
    });

  } catch (error) {
    console.error("Error cargando los productos:", error);
  }
}


// TRAYECTORIA
// Cargar las imágenes de trayectoria desde el JSON
fetch('./JSON/trayectoria.json')
  .then(response => response.json())
  .then(trayectoriaData => {
    const container = document.querySelector("#path > div");
    container.innerHTML = `
                            <div class="arrows flex-row">
                              <i class="bi bi-arrow-left-circle-fill flex-row"></i>
                              <i class="bi bi-arrow-right-circle-fill flex-row"></i>
                            </div>`;


    const sortedEntries = Object.entries(trayectoriaData).sort(([a], [b]) => b - a);
    for (const [year, images] of sortedEntries) {

      const imageHTML = images.map(imgSrc => `
        <img src="${imgSrc}" alt="Imagen de ${year}" class="trayectoria-img">
      `).join("");

      const yearBlock = `
        <div class="flex-row">
          <h4 class="year">${year}</h4>
          <div class="flex-row">
            ${imageHTML}
          </div>
        </div>
      `;

      container.innerHTML += yearBlock;
    }

    // Esperar a que las imágenes estén en el DOM
    setTimeout(() => {
      const images = document.querySelectorAll(".trayectoria-img");
      const modal = document.getElementById("image-modal");
      const modalImg = document.getElementById("modal-img");

      images.forEach(img => {
        img.addEventListener("click", () => {
          modalImg.src = img.src;
          modal.classList.remove("hidden");
        });
      });

      // Cerrar modal al hacer clic fuera de la imagen
      modal.addEventListener("click", (e) => {
        if (e.target === modal) {
          modal.classList.add("hidden");
        }
      });

      // Cerrar modal con tecla Escape
      document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") {
          modal.classList.add("hidden");
        }
      });
    }, 100);
  })
  .catch(error => console.error("Error al cargar las imágenes de trayectoria:", error));


// Cargar los productos al iniciar
loadProducts();