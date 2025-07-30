document.addEventListener('DOMContentLoaded', () => {
  const productImage = document.getElementById('product-image');
  const productName = document.getElementById('product-name');
  const productPrice = document.getElementById('product-price');
  const productDescription = document.getElementById('product-description');
  const cartCount = document.getElementById('cart-count');
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');

  let cart = JSON.parse(localStorage.getItem('cart')) || [];

  // Get product ID from URL
  const urlParams = new URLSearchParams(window.location.search);
  const productId = urlParams.get('id');

  // Fetch product details
  fetch(`http://localhost:3000/products/${productId}`)
    .then(response => response.json())
    .then(product => {
      if (product.message) {
        productName.textContent = 'Product not found';
        return;
      }
      productImage.src = product.image;
      productImage.alt = product.name;
      productName.textContent = product.name;
      productPrice.textContent = `$${product.price}`;
      productDescription.textContent = product.description || 'A stylish addition to your wardrobe, perfect for any occasion.';
    })
    .catch(error => {
      console.error('Error fetching product:', error);
      productName.textContent = 'Error loading product';
    });

  // Update cart count
  cartCount.textContent = cart.reduce((sum, item) => sum + item.quantity, 0);

  // Toggle mobile menu
  hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
  });

  // Add to cart
  window.addToCart = () => {
    fetch(`http://localhost:3000/products/${productId}`)
      .then(response => response.json())
      .then(product => {
        const size = document.getElementById('product-size').value;
        const existingItem = cart.find(item => item.id === product.id && item.size === size);
        if (existingItem) {
          existingItem.quantity++;
        } else {
          cart.push({ ...product, quantity: 1, size });
        }
        localStorage.setItem('cart', JSON.stringify(cart));
        cartCount.textContent = cart.reduce((sum, item) => sum + item.quantity, 0);
        alert('Added to cart!');
      });
  };
});