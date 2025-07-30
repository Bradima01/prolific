const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

// In-memory product data
const products = [
  { id: 1, name: 'Casual T-Shirt', price: 19.99, image: 'https://via.placeholder.com/200?text=T-Shirt' },
  { id: 2, name: 'Denim Jeans', price: 49.99, image: 'https://via.placeholder.com/200?text=Jeans' },
  { id: 3, name: 'Summer Dress', price: 39.99, image: 'https://via.placeholder.com/200?text=Dress' },
  { id: 4, name: 'Leather Jacket', price: 89.99, image: 'https://via.placeholder.com/200?text=Jacket' },
];

// Get all products
app.get('/products', (req, res) => {
  res.json(products);
});

// Get single product
app.get('/products/:id', (req, res) => {
  const product = products.find(p => p.id === parseInt(req.params.id));
  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ message: 'Product not found' });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});