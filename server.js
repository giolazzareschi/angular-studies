var express = require('express');
var http = require('http');
var app = express();
var bodyParser = require('body-parser');
var loki = require('lokijs'), db = new loki('test.json');
var current_location = 'pt-BR';

var children = db.addCollection('children');
children.insert({name:'Sleipnir', legs: 8, title: 'Until The Honor Limit'});
children.insert({name:'Jormungandr', legs: 0});
children.insert({name:'Hel', legs: 2});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static(__dirname + '/dist'));
// app.set('views', __dirname + '/views');
// app.set('view engine', 'html');

app.get('/', function(req, res) {
	current_page = req.params.page;
	if( !current_page )
		current_page = 'index';
	return res.render(current_page+'.html',{pageData:{}});      
});

var router = express.Router();              // get an instance of the express Router
router
	.route('/movies')
	.post(function(req,res){
		res.json(children.data);
	})
	.get(function(req,res){
		res.json( children.data );
	});

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {	
    res.json({ message: 'hooray! welcome to our api!' });   
});
app.use('/api', router);


app.listen(2000);