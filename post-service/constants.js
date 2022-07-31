const path = require('path')
require('dotenv').config({
	path: path.resolve(__dirname, `.env`),
})

module.exports = {
	NODE_ENV: process.env.NODE_ENV,
	MONGO_CONNECTION_URI: process.env.MONGO_CONNECTION_URI,
	PORT: process.env.PORT,
}
