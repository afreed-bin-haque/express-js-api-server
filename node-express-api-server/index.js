require('dotenv').config();
const expressApp = require('express');
const app = expressApp();
const port = process.env.APP_PORT||3000;
const bodyParser = require('body-parser');
const apiRouter = require('./routes/api');
const {
  notFound,
  badRequest,
  accessForbidden,
  methodNotAllowed,
  internalServerError,
} = require('./errors/errorHandler');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api', apiRouter);

app.get('/', function (req, res) {
  res.redirect('/api/v1');
});

app.listen(port,function(){
  console.log(`App started on port: ${port}`);
});

/* Custom error */
app.use(notFound);
app.use(badRequest);
app.use(accessForbidden);
app.use(methodNotAllowed);
app.use(internalServerError);