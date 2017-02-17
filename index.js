var express = require('express');
const app = express();

const environment  = process.env.NODE_ENV || 'development';
const envPath      = __dirname+'/environments/'+environment+'/';
const routes       = require(__dirname+'/express/routing').routes;
const staticDirs   = require(__dirname+'/express/routing').staticDirs;
const err404       = require(__dirname+'/express/routing').err404;
const articleModel = require(__dirname+'/app/shared/article.json');

app.set('port', (process.env.PORT || 5000));

routes.forEach(function (route){
  app.get(route.path,function(req,res){
    res.setHeader('Content-Type', 'text/html');
    res.sendFile(envPath+'views/index.html');
  });
});

staticDirs.forEach(function (dir){
  app.use('/'+dir, express.static(envPath+dir));
});

app.get('/env', function(req, res) {
	res.status(200).send(process.env);
});

app.get('/article/:id', function(req, res) {
	let article = articleModel;
	article.title = 'Article ' + req.params.id;
	article.url = '/article/'+ req.params.id;
  article.next_article = Number(req.params.id) + 1;
  article.next_article_url = '/article/'+(Number(req.params.id) + 1);
	res.status(200).json(article);
});

app.use(err404);

app.listen(app.get('port'), function() {
  console.log('app is running on port', app.get('port'));
});
