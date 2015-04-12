
// Packages
var dbManager = require( '../database/databaseManager.js' );
var url = require( 'url' );


module.exports.handleGETEvent = function( req, res ) {

	var urlObj = url.parse( req.url, true, false );

	// Basic search only happens when the term query exists and when there isn't a
	// location, price, or calories query along with it

	if( urlObj.query[ "term" ] &&
		!urlObj.query[ "location" ] && 
		!urlObj.query[ "price" ] &&
		!urlObj.query[ "calories" ] ) {
		
		var term = urlObj.query[ "term" ];

		// dbManager.basicSearch( term, function( matchingDishes ) {
		// 	packageDishesJSON( matchingDishes, function( returnObj ) {
		// 		res.writeHead( 200 );
		// 		res.end( JSON.stringify( returnObj ) );
		// 	} );
		// } );

		dbManager.basicSearch( term, function( matchingDishesArr ) {

			createAbbreviatedDishesJSON( matchingDishesArr, function( returnObj ) {
				res.writeHead( 200 );
				res.end( JSON.stringify( returnObj ) );
			} );
		} );

		return;

	} 

	// Advanced search only happens when the term query exists and when at least one of either 
	// location, price, or calories queries also exist

	// else if( urlObj.query[ "term" ] &&
	// 	( urlObj.query[ "location" ] || urlObj.query[ "price" ] || urlObj.query[ "calories" ] ) ) {
	else if( urlObj.query[ "term" ] || urlObj.query[ "location" ] || urlObj.query[ "price" ] || urlObj.query[ "calories" ] ) {

		var term = urlObj.query[ "term" ];
		var restaurant_location = urlObj.query[ "location" ];
		var price = urlObj.query[ "price" ];
		var calories = urlObj.query[ "calories" ];

		// dbManager.advancedSearch( term, restaurant_location, price, calories, function( matchingDishes ) {
		// 	packageDishesJSON( matchingDishes, function( returnObj ) {
		// 		res.writeHead( 200 );
		// 		res.end( JSON.stringify( returnObj ) );
		// 	} );
		// } );

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

// function packageDishesJSON( matchingDishes, callback ) {

// 	matchingDishes.toArray( function( err, matchingDishesArr ) {

// 		if( err )
// 			console.log( err );

// 		var returnObj = createAbbreviatedDishesJSON( matchingDishesArr, function( returnObj ) {
// 			callback( returnObj );
// 		} );

// 	} );

// };


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