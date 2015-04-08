
// Packages
var bodyParser = require( 'body-parser' );
var fs = require( 'fs' );
var http = require( 'http' );
var https = require( 'https' );
var mongoClient = require( 'mongodb' ).MongoClient;
var url = require( 'url' );


// Static variables

var ROOT_DIR = "pages/";



// Express

var express = require( 'express' );
var app = express();
app.use( bodyParser() );
app.use( '/', express.static( ROOT_DIR, { maxAge: 60*60*1000 } ) ); // maxAge: http://blog.modulus.io/nodejs-and-express-static-content

var options = {
	host: '127.0.0.1',
	key: fs.readFileSync( 'ssl/server.key' ),
	cert: fs.readFileSync( 'ssl/server.crt' ),
};

var HTTP_PORT_NUM = 8080;
var HTTPS_PORT_NUM = 443;

http.createServer( app ).listen( HTTP_PORT_NUM );
https.createServer( options, app ).listen( HTTPS_PORT_NUM );

console.log( "STARTING HTTP SERVER ON PORT " + HTTP_PORT_NUM );
console.log( "STARTING HTTPS SERVER ON PORT " + HTTPS_PORT_NUM );


// Routes

app.get( '/', function( req, res ) {
	res.send( 'Hello from the FoodServiceEngine' );
} );



// Return all the objects in the database that match the specified query
// If the query term isnt recognized (or there isn't one), return all the objects in the database
app.get( '/search', function( req, res ) {
	var urlObj = url.parse( req.url, true, false );

	if( urlObj.query[ "term" ] ) {
		var queryString = urlObj.query[ "term" ];
		// var regex = new RegExp( "^" + queryString, "i" );
		var regex = new RegExp( queryString, "i" );

		mongoClient.connect( "mongodb://52.11.71.104:27017/cs360FoodSearchEngine", function( err, db ) {
			var fseDB = db.db( "cs360FoodSearchEngine" );
			fseDB.collection( "FoodSearchEngine", function( err, dishes) {
				if( err )
					throw err;
				dishes.find( { name : regex }, function( err, matchingDishes ) {
					matchingDishes.toArray( function( err, matchingDishesArr ) {
						res.writeHead( 200 );
						res.end( JSON.stringify( matchingDishesArr ) );
					} );
				} );
			});
		});

	} else {
		mongoClient.connect( "mongodb://52.11.71.104:27017/cs360FoodSearchEngine", function( err, db ) {
			if( err )
				throw err;

			db.collection( 'FoodSearchEngine', function( err, dishes ) {
				if( err )
					throw err;
				dishes.find( function( err, allDishes ) {
					allDishes.toArray( function( err, allDishesArr ) {
						res.writeHead( 200 );
						res.end( JSON.stringify( allDishesArr ) );
					} );
				} );
			} );
		});
	}
});



// Put information into the database
app.post( '/search', function( req, res ) {
	var foodObj = req.body; 
	// Insert data into MongoDB
	mongoClient.connect( "mongodb://52.11.71.104:27017/cs360FoodSearchEngine", function( err, db ) {
		if( err )
			throw err;

		db.collection( 'FoodSearchEngine' ).insert( foodObj, function( err, records ) {
			if( err )
				throw err;

			res.writeHead( 200 );
			res.end( "" );
		} );
	});
} );
