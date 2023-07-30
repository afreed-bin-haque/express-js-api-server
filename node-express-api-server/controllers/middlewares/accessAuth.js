const errorHandler = require('../../errors/errorHandler');
const helper = require('../helpers/helper');
const crypto = require('crypto');
const randomStrinngToken = helper.getRandomString(32); 

const decryptData = function (encryptedDataWithIV, secretKey) {
  const encryptedData = encryptedDataWithIV.encryptedData;
  const cr = Buffer.from(encryptedDataWithIV.cr, 'hex');
  const decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(secretKey), cr);
  let decryptedData = decipher.update(encryptedData, 'hex', 'utf-8');
  decryptedData += decipher.final('utf-8');
  return JSON.parse(decryptedData);
};


const verifyUser = function (req, res, next) {
  const crHex = req.headers['app_cr'];
  const encryptedDataHex = req.headers['app_data'];
  try{
    const decryptedData = decryptData( {
    cr:crHex,
    encryptedData:encryptedDataHex
  }, randomStrinngToken);
    console.log('auth encryptedDataHex: ',decryptData);
     res.status(422).json({
          status: '4222',
          test:decryptedData
      });
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