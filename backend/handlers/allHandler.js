
// Packages
var dbManager = require( '../database/databaseManager.js' );
var detailsHandler = require( './detailsHandler.js' );

module.exports.handleGETEvent = function( req, res ) {

	dbManager.getAllObjects( function( err, allDishesArr ) {
		if( err )
			console.log( err.message );

		var returnObj = detailsHandler.createDishesJSON( allDishesArr, function( returnObj ) {
			res.writeHead( 200 );
			res.end( JSON.stringify( returnObj ) );
		} );
	});

};