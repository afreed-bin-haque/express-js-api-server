const notFound = function(req, res){
  res.status(404).json({
    status: '4004',
    message: 'Your requested file or url is not found',
  });
}

const badRequest = function(req, res){
  res.status(400).json({
    status: '4000',
    message: 'You have missed some required variables',
  });
}

const accessForbidden = function(req, res){
  res.status(403).json({
    status: '4003',
    message: 'You are not allowed to access',
  });
}

const methodNotAllowed = function(req, res){
  res.status(405).json({
    status: '4005',
    message: 'Requested method is not allowed',
  });
}

const internalServerError = function(req, res){
  res.status(500).json({
    status: '5000',
    message: 'Something went wrong in serversite',
  });
}

module.exports = {
  notFound,
  badRequest,
  accessForbidden,
  methodNotAllowed,
  internalServerError,
}