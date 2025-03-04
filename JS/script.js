const $bar = document.getElementById('bar');
const $nav = document.getElementsByTagName('nav')[0];
const $closeNav = document.getElementById('close');
const $closePro = document.getElementById('close-pro');
const $vProduct = document.getElementById('v-product');


// CLOSE VIEW PRODUCT
$closePro.addEventListener('click', () => {
  $vProduct.style.display = 'none';
})

$bar.addEventListener('click', () => {
  $nav.classList.add('active');
})

$closeNav.addEventListener('click', () => {
  $nav.classList.remove('active');
})


// MOSTRAR PRODUCTOS
async function loadProducts() {
  try {
    const response = await fetch('./JSON/products.json'); // Asegúrate de que el archivo JSON está en la misma ruta del HTML
    const products = await response.json();

    const container = document.getElementById("productsContainer");
    container.innerHTML = '';

    products.forEach(product => {
      const productElement = document.createElement("div");
      productElement.classList.add("pro");

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
                        <a href="#"><i class="bi bi-cart"></i></a>
                    `;

      container.appendChild(productElement);
    });
  } catch (error) {
    console.error("Error cargando los productos:", error);
  }
}

loadProducts();
