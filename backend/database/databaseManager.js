
// Packages
var mongoClient = require( 'mongodb' ).MongoClient;

// Static variables
var MONGO_DB_ADDR = 'mongodb://52.11.71.104';
var MONGO_DB_NAME = "admin";
var MONGO_COLLECTION_NAME = "FoodSearchEngine";
var ADVSRCH_L = "advSearchLP";
var ADVSRCH_LP = "advSearchLP";
var ADVSRCH_LC = "advSearchLC";
var ADVSRCH_LPC = "advSearchLPC"; // Advanced Search - location price and calories option



module.exports.advancedSearch = function( term, restaurant_location, price, calories, callback ) {
	console.log("ADVANCED");
	// module.exports.basicSearch( term, function( matchingDishes ) {
	// 	callback( matchingDishes );
	// });


	
};


module.exports.basicSearch = function( term, callback ) {

	var regex = new RegExp( term, "i" );
	var basicQuery = {
					$or: [
						{ food_name : regex },
						{ food_description : regex },
						{ food_type : regex },
						{ "food_tags.food_tag" : regex }
					]
				};

	searchByQuery( basicQuery, function( matchingDishes ) {

		callback( matchingDishes );

	} );	

};

module.exports.createNewFoodEntry = function( foodObj, callback ) {

	mongoClient.connect( MONGO_DB_ADDR, function( err, db ) {
		if( err )
			console.log( err );

		db.collection( MONGO_COLLECTION_NAME ).insert( foodObj, function( err2, records ) {
			
			callback( err2 );

		} );
	});

};

function createQuery( queryType, term, callback ) {

	var regex = new RegExp( term, "i" );



};

function determineAdvancedSearchType( restaurant_location, price, calories, callback ) {



	if( restaurant_location && price && calories ) {
		callback(  );
	}
};

module.exports.getAllObjects = function( callback ) {

	mongoClient.connect( MONGO_DB_ADDR, function( err, db ) {
		if( err )
			throw err;

		db.collection( MONGO_COLLECTION_NAME, function( err2, dishes ) {
			if( err2 )
				throw err2;

			dishes.find( function( err3, allDishes ) {
				if( err3 )
					throw err3;

				callback( err3, allDishes );
			} );
		} );
	});

};

module.exports.searchByID = function( id, callback ) {

	var ObjectID = require( 'mongodb' ).ObjectID;

	mongoClient.connect( MONGO_DB_ADDR, function( err, db ) {
		var fseDB = db.db( MONGO_DB_NAME );
		fseDB.collection( MONGO_COLLECTION_NAME, function( err, dishes) {
			if( err )
				console.log( err );

			try {
				dishes.find( { "_id": new ObjectID( id ) }, function( err2, matchingDishes ) {
					if( err2 )
						console.log( err2 );

					callback( null, matchingDishes );
				} );
			} catch ( e ) {
				callback( e, null );
			}

		});
	});

};

/*
 * Uses the given query to return results from the database
 */

 // http://mongodb.github.io/node-mongodb-native/markdown-docs/queries.html
 // See the sections on the $or function and on queries inside objects and arrays

function searchByQuery( query, callback ) {

	mongoClient.connect( MONGO_DB_ADDR, function( err, db ) {
		var fseDB = db.db( MONGO_DB_NAME );
		fseDB.collection( MONGO_COLLECTION_NAME, function( err, dishes ) {
			if( err )
				console.log( err );

			// dishes.find( {
			// 				$or: [
			// 					{ food_name : regex },
			// 					{ "food_tags.food_tag" : regex }
			// 				]
			// 			},
			dishes.find( query, function( err2, matchingDishes ) {
				if( err2 )
					console.log( err2 );

				callback( matchingDishes );
				
			} );
		});
	});

};