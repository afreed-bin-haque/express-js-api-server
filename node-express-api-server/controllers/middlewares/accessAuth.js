const jwt = require('jsonwebtoken');
const errorHandler = require('../../errors/errorHandler');

const verifyUser = function (req, res, next) {
  const token = req.query.token;
  if (!token) {
    errorHandler.accessForbidden(req, res);
  } else {
    try{
      const jwt = require('jsonwebtoken');

      /* const payload = {
        accessToken: 'erw1f3nwfg13e2f1w3n5awgeahba3251032g1av',
        permission: 'true',
        type: 'admin',
        user: 'Afreen-Bin-Haqe'
      };

      const secretKey = 'cuatrodev-secret-access-key';

      const token = jwt.sign(payload, secretKey, { expiresIn: '1h' }); */

     /*  console.log(token);
      const decodedToken = jwt.verify(token, 'cuatrodev-secret-access-key');
      const user = decodedToken.user;
      const permission = decodedToken.permission;
      const userType = decodedToken.type;
      console.log(decodedToken); */
      next();
    }catch(error){
      console.log(error);
      errorHandler.internalServerError(req, res);
    }
  }
};

module.exports = verifyUser;