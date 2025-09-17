const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const methodOverride  = require('method-override');
const path = require('path');

const categoryRoutes = require('./routes/categoryRoutes');
const productRoutes = require('./routes/productRoutes');

const app = express();

// Middleware
app.set('view engine', 'ejs');  // ✅ fixed
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public'))); // ✅ fixed
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

// DB Connection
mongoose.connect('mongodb://127.0.0.1:27017/node-crud-ejs')  // ✅ fixed name
  .then(() => console.log('DB Connected'))
  .catch(err => console.log(err));

// Routes
app.get('/', (req, res) => res.redirect('/categories'));
app.use('/categories', categoryRoutes);
app.use('/products', productRoutes);

app.listen(3000, () => console.log('Server Running on port 3000'));
