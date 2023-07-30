const helper = require('../helpers/helper');
const fs = require('fs');
const path = require('path');

exports.generateUserTokenized = function(req, res){
  try{
    const user = req.body.user;
    const type = req.body.type;
    const permission = req.body.permission; 
    const randomStrinngToken = helper.getRandomString(32); 
    const timeLimit = new Date();
    timeLimit.setHours(timeLimit.getHours() + 1);
    const payload = {
      accessToken: randomStrinngToken,
      permission: permission,
      type: type,
      user: user
    };

    const tokenPayload = {
      accessToken: randomStrinngToken,
      permission: permission,
      type: type,
      user: user,
      expiresIn: timeLimit
    }

    const secretKey = process.env.APP_SIGNATURE;
    const finalData = {
      'signature': secretKey,
      tokenPayload
    }
    const encryption = helper.encryptdata(finalData,randomStrinngToken);
    const decryptData = helper.decryptData(encryption,randomStrinngToken);

    const filePath = path.join(__dirname,'../../storages/verifyID.json');
    let prevData =[];
    if(fs.existsSync(filePath)){
      const jsonPrevData = fs.readFileSync(filePath, 'utf8')
      prevData = JSON.parse(jsonPrevData);
      const existingUser = prevData.findIndex((item) => item.user === user);
      if(existingUser !== -1){
        prevData[existingUser] = payload;
        fs.writeFileSync(filePath,JSON.stringify(prevData,null,2),'utf8')

        return res.status(200).json({
          status: '1001',
          message: 'Token created ✅ (User data updated)',
          token: decryptData,
        });
      }
    }
    prevData.push(payload);
    fs.writeFileSync(filePath,JSON.stringify(prevData,null,2),'utf8')

    res.status(200).json({
      status: '1001',
      message: 'Token created ✅',
      token: encryption
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
}