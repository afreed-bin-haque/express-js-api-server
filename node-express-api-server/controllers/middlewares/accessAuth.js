const jwt = require('jsonwebtoken');
const errorHandler = require('../../errors/errorHandler');

const verifyUser = function (req, res, next) {
  try{
    const token = req.headers['authorization'];
    const decodedToken = jwt.verify(token, 'cuatrodev-secret-access-key',);
    const user = decodedToken.user;
    const permission = decodedToken.permission;
    const userType = decodedToken.type;
    console.log('auth token: ',token);
    next();
  }catch(error){
    if(process.env.APP_STATUS === 'local'){
      res.status(422).json({
          status: '4222',
          message: 'Unprocessable error occured',
          error: error.message
      });
    }else{
      errorHandler.internalServerError(req, res);
    }
  }
};

module.exports = verifyUser;