
// Packages
var mongoClient = require( 'mongodb' ).MongoClient;
// var mongoose = require( 'mongoose' );
var url = require( 'url' );


// Return all the objects in the database that match the specified query
// If the query term isnt recognized (or there isn't one), return all the objects in the database
module.exports.handleGETEvent = function( req, res, MONGO_DB_ADDR, MONGO_DB_NAME, MONGO_COLLECTION_NAME ) {

	var urlObj = url.parse( req.url, true, false );
	var ObjectID = require( 'mongodb' ).ObjectID;

	if( urlObj.query[ "id" ] ) {
		var queryString = urlObj.query[ "id" ];

		mongoClient.connect( MONGO_DB_ADDR, function( err, db ) {
			var fseDB = db.db( MONGO_DB_NAME );
			fseDB.collection( MONGO_COLLECTION_NAME, function( err, dishes) {
				if( err )
					throw err;
				try {
					dishes.find( { "_id": new ObjectID( queryString ) }, function( err, matchingDishes ) {
						matchingDishes.toArray( function( err, matchingDishesArr ) {

							var returnObj = [];
							for(var i = 0; i < matchingDishesArr.length; i++) {
								returnObj.push(
									{ 
										"id": matchingDishesArr[ i ]._id,
										"food_name": matchingDishesArr[ i ].food_name,
										"food_description": matchingDishesArr[ i ].food_description,
										"restaurant": matchingDishesArr[ i ].restaurant,
										"restaurant_location": matchingDishesArr[ i ].restaurant_location,
										"price": matchingDishesArr[ i ].price,
										"calories": matchingDishesArr[ i ].calories,
										"type": matchingDishesArr[ i ].food_type,
										"tags": matchingDishesArr[ i ].food_tags,
										"image": matchingDishesArr[ i ].image
									}
								);
							};
							res.writeHead( 200 );
							res.end( JSON.stringify( returnObj ) );
						} );
					} );
				} catch ( e ) {
					console.log( e );
					res.writeHead( 400 );
					res.end( e.message );
				}
			});
		});

	} else {
		mongoClient.connect( MONGO_DB_ADDR, function( err, db ) {
			if( err )
				throw err;

			db.collection( MONGO_COLLECTION_NAME, function( err, dishes ) {
				if( err )
					throw err;
				dishes.find( function( err, allDishes ) {
					allDishes.toArray( function( err, allDishesArr ) {
						var returnObj = [];
						for(var i = 0; i < allDishesArr.length; i++) {
							returnObj.push(
								{ 
									"id": allDishesArr[ i ]._id,
									"food_name": allDishesArr[ i ].food_name,
									"food_description": allDishesArr[ i ].food_description,
									"restaurant": allDishesArr[ i ].restaurant,
									"restaurant_location": allDishesArr[ i ].restaurant_location,
									"price": allDishesArr[ i ].price,
									"calories": allDishesArr[ i ].calories,
									"type": allDishesArr[ i ].food_type,
									"tags": allDishesArr[ i ].food_tags,
									"image": allDishesArr[ i ].image
								}
							);
						};
						res.writeHead( 200 );
						res.end( JSON.stringify( returnObj ) );
					} );
				} );
			} );
		});
	}

};



// Put information into the database
module.exports.handlePOSTEvent = function( req, res, MONGO_DB_ADDR, MONGO_DB_NAME, MONGO_COLLECTION_NAME ) {

	var foodObj = req.body; 
	// Insert data into MongoDB
	mongoClient.connect( MONGO_DB_ADDR, function( err, db ) {
		if( err )
			throw err;

		db.collection( MONGO_COLLECTION_NAME ).insert( foodObj, function( err, records ) {
			if( err )
				throw err;

			res.writeHead( 200 );
			res.end( "" );
		} );
	});

}