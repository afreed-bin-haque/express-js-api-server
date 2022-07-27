const ErrorNotFound = function (req, res) {
  res.status(404).json({
    status: 'Not Found',
    message: 'Endpoint not found'
  });
}
const ErrorForbidden = function(req, res){
  res.status(403).json({
    status: 'Access Forbidden',
    message: 'You are not allow to access this file.Please contact us'
  });
}


export { ErrorNotFound, ErrorForbidden }