require('dotenv').config();
const expressApp = require('express');
const app = expressApp();
const port = process.env.APP_PORT||3000;
const apiRouter = require('./routes/api');
app.use('/api', apiRouter);

app.get('/', function (req, res) {
  res.redirect('/api/v1');
});

app.listen(port,function(){
  console.log(`App started on port: ${port}`);
});