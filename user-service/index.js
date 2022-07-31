const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const userRoutes = require('./routes/user')
const constants = require('./constants')
const User = require('./models/user')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

const PORT = `${constants.PORT}`

mongoose
	.connect(`${constants.MONGO_CONNECTION_URI}`, {
		useNewUrlParser: true,
	})
	.then(async () => {
		app.use('/user', userRoutes)
		console.log('Connected to MongoDB')

		User.createIndexes({ location: '2dsphere' })
		app.listen(PORT, () => {
			console.log('USER-SERVICE server listening on port: ', PORT)
		})
	})
	.catch((error) => {
		console.log(`Error connecting to MongoDB: ${error.message}`)
	})
