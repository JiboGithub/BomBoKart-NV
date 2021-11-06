const { Product } = require('../models/product');
var express = require('express');

var router = express();

router.use(express.json()); // for parsing application/json
router.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded


//const api = process.env.API_URL;

router.get( "/", async ( req, res )=> {
	const productList = await Product.find();
	( !productList ) ? res.status( 404 ).json( { 
		error : "Product not found", status: false } ) : res.send( productList );
} ); 


router.post(`/`, (req, res) =>{
	const product = new Product({
		name: req.body.name,
		image: req.body.image,
		countInStock: req.body.countInStock
	});

	product.save().then((createdProduct=> {
		res.status(201).json(createdProduct);
	})).catch((err)=>{
		res.status(500).json({
			error: err,
			success: false
		});
	});
});


router.delete('/:id', async (req, res) => {
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
	const product = await Product.findById(req.params.id);
	( !product ) ? res.status( 404 ).json( { 
		error : "Product not found", status: false } ) : res.send( product );
} ); 



module.exports = router;