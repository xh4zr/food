
// Packages
var bodyParser = require( 'body-parser' );
var fs = require( 'fs' );
var http = require( 'http' );

// Handler files
var searchHandler = require( './handlers/searchHandler.js' );
var detailsHandler = require( './handlers/detailsHandler.js' );



// Static variables
var HTTP_PORT_NUM = 8080;
var MONGO_DB_ADDR = 'mongodb://52.11.71.104';
var MONGO_DB_NAME = "admin";
var MONGO_COLLECTION_NAME = "FoodSearchEngine";
var ROOT_DIR = "pages/";



// Express

var express = require( 'express' );
var app = express();
app.use( bodyParser() );
app.use( '/', express.static( ROOT_DIR, { maxAge: 60*60*1000 } ) ); // maxAge: http://blog.modulus.io/nodejs-and-express-static-content

http.createServer( app ).listen( HTTP_PORT_NUM );

console.log( "STARTING HTTP SERVER ON PORT " + HTTP_PORT_NUM );



// Routes

app.get( '/', function( req, res ) {
	res.send( 'Hello from the FoodServiceEngine' );
} );

app.get( '/search', function( req, res) {
	searchHandler.handleGETEvent( req, res, MONGO_DB_ADDR, MONGO_DB_NAME, MONGO_COLLECTION_NAME );
} );

app.get( '/details', function( req, res ) {
	detailsHandler.handleGETEvent( req, res, MONGO_DB_ADDR, MONGO_DB_NAME, MONGO_COLLECTION_NAME );
});

app.post( '/details', function( req, res ) {
	detailsHandler.handlePOSTEvent( req, res, MONGO_DB_ADDR, MONGO_DB_NAME, MONGO_COLLECTION_NAME );
} );
