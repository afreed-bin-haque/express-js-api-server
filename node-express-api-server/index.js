require('dotenv').config();
require('express-group-routes');
const express = require('express');
const app = express();
const manufacturer_data = require('./data/manufacturers.json');
const product_list_data = require('./data/products.json');

app.get('/',function(req, res){
  res.status(200).json({ 
    status: 'Accepted',
    welcomeText: 'Hello, Welcome to Api Repo' 
  });
})

app.group('/', function (router) {
  app.get('/api', function (req, res) {
    res.redirect('/');
  });

  app.get('/api/v1', function (req, res) {
    res.redirect('/');
  });
});

app.group('/api/v1', function (router){

  router.get('/manufacturers', function (req, res){
    res.status(200).json({
      status: 'Accepted',
      manufacturers: manufacturer_data
    });
  });

  router.get('/get/product/list', function (req, res) {
    res.status(200).json({
      status: 'Accepted',
      product_list: product_list_data
    });
  });

  router.get('/get/product/:serial/:manufacturer',function(req, res){
    const givenSerial = req.params.serial;
    const givenManufacturer = req.params.manufacturer;
    const finalGivenManufacturer = givenManufacturer.charAt(0).toUpperCase() + givenManufacturer.slice(1);
    const found_product = product_list_data.find(c => c.serial === givenSerial && c.manufacturer === finalGivenManufacturer);
    console.log(product_list_data);
    if (!found_product) res.status(404).json({
      status: 'Not Found',
      message: 'Did not find product asssociated with these serial and manufacturer',
      givenSerial: givenSerial,
      givenManufacturer: givenManufacturer
    });
    res.status(200).json({
      status:'Accepted',
      found_product: found_product
    });
  });
});

app.get('*', function (req, res) {
  res.status(404).json({
    status: 'Not Found',
    message: 'Endpoint not found'
  });
});




const port = process.env.PORT;
app.listen(port, function(){
  console.log(`Listening to port ${port}`)
});