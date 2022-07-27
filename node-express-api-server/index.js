import 'dotenv/config'
import 'express-group-routes';
import express from 'express';
const app = express();
import api from './routes/api.js';
import web from './routes/web.js';

app.use('/', web);

app.use('/api', api);

app.use(function (req, res, next) {
  res.status(404).json({
     status: 'Not found',
     message: 'Requested page not found'
  });
});


const port = process.env.PORT;
app.listen(port, function(){
  console.log(`Listening to port ${port}`)
});