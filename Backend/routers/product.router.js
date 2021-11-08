const { Product } = require('../models/product');
const { Category } = require('../models/category');
var express = require('express');
const mongoose = require('mongoose');

var router = express();

router.use(express.json()); // for parsing application/json
router.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded


//const api = process.env.API_URL;

router.get( "/", async ( req, res )=> {
	let filter = {};
	if (req.query.categories){
		filter = { category: req.query.categories.split(',') };
	}
	const productList = await Product.find(filter).populate('category');
	( !productList ) ? res.status( 404 ).json( { 
		error : "Product not found", status: false } ) : res.send( productList );
} ); 


router.post(`/`, async (req, res) =>{
	let product = new Product();
	const category = !mongoose.isValidObjectId(req.params) ? res.status(404).send('Category does not exist') 
		: await Category.findById(req.body.category);
	if (!category){
		return res.status(404).send('Category does not exist');
	}
	product = new Product({
		name: req.body.name,
		description: req.body.description,
		richDescription: req.body.richDescription,
		image: req.body.image,
		images: req.body.images, 
		brand: req.body.brand,
		category: req.body.category,
		countInStock: req.body.countInStock,
		rating: req.body.rating,
		numReviews: req.body.numReviews,
		isFeatured: req.body.isFeatured,
		dateCreated: Date.now()
	});
	product = await product.save();
	(!product) ? res.status(404).send('unable to create product') 
		: res.json({ status: 'success', message: 'Product was successfully created' });
});


router.delete('/:id', async (req, res) => {
	mongoose.isValidObjectId(req.params.id);
	Product.findByIdAndRemove(req.params.id).then(product => {
		(product) ? res.status(200).json({ message: `${product.name} successfully deleted`, status: 'success' })
			: res.status(200).json({ message: `unable to delete product` });
	})
		.catch(err => {
			return res.status(400)
				.json({ success: false, message: 'something went wrong', error: err });
		});
});



router.get( "/:id", async ( req, res )=> {
	mongoose.isValidObjectId(req.params.id);
	const product = await Product.findById(req.params.id);
	( !product ) ? res.status( 404 ).json( { 
		error : "Product not found", status: false } ) : res.send( product );
} ); 



router.put('/:id', async (req, res) => {
	if(!mongoose.isValidObjectId(req.params.id)) return res.status(404).send('Category does not exist');
	const category = await Category.findById(req.body.category);
	if (!category){
		return res.status(404).send('Category does not exist');
	}
	const product = await Product.findByIdAndUpdate(
		req.params.id, {
			name: req.body.name,
			description: req.body.description,
			richDescription: req.body.richDescription,
			image: req.body.image,
			images: req.body.images,
			brand: req.body.brand,
			price: req.body.price,
			category: req.body.category,
			countInStock: req.body.countInStock,
			rating: req.body.rating,
			numReviews: req.body.numReviews,
			isFeatured: req.body.isFeatured,
		});
	(product) ? res.json({ status: 'success', message: 'Product was successfully updated' })
		: res.status(404).json({ status: 'failure', message: 'No product found for update' });
});


router.get('/get/count', async (req, res) => {
	const productCount = await Product.find().count();
	(productCount) ? res.status(200).json({ status: 'success', productCount: productCount }) : res.status(500).json({ count: 0 });
});

router.get('/get/featured/:count', async (req, res) => {
	const count = req.params.count ? req.params.count : 0;
	const featuredProduct = await Product.find({ isFeatured: true }).limit(+count);
	(featuredProduct) 
		? res.status(200).json({ 
			status: 'success', 
			featuredProduct: featuredProduct,
		}) 
		: res.status(500).json({ message: 'No featured product' });
});


module.exports = router;