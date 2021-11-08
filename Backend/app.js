const express = require( "express" );
const app = express();
const morgan = require( "morgan" );
const mongoose = require( "mongoose" );
const cors = require('cors');
//Model Import
require( "dotenv/config" );
const authJwt = require( '../Backend/helpers/jwt');
const errorHandler = require('../Backend/helpers/error-handler');
const api = process.env.API_URL;

app.use(cors());
app.options('*', cors);


//middleware confiuration
//app.use( parser.json() );
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use( morgan( "tiny" ) );


app.use(authJwt());
app.use(errorHandler);


const productsRouter = require( "./routers/product.router" );
const categoryRouter = require( "./routers/category.router" );
const usersRouter = require( "./routers/user.router" );
console.log( api );

app.use( `${api}/AddUser`, usersRouter );
app.use( `${api}/User`, usersRouter );

//Product
app.use( `${api}/UpdateUser`, usersRouter );
app.use( `${api}/GetUser`, usersRouter );
app.use( `${api}/DeleteUser`, usersRouter );
app.use( `${api}/GetUserById`, usersRouter );



//Product
app.use( `${api}/AddProduct`, productsRouter );
app.use( `${api}/UpdateProduct`, productsRouter );
app.use( `${api}/GetProducts`, productsRouter );
app.use( `${api}/DeleteProduct`, productsRouter );
app.use( `${api}/GetProductById`, productsRouter );

//Category Routes
app.use( `${api}/AddCategory`, categoryRouter );
app.use( `${api}/UpdateCategory`, categoryRouter );
app.use( `${api}/GetCategories`, categoryRouter );
app.use( `${api}/DeleteCategory`, categoryRouter );
app.use( `${api}/GetCategoryById`, categoryRouter );


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