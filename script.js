document.addEventListener('DOMContentLoaded', () => {
  const productGrid = document.getElementById('product-grid');
  const cartItems = document.getElementById('cart-items');
  const cartCount = document.getElementById('cart-count');
  const cartTotal = document.getElementById('cart-total');
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');

  let cart = [];

  // Fetch products from backend
  fetch('http://localhost:3000/products')
    .then(response => response.json())
    .then(products => {
      products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.classList.add('product-card');
        productCard.innerHTML = `
          <img src="${product.image}" alt="${product.name}">
          <h3>${product.name}</h3>
          <p>$${product.price}</p>
          <button onclick="addToCart(${product.id})">Add to Cart</button>
        `;
        productGrid.appendChild(productCard);
      });
    });

  // Toggle mobile menu
  hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
  });

  // Add to cart
  window.addToCart = (id) => {
    fetch(`http://localhost:3000/products/${id}`)
      .then(response => response.json())
      .then(product => {
        const existingItem = cart.find(item => item.id === id);
        if (existingItem) {
          existingItem.quantity++;
        } else {
          cart.push({ ...product, quantity: 1 });
        }
        updateCart();
      });
  };

  // Update cart display
  function updateCart() {
    cartItems.innerHTML = '';
    let total = 0;
    cart.forEach(item => {
      total += item.price * item.quantity;
      const cartItem = document.createElement('div');
      cartItem.classList.add('cart-item');
      cartItem.innerHTML = `
        <span>${item.name} x${item.quantity}</span>
        <span>$${item.price * item.quantity}</span>
        <button onclick="removeFromCart(${item.id})">Remove</button>
      `;
      cartItems.appendChild(cartItem);
    });
    cartCount.textContent = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartTotal.textContent = total.toFixed(2);
  }

  // Remove from cart
  window.removeFromCart = (id) => {
    cart = cart.filter(item => item.id !== id);
    updateCart();
  };

  // Checkout
  window.checkout = () => {
    if (cart.length === 0) {
      alert('Your cart is empty!');
      return;
    }
    alert('Checkout successful! Thank you for your purchase.');
    cart = [];
    updateCart();
  };
});