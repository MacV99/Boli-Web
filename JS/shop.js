let listProductHTML = document.querySelector('.listProduct');
let listCartHTML = document.querySelector('.listCart');
let iconCart = document.querySelector('.icon-cart');
let iconCartSpan = document.querySelector('.icon-cart span');
let body = document.querySelector('body');
let closeCart = document.querySelector('.close');
let products = [];
let cart = [];

// Función para limpiar rutas de imagen
const cleanImagePath = (path) => {
    return path ? path.trim() : '';
}

iconCart.addEventListener('click', () => {
    body.classList.toggle('showCart');
})
closeCart.addEventListener('click', () => {
    body.classList.toggle('showCart');
})

const addDataToHTML = () => {
    // Limpiar contenido existente
    listProductHTML.innerHTML = '';

    // Añadir nuevos datos
    if (products.length > 0) {
        products.forEach(product => {
            let newProduct = document.createElement('div');
            newProduct.dataset.id = product.id;
            newProduct.classList.add('item', 'flex-column');
            newProduct.innerHTML = `
                <img src=".${cleanImagePath(product.image)}" alt="${product.name}">
                <h5 class="product-name">${product.name}</h5>
                <h5>$${product.price.toFixed(3)}</h5>
                <div class="flex-row">
                    <button class="addCart">Agregar</button>
                    <i class="bi bi-eye"></i>
                </div>
            `;
            listProductHTML.appendChild(newProduct);
        });
    }
}

listProductHTML.addEventListener('click', (event) => {
    let positionClick = event.target;
    if (positionClick.classList.contains('addCart')) {
        let product_id = positionClick.closest('.item').dataset.id;
        addToCart(product_id);
    }
})

const addToCart = (product_id) => {
    let positionThisProductInCart = cart.findIndex((value) => value.product_id == product_id);
    if (cart.length <= 0) {
        cart = [{
            product_id: product_id,
            quantity: 1
        }];
    } else if (positionThisProductInCart < 0) {
        cart.push({
            product_id: product_id,
            quantity: 1
        });
    } else {
        cart[positionThisProductInCart].quantity = cart[positionThisProductInCart].quantity + 1;
    }
    addCartToHTML();
    addCartToMemory();
}

const addCartToMemory = () => {
    localStorage.setItem('cart', JSON.stringify(cart));
}

const addCartToHTML = () => {
    listCartHTML.innerHTML = '';
    let totalQuantity = 0;
    let totalPrice = 0;
    if (cart.length > 0) {
        cart.forEach(item => {
            let positionProduct = products.findIndex((value) => value.id == item.product_id);
            if (positionProduct !== -1) {
                let info = products[positionProduct];
                let itemTotal = info.price * item.quantity;
                totalQuantity += item.quantity;
                totalPrice += itemTotal;

                let newItem = document.createElement('div');
                newItem.classList.add('item');
                newItem.dataset.id = item.product_id;

                newItem.innerHTML = `
                    <div class="image">
                        <img src=".${cleanImagePath(info.image)}" alt="${info.name}">
                    </div>
                    <div class="name">
                        ${info.name}
                    </div>
                    <div class="totalPrice">$${itemTotal.toFixed(3)}</div>
                    <div class="quantity">
                        <span class="minus"><</span>
                        <span>${item.quantity}</span>
                        <span class="plus">></span>
                    </div>
                `;
                listCartHTML.appendChild(newItem);
            }
        });

        // Opcional: Añadir total del carrito
        let totalSection = document.createElement('div');
        totalSection.classList.add('cart-total');
        totalSection.innerHTML = `
            <strong>Total: $${totalPrice.toFixed(3)}</strong>
        `;
        listCartHTML.appendChild(totalSection);
    }
    iconCartSpan.innerText = totalQuantity;
}

listCartHTML.addEventListener('click', (event) => {
    let positionClick = event.target;
    if (positionClick.classList.contains('minus') || positionClick.classList.contains('plus')) {
        let product_id = positionClick.closest('.item').dataset.id;
        let type = positionClick.classList.contains('minus') ? 'minus' : 'plus';
        changeQuantityCart(product_id, type);
    }
})

const changeQuantityCart = (product_id, type) => {
    let positionItemInCart = cart.findIndex((value) => value.product_id == product_id);
    if (positionItemInCart >= 0) {
        switch (type) {
            case 'plus':
                cart[positionItemInCart].quantity++;
                break;
            case 'minus':
                let changeQuantity = cart[positionItemInCart].quantity - 1;
                if (changeQuantity > 0) {
                    cart[positionItemInCart].quantity = changeQuantity;
                } else {
                    cart.splice(positionItemInCart, 1);
                }
                break;
        }
    }
    addCartToHTML();
    addCartToMemory();
}

const initApp = () => {
    // Obtener datos de productos
    fetch('../JSON/products.json')
        .then(response => response.json())
        .then(data => {
            products = data;
            addDataToHTML();

            // Obtener datos del carrito de la memoria
            if (localStorage.getItem('cart')) {
                cart = JSON.parse(localStorage.getItem('cart'));
                addCartToHTML();
            }
        })
        .catch(error => {
            console.error('Error cargando productos:', error);
        });
}
initApp();