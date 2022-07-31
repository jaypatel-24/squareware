const express = require('express')
const router = express.Router()
const Post = require('../models/post')
const postController = require('../controller/post')

// create a post
router.post('/', async (req, res) => {
	try {
		console.log('request received to create post')
		const { title, content, userId } = req.body
		if (!title || !content || !userId) {
			return res.status(400).json({ message: 'Missing required fields' })
		}
		const post = await postController.createPost(title, content, userId)
		return res.status(200).json(post)
	} catch (error) {
		console.log(`error while creating post: ${error.message}`)
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

// get all posts
router.get('/', async (req, res) => {
	try {
		const posts = await postController.getAllPosts()
		return res.status(200).json(posts)
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

// fetch post by post id
router.get('/:id', async (req, res) => {
	try {
		const id = req.params.id
		if (!id) {
			return res.status(400).json({ message: 'Please provide post id' })
		}
		const post = await postController.findPostById(id)
		return res.status(200).json(post)
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

// fetch post by userId
router.get('/postByUser/:userId', async (req, res) => {
	try {
		const userId = req.params.userId
		if (!userId) {
			return res.status(400).json({ message: 'Please provide post id' })
		}
		const posts = await postController.findPostByUserId(userId)
		return res.status(200).json(posts)
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

// update post
router.patch('/:id', async (req, res) => {
	try {
		const id = req.params.id
		if (!id) {
			return res.status(400).json({ message: 'Please provide post id' })
		}
		const { title, content } = req.body
		if (!title || !content) {
			return res
				.status(400)
				.json({ message: 'Please provide title and content' })
		}
		const post = await postController.updatePost(id, title, content)
		return res.status(200).json(post)
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

router.delete('/:id', async (req, res) => {
	try {
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

router.get('/friends/content', async (req, res) => {
	try {
		const { userId } = req.query
		if (!userId) {
			return res.status(400).json({ message: 'Please provide user id' })
		}
		const posts = await postController.findFriendsPosts(userId)
		return res.status(200).json(posts)
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

module.exports = router
