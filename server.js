var express = require('express');
var http = require('http');
var app = express();
var bodyParser = require('body-parser');
var loki = require('lokijs'), db = new loki('test.json');
var current_location = 'pt-BR';

var children = db.addCollection('children');
children.insert({"combustivel":"Flex","imagem":null,"marca":"Volkswagem","modelo":"Gol","placa":"FFF-5498"});
children.insert({"combustivel":"Gasolina","imagem" : null,"marca" : "Volkswagem","modelo" : "Fox","placa" : "FOX­4125"});
children.insert({"combustivel":"Alcool","imagem":encodeURIComponent("http://www.deltatruckequipment.com/wp-content/uploads/2010/05/Laidlaw-Truck.jpg"),"marca" : "Volkswagen","modelo" : "Fusca","placa" : "PAI­4121"});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static(__dirname + '/dist'));

app.get('/', function(req, res) {
	current_page = req.params.page;
	if( !current_page )
		current_page = 'index';
	return res.render(current_page+'.html',{pageData:{}});      
});

var router = express.Router();
router
	.route('/trucks')
	.get(function(req,res){
		res.json(children.data);
	})
	.post(function(req,res){
		children.insert(req.params);
		res.json({'response' : true, "verb" : "post"});
	});

router
	.route('/trucks/:id').get(function(req, res) {	
		res.json( children.get( req.params.id ) ); 
	});

router
	.route('/trucks/:id').delete(function(req,res){		
		children.remove({"$loki" : req.params.id});
		res.json({'response' : true, "verb" : "delete"});
	});

router
	.route('/trucks').put(function(req,res){
		children.update(req.body);
		res.json({'response' : true, "verb" : "update"});
	});

app.use('/api', router);


app.listen(2000);