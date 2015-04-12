
// Packages
var mongoClient = require( 'mongodb' ).MongoClient;
var mongoose = require( 'mongoose' );


// Static variables
var ADVSRCH_TL = "advSearchTL"; // Advanced Search - term and location option
var ADVSRCH_TP = "advSearchTP"; // Advanced Search - term and price option
var ADVSRCH_TC = "advSearchTC"; // Advanced Search - term and calories option
var ADVSRCH_TLP = "advSearchTLP"; // Advanced Search - term location and price option
var ADVSRCH_TLC = "advSearchTLC"; // Advanced Search - term location and calories option
var ADVSRCH_TPC = "advSearchTPC"; // Advanced Search - term price and calories option
var ADVSRCH_TLPC = "advSearchTLPC"; // Advanced Search - term location price and calories option
var BSCSRCH = "basicSearch";
var MONGO_DB_ADDR = 'mongodb://52.11.71.104';
var MONGO_DB_NAME = "cs360fse";
var MONGO_COLLECTION_NAME = "fooditems";

// Schemas
// var foodTagSchema = new mongoose.Schema( {
// 	food_name: { type: String },
// 	food_description: { type: String },
// 	restaurant: { type: String },
// 	restaurant_location: { type: String },
// 	price: { type: Number, default: 0 },
// 	calories: { type: Number, default: 0 },
// 	food_type: { type: String },
// 	food_tags:[ { type: String, ref: 'food_tag' } ],
// 	image: { type: String }
// } );

var foodItemSchema = new mongoose.Schema( {
	food_name: { type: String },
	food_description: { type: String },
	restaurant: { type: String },
	restaurant_location: { type: String },
	price: { type: Number, default: 0 },
	calories: { type: Number, default: 0 },
	food_type: { type: String },
	food_tags:[ { type: String, ref: 'food_tag' } ],
	image: { type: String }
} );

var FoodItem = mongoose.model( 'FoodItem', foodItemSchema );



module.exports.advancedSearch = function( term, restaurant_location, price, calories, callback ) {

	determineAdvancedSearchType( term, restaurant_location, price, calories, function( queryType ) {

		createAdvancedQuery( queryType, term, restaurant_location, price, calories, function( advancedQuery ) {			

			searchByQuery( advancedQuery, function( err, matchingDishesArr ) {

				callback( matchingDishesArr );

			} );		

		} );

	} );
	
};

function createAdvancedQuery( queryType, term, restaurant_location2, price2, calories2, callback ) {

	debugger;

	var termRegex = new RegExp( term, "i" );
	var restLocRegex = new RegExp( restaurant_location2, "i" );
	var returnQuery;

	// Advanced search term and location option

	if( queryType === ADVSRCH_TL ) {

		returnQuery = {
					"restaurant_location": restLocRegex,
					$or: [
						{ "food_name" : termRegex },
						{ "food_description" : termRegex },
						{ "food_type" : termRegex },
						{ "food_tags.food_tag" : termRegex }
					]
				};
	} 

	// Advanced search term and price option

	else if( queryType === ADVSRCH_TP ) {

		returnQuery = {
					"price": { $lte: price2 },
					$or: [
						{ "food_name" : termRegex },
						{ "food_description" : termRegex },
						{ "food_type" : termRegex },
						{ "food_tags.food_tag" : termRegex }
					]
				};

	}

	// Advanced Search - term and calories option

	else if( queryType === ADVSRCH_TC ) {

		returnQuery = {
					"calories": { $lte: calories2 },
					$or: [
						{ "food_name" : termRegex },
						{ "food_description" : termRegex },
						{ "food_type" : termRegex },
						{ "food_tags.food_tag" : termRegex }
					]
				};

	}

	// Advanced Search - term location and price option	

	else if( queryType === ADVSRCH_TLP ) {

		returnQuery = {
					"restaurant_location": restLocRegex,
					"price": { $lte: price2 },
					$or: [
						{ "food_name" : termRegex },
						{ "food_description" : termRegex },
						{ "food_type" : termRegex },
						{ "food_tags.food_tag" : termRegex }
					]
				};
	}

	// Advanced Search - term location and calories option

	else if( queryType === ADVSRCH_TLC ) {

		returnQuery = {
					"restaurant_location": restLocRegex,
					"calories": { $lte: calories2 },
					$or: [
						{ "food_name" : termRegex },
						{ "food_description" : termRegex },
						{ "food_type" : termRegex },
						{ "food_tags.food_tag" : termRegex }
					]
				};

	}

	// Advanced Search - term price and calories option

	else if( queryType === ADVSRCH_TPC ) {

		returnQuery = {
					"price": { $lte: price2 },
					"calories": { $lte: calories2 },
					$or: [
						{ "food_name" : termRegex },
						{ "food_description" : termRegex },
						{ "food_type" : termRegex },
						{ "food_tags.food_tag" : termRegex }
					]
				};		
	}

	// Advanced Search - term location price and calories option

	else if( queryType === ADVSRCH_TLPC ) {

		returnQuery = {
					"restaurant_location": restLocRegex,
					"price": { $lte: price2 },
					"calories": { $lte: calories2 },
					$or: [
						{ "food_name" : termRegex },
						{ "food_description" : termRegex },
						{ "food_type" : termRegex },
						{ "food_tags.food_tag" : termRegex }
					]
				};

	}

	// Default option - basic search

	else {
		// createBasicQuery( term, function( basicQuery ) {
		// 	returnQuery = basicQuery;
		// } );
		returnQuery = {
				$or: [
					{ "food_name" : termRegex },
					{ "food_description" : termRegex },
					{ "food_type" : termRegex },
					{ "food_tags.food_tag" : termRegex }
				]
			};
	}


	callback( returnQuery );

};

module.exports.createNewFoodEntry = function( foodObj, callback ) {

	var newItem = new FoodItem( foodObj );

	newItem.save( function( err, newObj ) {
		if( err )
			console.log( err );

		callback( err );

	} );

};

function determineAdvancedSearchType( term, restaurant_location, price, calories, callback ) {

	if( term && restaurant_location && !price && !calories ) {
		callback( ADVSRCH_TL );
	} else if( term && !restaurant_location && price && !calories ) {
		callback( ADVSRCH_TP );
	} else if( term && !restaurant_location && !price && calories ) {
		callback( ADVSRCH_TC );
	} else if( term && restaurant_location && price && !calories ) {
		callback( ADVSRCH_TLP );
	} else if( term && restaurant_location && !price && calories ) {
		callback( ADVSRCH_TLC );
	} else if( term && !restaurant_location && price && calories ) {
		callback( ADVSRCH_TPC );
	} else if( term && restaurant_location && price && calories ) {
		callback( ADVSRCH_TLPC );
	} else {
		callback( BSCSRCH );
	}

};

module.exports.getAllObjects = function( callback ) {

	FoodItem.find( function( err, allDishesArr ) {
		if( err )
			console.log( err );

		callback( err, allDishesArr );
	} );

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

	FoodItem.find( query, function( err, matchingDishesArr ) {
		if( err )
			console.log( err );

		callback( err, matchingDishesArr );
	} );

};