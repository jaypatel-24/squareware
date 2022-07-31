const express = require('express')
const router = express.Router()
const User = require('../models/user')
const userController = require('../controller/user')

// create a user
router.post('/', async (req, res) => {
	try {
		console.log(`request received to create user`)
		const { name, email, latitude, longitude } = req.body
		if (!name || !email || !latitude || !longitude) {
			return res
				.status(400)
				.send('Please provide name, email, latitude and longitude')
		}
		const user = await userController.createUser(
			name,
			email,
			latitude,
			longitude
		)
		return res.status(200).json(user)
	} catch (error) {
		console.log(`error while creating user: ${error.message}`)
		if (error.statusCode) {
			return res.status(error.statusCode).json({ message: error.message })
		}
		if (error.response) {
			return res
				.status(error.response.status)
				.json({ message: error.response.data.message })
		}
		return res.status(500).json({ message: error.message })
	}
})

// get all users
router.get('/', async (req, res) => {
	try {
		console.log(`request received to get all users`)
		const users = await User.find()
		return res.status(200).json(users)
	} catch (error) {
		console.log(`error: ${error.message}`)
		if (error.statusCode) {
			return res.status(error.statusCode).json({ message: error.message })
		}
		if (error.response) {
			return res
				.status(error.response.status)
				.json({ message: error.response.data.message })
		}
		return res.status(500).json({ message: error.message })
	}
})

// get a user
router.get('/:id', async (req, res) => {
	try {
		console.log(`request received to get user with id: ${req.params.id}`)
		if (!req.params.id) {
			return res.status(400).send('Please provide user id')
		}
		const user = await userController.findUserById(req.params.id)
		if (!user) {
			return res.status(404).send('User not found')
		}
		return res.status(200).json(user)
	} catch (error) {
		console.log(`error: ${error.message}`)
		if (error.statusCode) {
			return res.status(error.statusCode).json({ message: error.message })
		}
		if (error.response) {
			return res
				.status(error.response.status)
				.json({ message: error.response.data.message })
		}
		return res.status(500).json({ message: error.message })
	}
})

// update user
router.patch('/:id', async (req, res) => {
	try {
		console.log(`request received to update user with id: ${req.params.id}`)
		if (!req.params.id) {
			return res.status(400).send('Please provide user id')
		}
		const user = await userController.updateUser(req.params.id, req.body)
		if (!user) {
			return res.status(404).send('User not found')
		}
		return res.status(200).json(user)
	} catch (error) {
		console.log(`error: ${error.message}`)
		if (error.statusCode) {
			return res.status(error.statusCode).json({ message: error.message })
		}
		if (error.response) {
			return res
				.status(error.response.status)
				.json({ message: error.response.data.message })
		}
		return res.status(500).json({ message: error.message })
	}
})

router.post('/:userId/addFriend', async (req, res) => {
	try {
		console.log(
			`request received to add friend to user with id: ${req.params.userId}`
		)
		const { userId } = req.params
		if (!userId) {
			return res.status(400).send('Please provide user id')
		}

		const { friendId } = req.body
		if (!friendId) {
			return res.status(400).send('Please provide friend id')
		}

		const user = await userController.addFriend(userId, friendId)
		return res.status(200).json(user)
	} catch (error) {
		console.log(`error while addind friend: ${error.message}`)
		if (error.statusCode) {
			return res.status(error.statusCode).json({ message: error.message })
		}
		if (error.response) {
			return res
				.status(error.response.status)
				.json({ message: error.response.data.message })
		}
		return res.status(500).json({ message: error.message })
	}
})

router.get('/nearby/users', async (req, res) => {
	try {
		console.log(`request received to get nearby users`)
		const { latitude, longitude, radius } = req.query
		if (!latitude || !longitude || !radius) {
			return res
				.status(400)
				.send('Please provide latitude, longitude and radius')
		}
		const users = await userController.findNearbyUsers(
			latitude,
			longitude,
			radius
		)
		return res.status(200).json(users)
	} catch (error) {
		console.log(`error while getting nearby people: ${error.message}`)
		if (error.statusCode) {
			return res.status(error.statusCode).json({ message: error.message })
		}
		if (error.response) {
			return res
				.status(error.response.status)
				.json({ message: error.response.data.message })
		}
		return res.status(500).json({ message: error.message })
	}
})

module.exports = router
