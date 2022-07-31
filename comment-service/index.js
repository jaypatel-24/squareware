const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const commentRoutes = require('./routes/comment')
const constants = require('./constants')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

const PORT = `${constants.PORT}`

mongoose
	.connect(`${constants.MONGO_CONNECTION_URI}`, {
		useNewUrlParser: true,
	})
	.then(async () => {
		app.use('/comment', commentRoutes)
		console.log('Connected to MongoDB')

		app.listen(PORT, () => {
			console.log('COMMENT-SERVICE server listening on port: ', PORT)
		})
	})
	.catch((error) => {
		console.log(`Error connecting to MongoDB: ${error.message}`)
	})
