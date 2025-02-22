const port = 4000;
const express = require("express");
const app =express();
const mongoose =require("mongoose");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require('path');
const cors = require('cors');
const { error, log } = require("console");


app.use(express.json());
app.use(cors());

// Database Connection
mongoose.connect("mongodb+srv://Dhinaashwin1111:Grdgrd11@cluster0.kc1dyc9.mongodb.net/");

// API Creation
app.get("/", (req, res) => {
    res.send("Express is Running");
});

//Image Storage Engine

const storage = multer.diskStorage({
    destination :'./upload/images',
    filename:(req, file, cb) => {
        cb(null,`${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    }
})

const upload = multer({storage:storage})
app.use('/images',express.static('upload/images'))
app.post("/upload",upload.single('product'),(req,res)=> {
    res.json({
        success : 1,
        image_url:`http://localhost:${port}/images/${req.file.filename}`
    })
})

//Mongoose Schema
const Product = mongoose.model("Product",{
    id:{
        type:Number,
        required:true,
    },
    name:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:true
    }, 
    category:{
        type:String,
        required:true
    },
    new_price:{
        type:Number,
        required:true
    },
    old_price:{
        type:Number,
        required:true
    },
    date:{
        type:Date,
        default:Date.now
    },
    available:{
        type:Boolean,
        default:true,
    }
})
 
app.post('/addproduct' , async(req,res) =>{
    let products = await Product.find({});
    let id;
    if(products.length>0){
        let last_product_array = products.slice(-1);
        let last_product = last_product_array[0];
        id = last_product.id +1;
    }
    else{
        id=1;
    }
    const product = new Product ({
        id:id,
        name:req.body.name,
        image:req.body.image,
        category:req.body.category,
        new_price:req.body.new_price,
        old_price:req.body.old_price,
        available:req.body.available
    })
    console.log(product);
    await product.save();
    console.log('saved');
    res.json({
        success:true,
        name:req.body.name,
    }
    )
})

//delete 
app.post('/removeproduct',async (req,res) =>{
   await Product.findOneAndDelete({id:req.body.id});
   console.log("Removed");
   res.json({
    success:true,
    name:req.body.name
   })
})

//display 



app.get('/allproducts',async (req,res) => {
    let products = await Product.find({});
    console.log("All Products Fetched");
    res.send(products);
})
// Error Handling Middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

app.listen(port, () => {
    console.log("Server running on Port " + port);
});
