const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

const productRoutes = require('./routes/products');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ Serve static HTML pages
app.use(express.static(path.join(__dirname, 'public')));

// ✅ API routes
app.use('/api/products', productRoutes);

const PORT = process.env.PORT || 3000;

mongoose.connect('mongodb://localhost:27017/Test', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log('✅ Connected to MongoDB');
  app.listen(PORT, () => {
    console.log(`🚀 Server is running for html on port ${PORT}`);
  });
})
.catch(err => {
  console.error('❌ Error connecting to MongoDB', err);
});
