function errorHandler(err, req, res, next ) {
	if(err.name == 'UnauthorizedError'){
		return res.status(401).json({ errmessage: 'Unauthorized User, Login !' });
	}
	if(err.name == 'ValidationError'){
		return res.status(401).json({ errmessage: 'Unauthorized User, Login !' });
	}
	return res.status(500).json({ errmessage: 'Invalid User' });
}

module.exports = errorHandler;







// const jwt = require("jsonwebtoken");

// const config = process.env;

// const verifyToken = (req, res, next) => {
//   const token =
//     req.body.token || req.query.token || req.headers["x-access-token"];

//   if (!token) {
//     return res.status(403).send("A token is required for authentication");
//   }
//   try {
//     const decoded = jwt.verify(token, config.TOKEN_KEY);
//     req.user = decoded;
//   } catch (err) {
//     return res.status(401).send("Invalid Token");
//   }
//   return next();
// };

// module.exports = verifyToken;
