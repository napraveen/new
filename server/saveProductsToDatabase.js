const { Product } = require('./db'); // Replace with the path to your Product model

const data = {
  products: [
    {
      name: 'Sony Wireless Headphones',
      slug: 'sony-wireless-headphones',
    },
    {
      name: 'Samsung 4K Smart TV',
      slug: 'samsung-4k-smart-tv',
    },
    {
      name: 'Apple MacBook Pro',
      slug: 'apple-macbook-pro',
    },
    {
      name: 'Canon DSLR Camera Kit',
      slug: 'canon-dslr-camera-kit',
    },
  ],
};

const saveProductsToDatabase = async () => {
  try {
    for (const productData of data.products) {
      const product = new Product(productData);
      await product.save();
    }
    console.log('Products saved successfully.');
  } catch (error) {
    console.error('Error saving products:', error);
  }
};

module.exports = saveProductsToDatabase;
