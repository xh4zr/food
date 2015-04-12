
var mongoose = require( 'mongoose' );

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

mongoose.model( 'FoodItem', foodItemSchema );