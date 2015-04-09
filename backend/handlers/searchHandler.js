
// Packages
var mongoClient = require( 'mongodb' ).MongoClient;
// var mongoose = require( 'mongoose' );
var url = require( 'url' );


module.exports.handleGETEvent = function( req, res, MONGO_DB_ADDR, MONGO_DB_NAME, MONGO_COLLECTION_NAME ) {

	var urlObj = url.parse( req.url, true, false );

	if( urlObj.query[ "term" ] ) {
		var queryString = urlObj.query[ "term" ];
		var regex = new RegExp( queryString, "i" );

		mongoClient.connect( MONGO_DB_ADDR, function( err, db ) {
			var fseDB = db.db( MONGO_DB_NAME );
			fseDB.collection( MONGO_COLLECTION_NAME, function( err, dishes) {
				if( err )
					throw err;
				dishes.find( { food_name : regex }, function( err, matchingDishes ) {
					matchingDishes.toArray( function( err, matchingDishesArr ) {
						var returnObj = [];
						for(var i = 0; i < matchingDishesArr.length; i++) {
							returnObj.push(
								{ 
									"id": matchingDishesArr[ i ]._id,
									"food_name": matchingDishesArr[ i ].food_name,
									"food_description": matchingDishesArr[ i ].food_description,
								}
							);
						};
						res.writeHead( 200 );
						res.end( JSON.stringify( returnObj ) );
					} );
				} );
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