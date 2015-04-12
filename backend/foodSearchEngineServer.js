
// Packages
var bodyParser = require( 'body-parser' );
var fs = require( 'fs' );
var http = require( 'http' );
var mongoose = require( 'mongoose' );

// Handler files
var allHandler = require( './handlers/allHandler.js' );
var detailsHandler = require( './handlers/detailsHandler.js' );
var searchHandler = require( './handlers/searchHandler.js' );



// Static variables
var HTTP_PORT_NUM = 80;
var MONGO_DB_ADDR = 'mongodb://52.11.71.104/cs360fse';
var ROOT_DIR = "pages/";
var TEST_DIR = "test/";



// Mongoose 
mongoose.connect( MONGO_DB_ADDR );



// Express

var express = require( 'express' );
var app = express();
app.use( bodyParser() );
app.use( '/', express.static( ROOT_DIR, { maxAge: 60*60*1000 } ) ); // maxAge: http://blog.modulus.io/nodejs-and-express-static-content
app.use( '/test', express.static( TEST_DIR, { maxAge: 60*60*1000 } ) );

http.createServer( app ).listen( HTTP_PORT_NUM );

console.log( "STARTING HTTP SERVER ON PORT " + HTTP_PORT_NUM );



// Routes

app.get( '/', function( req, res ) {
	res.send( 'Hello from the FoodServiceEngine' );
} );

app.get( '/search', function( req, res) {
	searchHandler.handleGETEvent( req, res );
} );

app.get( '/details', function( req, res ) {
	detailsHandler.handleGETEvent( req, res );
});

app.post( '/details', function( req, res ) {
	detailsHandler.handlePOSTEvent( req, res );
} );

app.get( '/all', function( req, res ) {
	allHandler.handleGETEvent( req, res );
} );
