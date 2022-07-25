require('dotenv').config();
require('express-group-routes');
const express = require('express');
const app = express();
const manufacturer_data = require('./data/manufacturers');
/**Manufacturer list */
const manufacturers = manufacturer_data;

/** Product List*/
const products =[
  {
    serial:0001,
    category: 'Phone',
    product_name: 'Iphone 7',
    manufacturer: 'Apple',
  },
  {
    serial: 0002,
    category: 'Phone',
    product_name: 'Iphone 8',
    manufacturer: 'Apple',
  },
  {
    serial: 0003,
    category: 'Phone',
    product_name: 'Iphone 10',
    manufacturer: 'Apple',
  },
  {
    serial: 0004,
    category: 'Phone',
    product_name: 'Iphone 11',
    manufacturer: 'Apple',
  },
  {
    serial: 0005,
    category: 'Phone',
    product_name: 'Pixel 1',
    manufacturer: 'Google',
  },
  {
    serial: 0006,
    category: 'Phone',
    product_name: 'Pixel 2',
    manufacturer: 'Google',
  },
  {
    serial: 0005,
    category: 'Phone',
    product_name: 'Pixel 1',
    manufacturer: 'Google',
  },
];

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
    console.log(manufacturers);
    /* res.json({
      status: 'Accepted',
      manufacturers: manufacturers
    }); */
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