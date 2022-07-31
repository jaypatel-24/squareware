const User = require('../models/user')
const uuid = require('uuid')
const { BadRequestError, InternalServerError } = require('../errors/error')

const createUser = async (name, email, latitude, longitude) => {
	try {
		const user = new User({
			name,
			email,
			friends: [],
			location: {
				type: 'Point',
				coordinates: [latitude, longitude],
			},
		})
		await user.save()
		return User.findById(user._id)
	} catch (error) {
		throw new InternalServerError(error.message)
	}
}

const findUserById = async (userId) => {
	try {
		return await User.findById(userId)
	} catch (error) {
		throw new InternalServerError(error.message)
	}
}

const updateUser = async (userId, updateObj) => {
	try {
		return await User.findByIdAndUpdate(userId, updateObj)
	} catch (error) {
		throw new InternalServerError(error.message)
	}
}

const addFriend = async (userId, friendId) => {
	try {
		await User.findByIdAndUpdate(userId, {
			$push: { friends: friendId },
		})
		return await User.findById(userId)
	} catch (error) {
		throw new InternalServerError(error.message)
	}
}

const findNearbyUsers = async (latitude, longitude, radius) => {
	try {
		console.log(
			`latitude: ${latitude}, longitude: ${longitude}, radius: ${radius}`
		)
		User.createIndexes({
			point: '2dsphere',
		})
		return await User.find({
			point: {
				$geoNear: {
					$geometry: {
						type: 'Point',
						coordinates: [latitude, longitude],
					},
					$maxDistance: parseInt(radius),
				},
			},
		})
	} catch (error) {
		throw new InternalServerError(error.message)
	}
}

module.exports = {
	createUser,
	findUserById,
	updateUser,
	addFriend,
	findNearbyUsers,
}
