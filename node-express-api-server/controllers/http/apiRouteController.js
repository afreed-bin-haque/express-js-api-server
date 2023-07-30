exports.defaultRerouting = function (req, res) {
  res.status(200).json({
    status: '1001',
    message: 'You are allowed to proceed with the request 😃',
  });
};
exports.QueryRouting = function(req, res){
  const search = req.params.search_elem;
    res.status(200).json({
      status: '1001',
      message: 'You have searched:'+search,
    });
}
