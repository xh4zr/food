
// Packages
var mongoClient = require( 'mongodb' ).MongoClient;

// Static variables
var MONGO_DB_ADDR = 'mongodb://52.11.71.104';
var MONGO_DB_NAME = "admin";
var MONGO_COLLECTION_NAME = "FoodSearchEngine";

module.exports.advancedSearch = function( term, restaurant_location, price, calories, callback ) {
	console.log("ADVANCED");
	// module.exports.basicSearch( term, function( matchingDishes ) {
	// 	callback( matchingDishes );
	// });


	
};


module.exports.basicSearch = function( term, callback ) {

	searchByTerm( term, function( matchingDishes ) {

		callback( matchingDishes );

	} );	

};

function combineResultsArrays( arr1, arr2 ) {

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

function filterByCalories( calories, callback ) {

};

function filterByRestaurantLocation( restaurant_location, callback ) {

};

function filterByPrice( price, callback ) {

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

function searchByTerm( term, callback ) {
	
	var regex = new RegExp( term, "i" );

	mongoClient.connect( MONGO_DB_ADDR, function( err, db ) {
		var fseDB = db.db( MONGO_DB_NAME );
		fseDB.collection( MONGO_COLLECTION_NAME, function( err, dishes ) {
			if( err )
				console.log( err );

			dishes.find( { food_name : regex }, function( err2, matchingDishes ) {
				if( err2 )
					console.log( err2 );

				callback( matchingDishes );
				
			} );
		});
	});

};