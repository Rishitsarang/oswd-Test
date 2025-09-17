const express = require('express');
const router = express.Router();
const Category = require('../models/category');

//Get All Categories
router.get('/',async(req,res)=>{
    const category = await Category.find();
    res.json(category);
});

//Add New cateagroy
router.post('/',async (req,res)=>{
    const category = await Category.create(req.body);
    res.json(category);
});

//Get one Category
router.get('/:id',async (req,res)=>{
    const category = await Category.findById(req.params.id)
    res.json(category);
});

//Edit Category
router.put('/:id',async (req,res)=>{
    const category = await Category.findByIdAndUpdate(req.params.id,req.body,{new:true});
    res.json(category);
});

//Delete Category
router.delete('/:id',async (req,res)=>{
    const category = await Category.findByIdAndDelete(req.params.id);
    res.json({message:"Category delete "},category);
});

module.exports = router;