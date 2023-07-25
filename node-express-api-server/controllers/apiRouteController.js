exports.defaultRerouting = function (req, res) {
  const user = req.query.user;
  if (!user) {
    res.status(403).json({
      status: '0000',
      message: 'You are not allowed to proceed with the request 🤚🛑',
    });
  } else {
    res.status(200).json({
      status: '1001',
      message: 'You are allowed to proceed with the request 😃',
    });
  }
};
