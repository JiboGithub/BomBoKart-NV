const express = require( "express" );
const app = express();
const morgan = require( "morgan" );
const mongoose = require( "mongoose" );
const cors = require('cors');
//Model Import
require( "dotenv/config" );
const api = process.env.API_URL;


const productsRouter = require( "./routers/product.router" );
const categoryRouter = require( "./routers/category.router" );
console.log( api );

app.use(cors());
app.options('*', cors);

//Product
app.use( `${api}/AddProduct`, productsRouter );
app.use( `${api}/GetProducts`, productsRouter );
app.use( `${api}/DeleteProduct`, productsRouter );
app.use( `${api}/GetProductById`, productsRouter );

//Category Routes
app.use( `${api}/AddCategory`, categoryRouter );
app.use( `${api}/GetCategories`, categoryRouter );
app.use( `${api}/DeleteCategory`, categoryRouter );
app.use( `${api}/GetCategoryById`, categoryRouter );

//middleware confiuration
//app.use( parser.json() );
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use( morgan( "tiny" ) );



mongoose.connect( process.env.DB_CONNECTION, {
	useNewUrlParser: true,  useUnifiedTopology: true, dbName: "bombokartDB"
} )
	.then( () => {
		console.log( "Database Connected" );
	} ).catch( ( err ) => {
		console.log( err.message );
	} );


app.listen( 3000, () => {
	console.log( "server has started on port 3000" );
} ); 