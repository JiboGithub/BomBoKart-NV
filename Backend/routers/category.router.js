const { Category } = require('../models/category');
var express = require('express');

var router = express();

router.use(express.json()); // for parsing application/json
router.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

//const api = process.env.API_URL;

router.get( "/", async ( req, res )=> {
	const categoryList = await Category.find();
	( !categoryList ) ? res.status( 404 ).json( { 
		error : "Category not found", status: false } ) : res.send( categoryList );
} ); 


router.post(`/`, async (req, res) =>{
	let category = Category({
		name: req.body.name,
		icon: req.body.icon,
		color: req.body.color,
	});
    
	category = await category.save();
	(!category) ? res.status(404).send('unable to create category') : res.status(200).send(category);
});


router.delete('/:id', async (req, res) => {
	Category.findByIdAndRemove(req.params.id).then(category => {
		(!category) ? res.status(404).send('No record of category found') 
			: res.status(200).send({ status: 'success', message: 'Category successfully deleted' });
	}).catch(err => {
		return res.status(500).json({ error: err,
			status: false });
	});
});


router.get( "/:id", async ( req, res )=> {
	const category = await Category.findById(req.params.id);
	( !category ) ? res.status( 404 ).json( { 
		error : "Category not found", status: false } ) : res.send( category );
} ); 

module.exports = router;