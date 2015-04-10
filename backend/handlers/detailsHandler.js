
// Packages
var dbManager = require( '../database/databaseManager.js' );
var url = require( 'url' );


// Return all the objects in the database that match the specified query
// If the query term isnt recognized (or there isn't one), return all the objects in the database
module.exports.handleGETEvent = function( req, res ) {

	var urlObj = url.parse( req.url, true, false );

	if( urlObj.query[ "term" ] || 
		urlObj.query[ "location" ] || 
		urlObj.query[ "price" ] ||
		urlObj.query[ "calories" ] ) {

		defaultServerAction( req, res );

	} else if( urlObj.query[ "id" ] ) {
		
		var id = urlObj.query[ "id" ];

		dbManager.searchByID( id, function( exception, matchingDishes ) {

			if( exception ) {
				
				console.log( exception );
				res.writeHead( 400 );
				res.end( exception.message );
				return;
			}

			matchingDishes.toArray( function( err, matchingDishesArr ) {
					
				var returnObj = module.exports.createDishesJSON( matchingDishesArr, function( returnObj ) {

					res.writeHead( 200 );
					res.end( JSON.stringify( returnObj ) );

				});

			} );

		});

	} else {
		
		defaultServerAction( req, res );

		return;

	}

};


function defaultServerAction( req, res ) {

	res.writeHead( 400 );
	res.end( "Bad request" );

};



module.exports.createDishesJSON = function( dishesArr, callback ) {
	
	var returnObj = [];

	for( var i = 0; i < dishesArr.length; i++ ) {
		returnObj.push(
			{ 
				"id": dishesArr[ i ]._id,
				"food_name": dishesArr[ i ].food_name,
				"food_description": dishesArr[ i ].food_description,
				"restaurant": dishesArr[ i ].restaurant,
				"restaurant_location": dishesArr[ i ].restaurant_location,
				"price": dishesArr[ i ].price,
				"calories": dishesArr[ i ].calories,
				"type": dishesArr[ i ].food_type,
				"tags": dishesArr[ i ].food_tags,
				"image": dishesArr[ i ].image
			}
		);
	};

	callback( returnObj );
};



// Put information into the database
module.exports.handlePOSTEvent = function( req, res ) {

	var foodObj = req.body; 
	// Insert data into MongoDB
	dbManager.createNewFoodEntry( foodObj, function( err ) {
		if( err )
			console.log( err );

		res.writeHead( 200 );
		res.end( "" );
	} );

}