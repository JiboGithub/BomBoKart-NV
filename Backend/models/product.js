const mongoose = require( "mongoose" );

const productSchema = mongoose.Schema( {
	name: {
		type: String,
		required: true,
		minLength: 2,
		maxLength: 200
	},
	description: {
		type: String,
		required: true
	},
	richDescription: {
		type: String,
		default: ''
	},
	image: {
		type: String,
		default: ''
	},
	images: [ {
		type: String,
		default: ''
	} ],
	brand: {
		type: String,
		default: ''
	},
	category: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Category',
		required: true
	},
	countInStock: {
		type: Number,
		required: true,
		minLength: 0,
		maxLength: 255
	},
	rating: {
		type: Number,
		default: 0
	},
	numReviews: {
		type: Number,
		default: 0
	},
	isFeatured: {
		type: Boolean,
		default: 0
	},
	dateCreated: {
		type: Date,
		default: Date.now()
	}
} );

productSchema.virtual('id').get( function () {
	return this._id.toHexString();
});

productSchema.set('toJSON', {
	virtuals: true,
});


exports.Product = mongoose.model('Product', productSchema);

