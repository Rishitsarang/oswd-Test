const bodyParser = require('body-parser');
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const categroyRouter = require('./routes/categoryRoutes');
const productRouter = require('./routes/productRoutes');

const app =express();

//Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.use(express.static(path.join(__dirname,'public')));

//Db connection
mongoose.connect('mongodb://localhost:27017/rest-crud',{
    useNewUrlParser:true,
    useUnifiedTopology: true
}).then(()=>{
    console.log('DB Connected');
}).catch((err)=>{
    console.log('DB Connection Error:',err);
});

//Routes
app.use('/api/categories',categroyRouter);
app.use('/api/products',productRouter);

app.use('/',(req,res)=>{
    res.sendFile(path.join(__dirname,'public','index.html'));
})
app.listen(3000,()=>{
    console.log('Server is running on port 3000');
})