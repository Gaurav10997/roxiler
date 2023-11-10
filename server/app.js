const express = require("express")
const mongoose = require('mongoose')
var cors = require('cors')
const Product = require('./models/product')
const {getAllTransactions,getStatics,getBarChart, categorystats,test,extractMonth} = require('./controller/transactionController')


const app = express();
app.use(cors())
// mongoose.connect('mongodb://127.0.0.1:27017/roxiler')
// .then(()=>console.log('databse connected Successfully'))

mongoose.connect('mongodb+srv://avdhika:passwordavdhika@cluster0.lsjg2hk.mongodb.net/?retryWrites=true&w=majority')
  .then(() => {
    console.log("Connection to the database successful");
  })
  .catch((e) => {
    console.log('Something went wrong with the connection:', e);
  });




const PORT_NO = 4040;
app.listen(PORT_NO ,()=>{
    console.log(`Serever Started SuccessFully at ${PORT_NO}`)
})



// saving all the Product to the DataBase 


fetch('https://s3.amazonaws.com/roxiler.com/product_transaction.json')
.then((response)=>response.json())
.then((data)=>{
    const productsToInsert = data; 
    const insertPromises = productsToInsert.map((productData) => {
        const product = new Product(productData);
        return product.save();
      });

      return  Promise.all(insertPromises)
})
.then((insertedProducts) => {
    console.log(`Inserted ${insertedProducts.length} products into the database.`);
  })
  .catch((error) => {
    console.error('Error inserting products: ' + error);
  });


  
// const p1 = new Product({
//     id: 1,
//     title: "Fjallraven Foldsack No 1 Backpack Fits 15 Laptops",
//     price: 329.85,
//     description: "Your perfect pack for everyday use and walks in the forest. Stash your laptop up to 15 inches in the padded sleeve for your everyday",
//     category: "men's clothing",
//     image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
//     sold: false,
//     dateOfSale: "2021-11-27T20:29:54+05:30"
// });

// p1.save()
//     .then(() => console.log("Saved product"))
//     .catch(error => console.error(error));
// test Server 
app.get('/', test)


// important apis 
app.get('/transactions', extractMonth, getAllTransactions );
app.get('/statistics', extractMonth,getStatics );
app.get('/barchart', extractMonth,getBarChart );
app.get('/categorystats', extractMonth, categorystats);
  












  




