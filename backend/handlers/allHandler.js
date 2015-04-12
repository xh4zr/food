
// Packages
var dbManager = require( '../database/databaseManager.js' );
var detailsHandler = require( './detailsHandler.js' );

module.exports.handleGETEvent = function( req, res ) {

	dbManager.getAllObjects( function( err, allDishesArr ) {
		if( err )
			console.log( err.message );


		// allDishes.toArray( function( err2, allDishesArr ) {
		// 	if( err2 )
		// 		console.log( err2.message );	

		// 	var returnObj = detailsHandler.createDishesJSON( allDishesArr, function( returnObj ) {
		// 		res.writeHead( 200 );
		// 		res.end( JSON.stringify( returnObj ) );
		// 	} );
		// } );

		var returnObj = detailsHandler.createDishesJSON( allDishesArr, function( returnObj ) {
			res.writeHead( 200 );
			res.end( JSON.stringify( returnObj ) );
		} );
	});

};