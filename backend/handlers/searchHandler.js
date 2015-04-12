
// Packages
var dbManager = require( '../database/databaseManager.js' );
var url = require( 'url' );


module.exports.handleGETEvent = function( req, res ) {

	var urlObj = url.parse( req.url, true, false );

	if( urlObj.query[ "term" ] ) {

		var term = urlObj.query[ "term" ];
		var restaurant_location = urlObj.query[ "location" ];
		var price = urlObj.query[ "price" ];
		var calories = urlObj.query[ "calories" ];

		dbManager.advancedSearch( term, restaurant_location, price, calories, function( matchingDishesArr ) {
			createAbbreviatedDishesJSON( matchingDishesArr, function( returnObj ) {
				res.writeHead( 200 );
				res.end( JSON.stringify( returnObj ) );
			} );
		} );


	} else {
		
		defaultServerAction( req, res );

		return;

	}
};

function createAbbreviatedDishesJSON( dishesArr, callback ) {
	
	var returnObj = [];

	for( var i = 0; i < dishesArr.length; i++ ) {
		returnObj.push(
			{ 
				"id": dishesArr[ i ]._id,
				"food_name": dishesArr[ i ].food_name,
				"food_description": dishesArr[ i ].food_description,
			}
		);
	};

	return callback( returnObj );
};

function defaultServerAction( req, res ) {

	res.writeHead( 400 );
	res.end( "Bad request" );

};