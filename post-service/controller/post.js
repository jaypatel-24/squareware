const Post = require('../models/post')
const axios = require('axios')
const { BadRequestError, InternalServerError } = require('../errors/error')

const createPost = async (title, content, userId) => {
	try {
		// console.log(`making request to user service to get user`)
		// const user = await axios.get(`http://localhost:6010/user/${userId}`)
		// if (!user.data) {
		// 	throw new BadRequestError('User not found')
		// }
		// console.log(`response received from user service`)
		// console.log(user.data)

		const post = new Post({
			title,
			content,
			user: userId,
		})
		await post.save()
		return post
	} catch (error) {
		if (error.statusCode) {
			throw new BadRequestError(error.message)
		}
		if (error.response) {
			throw new BadRequestError(error.response.data.message)
		}
		throw new InternalServerError(error.message)
	}
}

const getAllPosts = async () => {
	try {
		const posts = await Post.find()
		return posts
	} catch (error) {
		throw new InternalServerError(error.message)
	}
}

const findPostById = async (id) => {
	try {
		const post = await Post.findById(id)
		return post
	} catch (error) {
		throw new InternalServerError(error.message)
	}
}

const updatePost = async (id, title, content) => {
	try {
		const post = await Post.findByIdAndUpdate(id, { title, content })
		return post
	} catch (error) {
		throw new InternalServerError(error.message)
	}
}

const findPostByUserId = async (userId) => {
	try {
		const posts = await Post.find({ user: userId })
		return posts
	} catch (error) {
		throw new InternalServerError(error.message)
	}
}

const findFriendsPosts = async (userId) => {
	try {
	} catch (error) {
		throw new InternalServerError(error.message)
	}
}

module.exports = {
	createPost,
	getAllPosts,
	findPostById,
	updatePost,
	findPostByUserId,
	findFriendsPosts,
}
