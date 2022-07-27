import { connection } from '../../database/databaseConnection.js';

/**Store user */
const StoreUser = function (req, res, result){
  try{
    const appToken = req.headers.apptoken;
    const verfityToken = connection.query(`SELECT * FROM app_token WHERE token = '${appToken}'`, function (err, result) {
      if (err) throw err;
      return Object.keys(result).map(function (data) {
        const fetchToken = result[data].token;
        if (fetchToken === appToken) {
          res.status(200).json({
            status: 'Accepted',
            message: 'ok'
          });
        } else {
          res.status(403).json({
            status: 'Accepted',
            message: 'error'
          });
        }
      })
    });

  }catch(error){
    console.log(error)
  }
}


export { StoreUser }