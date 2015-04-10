
// Packages
var bodyParser = require( 'body-parser' );
var fs = require( 'fs' );
var http = require( 'http' );

// Handler files
var searchHandler = require( './handlers/searchHandler.js' );
var detailsHandler = require( './handlers/detailsHandler.js' );



// Static variables
var HTTP_PORT_NUM = 8080;
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
	searchHandler.handleGETEvent( req, res );
} );

app.get( '/details', function( req, res ) {
	detailsHandler.handleGETEvent( req, res );
});

app.post( '/details', function( req, res ) {
	detailsHandler.handlePOSTEvent( req, res );
} );
