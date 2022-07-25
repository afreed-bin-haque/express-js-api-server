require('dotenv').config();
require('express-group-routes');
const express = require('express');
const app = express();
const manufacturer_data = require('./data/manufacturers.json');
const product_list_data = require('./data/products.json');

app.get('/',function(req, res){
  res.json({ 
    status: 'Accepted',
    welcomeText: 'Hello, Welcome to Api Repo' 
  },);
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
    res.json({
      status: 'Accepted',
      manufacturers: manufacturer_data
    });
  });

  router.get('/get/product/list', function (req, res) {
    res.json({
      status: 'Accepted',
      product_list: product_list_data
    });
  });

  router.get('/get/product/:serial/:manufacturer',function(req, res){
    const givenSerial = req.params.serial;
    const givenManufacturer = req.params.manufacturer;
    res.json({
      status:'Accepted',
      given_serial: givenSerial,
      manufacturer: givenManufacturer
    });
  });
});



const port = process.env.PORT;
app.listen(port, function(){
  console.log(`Listening to port ${port}`)
});