
// Packages
var dbManager = require( '../database/databaseManager.js' );
var url = require( 'url' );


module.exports.handleGETEvent = function( req, res ) {

	var urlObj = url.parse( req.url, true, false );

	if( urlObj.query[ "term" ] ) {
		
		var term = urlObj.query[ "term" ];

		dbManager.basicSearch( term, function( matchingDishes ) {

			matchingDishes.toArray( function( err, matchingDishesArr ) {

				if( err )
					console.log( err );

				var returnObj = createAbbreviatedDishesJSON( matchingDishesArr, function( returnObj ) {
					res.writeHead( 200 );
					res.end( JSON.stringify( returnObj ) );
				} );

			} );

		} );

		return;

	} else {
		
		defaultServerAction( req, res );

		return;

	}
};

function defaultServerAction( req, res ) {

	res.writeHead( 400 );
	res.end( "Bad request" );

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