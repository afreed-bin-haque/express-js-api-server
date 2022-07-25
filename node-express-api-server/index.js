const express = require('express');
const app = express();
app.get('/',function(req, res){
  res.send('Hello, Welcome to Api Repo');
})

app.listen(3000, function(){
  console.log('l')
});