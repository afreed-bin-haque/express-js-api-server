const Index = function(req, res){
  const app_name = process.env.App_name;
  const api_version = process.env.API_Version;
  const app_author = process.env.APP_Author;
  res.status(200).json({
    status: 'Accepted',
    message: 'Welcome to '.concat(app_name),
    author: app_author,
    api_version: 'Version-'.concat(api_version)
  });
}

export { Index }